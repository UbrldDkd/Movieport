from django.conf import settings
from django.contrib.auth import get_user_model
from django.views.decorators.csrf import csrf_exempt
import traceback

from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.exceptions import TokenError
from rest_framework_simplejwt.serializers import TokenRefreshSerializer
from rest_framework_simplejwt.tokens import AccessToken, RefreshToken
from rest_framework.exceptions import ValidationError

from .serializers import (
    PublicProfileSerializer,
    RegisterSerializer,
    LoginSerializer,
    AvatarUpdateSerializer,
    NotificationSettingsSerializer,
    PasswordResetSerializer,
    ProfileUpdateSerializer,
    AuthUserSerializer,
)
from .models import PasswordHistory

from Lists.models import Lists
from Lists.serializers import ListsSerializer
from ContentRelations.models import ContentRelations
from ContentRelations.serializers import ContentRelationsSerializer

User = get_user_model()


def build_auth_response(user, request):
    return {
        "isAuthenticated": True,
        **AuthUserSerializer(user, context={"request": request}).data,
    }


def get_auth_cookie_options():
    secure_cookie = not settings.DEBUG
    return {
        "httponly": True,
        "secure": secure_cookie,
        "samesite": "None" if secure_cookie else "Lax",
        "path": "/",
    }


def set_auth_cookie(response, name, value, max_age):
    response.set_cookie(
        name,
        value,
        max_age=max_age,
        **get_auth_cookie_options(),
    )


def set_auth_cookies(response, refresh, remember=False):
    access_max_age = 60 * 30
    refresh_max_age = 60 * 60 * 24 * 30 if remember else 60 * 60 * 24 * 7

    set_auth_cookie(response, "access_token", str(refresh.access_token), access_max_age)
    set_auth_cookie(response, "refresh_token", str(refresh), refresh_max_age)


@api_view(["POST"])
@permission_classes([AllowAny])
@csrf_exempt
def register_user(request):
    """
    Register new user.
    """
    serializer = RegisterSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    user = serializer.save()

    refresh = RefreshToken.for_user(user)
    remember = request.data.get("remember") is True

    response = Response(
        build_auth_response(user, request),
        status=status.HTTP_201_CREATED,
    )

    set_auth_cookies(response, refresh, remember=remember)

    return response


@api_view(["POST"])
@permission_classes([AllowAny])
@csrf_exempt
def logout_user(request):
    """
    Logout user.
    """
    cookie_options = get_auth_cookie_options()
    response = Response({"message": "Logged out"})

    response.delete_cookie(
        "access_token",
        path=cookie_options["path"],
        secure=cookie_options["secure"],
        samesite=cookie_options["samesite"],
    )
    response.delete_cookie(
        "refresh_token",
        path=cookie_options["path"],
        secure=cookie_options["secure"],
        samesite=cookie_options["samesite"],
    )

    return response


@api_view(["POST"])
@permission_classes([AllowAny])
@csrf_exempt
def login_user(request):
    """
    Login user.
    """
    serializer = LoginSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    user = serializer.validated_data["user"]

    refresh = RefreshToken.for_user(user)
    remember = request.data.get("remember") is True

    response = Response(
        build_auth_response(user, request),
        status=status.HTTP_200_OK,
    )

    set_auth_cookies(response, refresh, remember=remember)

    return response


@api_view(["POST"])
@permission_classes([AllowAny])
@csrf_exempt
def refresh_token(request):
    refresh_token_value = request.COOKIES.get("refresh_token")

    if not refresh_token_value:
        return Response(
            {"detail": "Refresh token missing."},
            status=status.HTTP_401_UNAUTHORIZED,
        )

    serializer = TokenRefreshSerializer(data={"refresh": refresh_token_value})

    try:
        serializer.is_valid(raise_exception=True)
    except TokenError:
        return Response(
            {"detail": "Refresh token invalid or expired."},
            status=status.HTTP_401_UNAUTHORIZED,
        )

    response = Response({"detail": "Token refreshed."}, status=status.HTTP_200_OK)
    set_auth_cookie(response, "access_token", serializer.validated_data["access"], max_age=60 * 30)

    return response


@api_view(["GET"])
@permission_classes([AllowAny])
def check_auth(request):
    """
    Check authentication status.
    """
    if request.user.is_authenticated:
        return Response(build_auth_response(request.user, request))

    refresh_token_value = request.COOKIES.get("refresh_token")
    if refresh_token_value:
        try:
            refresh = RefreshToken(refresh_token_value)
            access = refresh.access_token
            user = User.objects.get(id=refresh["user_id"])

            response = Response(build_auth_response(user, request), status=status.HTTP_200_OK)
            set_auth_cookie(response, "access_token", str(access), max_age=60 * 30)
            return response
        except (TokenError, User.DoesNotExist):
            pass

    return Response({"isAuthenticated": False})




@api_view(["GET"])
@permission_classes([AllowAny])
def get_user_by_username(request, username):
    try:
        user = User.objects.get(username__iexact=username)

        return Response(
            PublicProfileSerializer(
                user,
                context={"request": request},
            ).data
        )

    except User.DoesNotExist:
        return Response({"error": "User not found"}, status=404)

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def update_avatar(request):
    serializer = AvatarUpdateSerializer(
        request.user,
        data=request.data,
        partial=True
    )

    if serializer.is_valid():
        user = serializer.save()

        return Response({
            "message": "Avatar updated",
            "avatar": user.avatar,
            "avatar_image": user.avatar_image.url if user.avatar_image else None,
        })

    return Response(serializer.errors, status=400)

@api_view(["PATCH"])
@permission_classes([IsAuthenticated])
def update_notification_settings(request):
    """
    Update notification settings.
    """
    serializer = NotificationSettingsSerializer(request.user, data=request.data, partial=True)

    if serializer.is_valid():
        user = serializer.save()

        return Response({
            "message": "Notifications updated",
            "settings": {
                "notify_on_likes": user.notify_on_likes,
                "notify_on_review": user.notify_on_review,
                "notify_on_watchlist": user.notify_on_watchlist,
                "notify_on_list_updates": user.notify_on_list_updates,
                "notify_on_comment": user.notify_on_comment,
            },
        })

    return Response(serializer.errors, status=400)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def change_password(request):
    try:
        serializer = PasswordResetSerializer(
            data=request.data,
            context={"user": request.user}
        )

        serializer.is_valid(raise_exception=True)

        new_password = serializer.validated_data["new_password"]

        PasswordHistory.objects.create(
            user=request.user,
            hashed_password=request.user.password,
        )

        request.user.set_password(new_password)
        request.user.save()

        PasswordHistory.objects.filter(
            user=request.user
        ).order_by("-created_at")[5:].delete()

        return Response({"message": "Password updated"}, status=200)

    except ValidationError as e:
        return Response(e.detail, status=400)

    except Exception as e:
        print("change_password error:", e)
        traceback.print_exc()
        return Response({"error": "Server error"}, status=500)
@api_view(["PATCH"])
@permission_classes([IsAuthenticated])
def update_profile_settings(request):
    """
    Update profile settings.
    """
    try:
        serializer = ProfileUpdateSerializer(request.user, data=request.data, partial=True)

        if serializer.is_valid():
            user = serializer.save()
            return Response({
                "message": "Profile updated",
                "profile": ProfileUpdateSerializer(user).data,
            })

        return Response(serializer.errors, status=400)

    except Exception as e:
        print("update_profile error:", e)
        return Response({"error": "Server error"}, status=500)
    
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_profile_settings(request):
    """
    Get full user settings (profile, avatar, notifications, favourites).
    """

    try:
        user = request.user
        
        # Get user's favorite content relations, sorted by rank
        favorites = ContentRelations.objects.filter(
            user=user, 
            favourited__isnull=False
        ).order_by('favourited')
        
        return Response({
            "profile": {
                "id": user.id,
                "username": user.username,
                "email": user.email,
                "website": user.website,
                "location": user.location,
                "bio": user.bio,
                "pronouns": user.pronouns,
            },
            "avatar": {
                "avatar": user.avatar,
                "avatar_image": user.avatar_image.url if user.avatar_image else None,
            },
            "notifications": {
                "notify_on_likes": user.notify_on_likes,
                "notify_on_review": user.notify_on_review,
                "notify_on_watchlist": user.notify_on_watchlist,
                "notify_on_list_updates": user.notify_on_list_updates,
                "notify_on_comment": user.notify_on_comment,
            },
            "favourites": ContentRelationsSerializer(favorites, many=True).data,
        })

    except Exception as e:
        print("get_user_settings error:", e)
        traceback.print_exc()
        return Response({"error": "Server error"}, status=500)
    
@api_view(["POST"])
@permission_classes([IsAuthenticated])
def toggle_follow(request, username):
    try:
        target = User.objects.get(username=username)

        if target == request.user:
            return Response(
                {"error": "You cannot follow yourself"},
                status=400,
            )

        if request.user.following.filter(pk=target.pk).exists():
            request.user.following.remove(target)
            following = False
        else:
            request.user.following.add(target)
            following = True

        return Response({
            "following": following,
            "followers": target.followers.count(),
            "following_count": request.user.following.count(),
        })

    except User.DoesNotExist:
        return Response({"error": "User not found"}, status=404)
    
    
@api_view(["GET"])
@permission_classes([AllowAny])
def search_users(request):
    """
    Search users by username with pagination.
    Query params:
        value: search term
        usersPerPage: number of users per page
        pageNumber: which page to return
    """

    value = request.GET.get("value", "").strip()
    users_per_page = int(request.GET.get("usersPerPage", 20))
    page_number = int(request.GET.get("pageNumber", 1))

    # Filter users by username (case-insensitive)
    queryset = User.objects.filter(username__icontains=value).order_by("username")

    total_results = queryset.count()
    total_pages = max((total_results - 1) // users_per_page + 1, 1)

    # Pagination slice
    start = (page_number - 1) * users_per_page
    end = start + users_per_page
    users_page = queryset[start:end]

    # Serialize only username + avatar + avatar_image
    data = [
        {
            "username": user.username,
            "avatar": user.avatar,
            "avatar_image": user.avatar_image.url if user.avatar_image else None,
        }
        for user in users_page
    ]

    return Response({
        "results": data,
        "total_results": total_results,
        "total_pages": total_pages,
        "current_page": page_number,
        "users_per_page": users_per_page,
    })
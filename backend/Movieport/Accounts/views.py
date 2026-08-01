from django.contrib.auth import get_user_model
import traceback

from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
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
        **AuthUserSerializer(
            user,
            context={"request": request},
        ).data,
    }


@api_view(["POST"])
@permission_classes([AllowAny])
def register_user(request):
    """
    Register new user.
    """
    serializer = RegisterSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    user = serializer.save()

    refresh = RefreshToken.for_user(user)

    response = Response(
        build_auth_response(user, request),
        status=status.HTTP_201_CREATED,
    )

    response.set_cookie("access_token", str(refresh.access_token), max_age=60 * 30, httponly=True, samesite="Lax", secure=True)
    response.set_cookie("refresh_token", str(refresh), max_age=60 * 60 * 24 * 7, httponly=True, samesite="Lax", secure=True)

    return response

@api_view(["POST"])
@permission_classes([AllowAny])
def logout_user(request):
    """
    Logout user.
    """
    response = Response({"message": "Logged out"})
    response.delete_cookie("access_token")
    response.delete_cookie("refresh_token")
    return response

@api_view(["POST"])
@permission_classes([AllowAny])
def login_user(request):
    """
    Login user.
    """
    serializer = LoginSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    user = serializer.validated_data["user"]

    refresh = RefreshToken.for_user(user)

    response = Response(
        build_auth_response(user, request),
        status=status.HTTP_200_OK,
    )

    response.set_cookie("access_token", str(refresh.access_token), max_age=60 * 30, httponly=True, samesite="Lax", secure=True)
    response.set_cookie("refresh_token", str(refresh), max_age=60 * 60 * 24 * 7, httponly=True, samesite="Lax", secure=True)

    return response



@api_view(["GET"])
@permission_classes([AllowAny])
def check_auth(request):
    """
    Check authentication status.
    """
    if request.user.is_authenticated:
    
        return Response(build_auth_response(request.user, request))
    
    return Response({"isAuthenticated": False})





@api_view(["GET"])
@permission_classes([AllowAny])
def get_user_by_username(request, username):
    try:
        user = User.objects.get(username=username)

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
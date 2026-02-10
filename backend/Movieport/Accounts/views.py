from django.contrib.auth import login, logout, get_user_model
from django.views.decorators.csrf import csrf_exempt, ensure_csrf_cookie
import traceback

from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response

from .serializers import RegisterSerializer, LoginSerializer
from Lists.models import Lists
from Lists.serializers import ListsSerializer
from ContentRelations.models import ContentRelations
from ContentRelations.serializers import ContentRelationsSerializer

User = get_user_model()


def build_auth_response(user, request):
    liked_list_ids = list(user.liked_lists.values_list('id', flat=True))
    lists = Lists.objects.filter(user=user)
    content_relations = ContentRelations.objects.filter(user=user)
    return {
        "isAuthenticated": True,
        "id": user.id,
        "username": user.username,
        "email": user.email,
        "lists": ListsSerializer(lists, many=True, context={"request": request}).data,
        "content_relations": ContentRelationsSerializer(content_relations, many=True).data,
        "liked_list_ids": liked_list_ids,
    }


@api_view(['POST'])
@permission_classes([AllowAny])
def register_user(request):
    serializer = RegisterSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    user = serializer.save()
    login(request, user)
    return Response(build_auth_response(user, request), status=status.HTTP_201_CREATED)


@api_view(['POST'])
@csrf_exempt
@permission_classes([AllowAny])
def login_user(request):
    serializer = LoginSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    user = serializer.validated_data['user']
    login(request, user)
    return Response(build_auth_response(user, request), status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([AllowAny])
def check_auth(request):
    try:
        if request.user.is_authenticated:
            return Response(build_auth_response(request.user, request), status=status.HTTP_200_OK)
        return Response({"isAuthenticated": False}, status=status.HTTP_200_OK)
    except Exception as e:
        print("check_auth error:", e)
        traceback.print_exc()
        return Response({"error": str(e)}, status=500)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout_user(request):
    logout(request)
    return Response({"message": "Logged out successfully"}, status=status.HTTP_200_OK)


@api_view(['GET'])
@ensure_csrf_cookie
@permission_classes([AllowAny])
def get_csrf(request):
    return Response({"detail": "CSRF cookie set"}, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([AllowAny])
def get_user_by_username(request, username):
    try:
        user = User.objects.get(username=username)
        user_lists = Lists.objects.filter(user=user, public=True)
        lists_data = ListsSerializer(user_lists, many=True, context={'request': request}).data
        user_content_relations = ContentRelations.objects.filter(user=user)
        content_relations_data = ContentRelationsSerializer(user_content_relations, many=True).data
        liked_list_ids = list(user.liked_lists.values_list('id', flat=True))
        return Response({
            "id": user.id,
            "username": user.username,
            "lists": lists_data,
            "content_relations": content_relations_data,
            "liked_list_ids": liked_list_ids,
        }, status=status.HTTP_200_OK)
    except User.DoesNotExist:
        return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        print("get_user_by_username error:", e)
        traceback.print_exc()
        return Response({"error": str(e)}, status=500)

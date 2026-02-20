from django.contrib.auth import get_user_model
import traceback

from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from django.http import HttpResponse

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
    refresh = RefreshToken.for_user(user)
    access_token = refresh.access_token

    response = Response(build_auth_response(user, request), status=status.HTTP_201_CREATED)
    response.set_cookie(
        'access_token',
        str(access_token),
        max_age=60*30,
        httponly=True,
        samesite='Lax',
        secure=True
    )
    response.set_cookie(
        'refresh_token',
        str(refresh),
        max_age=60*60*24*7,
        httponly=True,
        samesite='Lax',
        secure=True
    )
    return response


@api_view(['POST'])
@permission_classes([AllowAny])
def login_user(request):
    serializer = LoginSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    user = serializer.validated_data['user']
    refresh = RefreshToken.for_user(user)
    access_token = refresh.access_token

    response = Response(build_auth_response(user, request), status=status.HTTP_200_OK)
    response.set_cookie(
        'access_token',
        str(access_token),
        max_age=60*30,
        httponly=True,
        samesite='Lax',
        secure=True
    )
    response.set_cookie(
        'refresh_token',
        str(refresh),
        max_age=60*60*24*7,
        httponly=True,
        samesite='Lax',
        secure=True
    )
    return response


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
@permission_classes([AllowAny])
def logout_user(request):
    response = Response({"message": "Logged out successfully"}, status=status.HTTP_200_OK)
    response.delete_cookie('access_token')
    response.delete_cookie('refresh_token')
    return response


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

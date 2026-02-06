# Standard library imports
from django.contrib.auth import login, logout, get_user_model
from django.views.decorators.csrf import csrf_exempt, ensure_csrf_cookie
import traceback

# Third-party imports
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response

# Local application imports
from .serializers import RegisterSerializer, LoginSerializer
from Lists.models import Lists
from Lists.serializers import ListsSerializer
from ContentRelations.models import ContentRelations
from ContentRelations.serializers import ContentRelationsSerializer

User = get_user_model()


@api_view(['POST'])
@permission_classes([AllowAny])
def register_user(request):
    """Register a new user."""
    serializer = RegisterSerializer(data=request.data)
    if serializer.is_valid(raise_exception=True):
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@csrf_exempt
@permission_classes([AllowAny])
def login_user(request):
    """Log in a user and return user data with liked lists."""
    serializer = LoginSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    user = serializer.validated_data['user']
    login(request, user)
    
    liked_list_ids = list(user.liked_lists.values_list('id', flat=True))
    
    return Response({
        'message': 'Login successful',
        'id': user.id,
        'username': user.username,
        'email': user.email,
        'liked_list_ids': liked_list_ids
    }, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([AllowAny])
def check_auth(request):
    """Check if user is authenticated and return user data."""
    try:
        if request.user.is_authenticated:
            liked_list_ids = list(request.user.liked_lists.values_list('id', flat=True))
            lists = Lists.objects.filter(user=request.user)
            user_content_relations = ContentRelations.objects.filter(user=request.user)
            
            return Response({
                "isAuthenticated": True,
                "id": request.user.id,
                "username": request.user.username,
                "lists": ListsSerializer(lists, many=True, context={'request': request}).data,
                "content_relations": ContentRelationsSerializer(user_content_relations, many=True).data,
                "email": request.user.email,
                "liked_list_ids": liked_list_ids
            }, status=status.HTTP_200_OK)

        return Response({"isAuthenticated": False}, status=status.HTTP_200_OK)
    except Exception as e:
        print("check_auth error:", e)
        traceback.print_exc()
        return Response({"error": str(e)}, status=500)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout_user(request):
    """Log out the current user."""
    logout(request)
    return Response({"message": "Logged out successfully"}, status=status.HTTP_200_OK)


@api_view(['GET'])
@ensure_csrf_cookie
@permission_classes([AllowAny])
def get_csrf(request):
    """Get CSRF token."""
    return Response({"detail": "CSRF cookie set"}, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([AllowAny])
def get_user_by_username(request, username):
    """Retrieve a public view of a user by username."""
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

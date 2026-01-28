from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import ContentRelations
from .serializers import ContentRelationsSerializer
from rest_framework.permissions import AllowAny
from django.contrib.auth import get_user_model

User = get_user_model()

class ContentRelationsViewSet(viewsets.ViewSet):
    serializer_class = ContentRelationsSerializer

  
    @action(detail=False, methods=['get'], permission_classes=[IsAuthenticated])
    def get_all_relations(self, request):
        queryset = ContentRelations.objects.filter(user=request.user)
        serializer = ContentRelationsSerializer(queryset, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'], url_path='by_username/(?P<username>[^/.]+)', permission_classes=[AllowAny])
    def get_relations_by_username(self, request, username=None):
        # Find the user
        user = User.objects.filter(username=username).first()
        if not user:
            return Response({"error": "User not found"}, status=404)

        # Get all content relations for that user
        queryset = ContentRelations.objects.filter(user=user)
        serializer = ContentRelationsSerializer(queryset, many=True)
        return Response(serializer.data)

    
    @action(detail=False, methods=['post'], permission_classes=[IsAuthenticated])
    def toggle(self, request):
        print("toggle received")
        user = request.user
        tmdb_id = request.data.get("tmdb_id")

        likes_incoming = request.data.get("likes")
        watched_incoming = request.data.get("watched")
        watchlisted_incoming = request.data.get("watchlisted")

        if not tmdb_id:
            return Response(
                {"error": "tmdb_id is required"},
                status=status.HTTP_400_BAD_REQUEST
            )

        relation, _ = ContentRelations.objects.get_or_create(
            user=user,
            tmdb_id=tmdb_id,
        )

        if likes_incoming is not None:
            relation.liked = not relation.liked

        if watched_incoming is not None:
            if relation.watched:
                relation.watched = False
            else:
                relation.watched = True
                relation.watchlisted = False

        if watchlisted_incoming is not None:
            if relation.watchlisted:
                relation.watchlisted = False
            else:
                relation.watchlisted = True
                relation.watched = False

        relation.save()
        serializer = ContentRelationsSerializer(relation, context={"request": request})
        return Response(serializer.data, status=status.HTTP_200_OK)
    @action(detail=False, methods=["post"], permission_classes=[IsAuthenticated])
    def set_rating(self, request):
        tmdb_id = request.data.get("tmdb_id")
        rating = request.data.get("rating")

        if not tmdb_id:
            return Response({"error": "tmdb_id required"}, status=400)

        if rating is None:
            return Response({"error": "rating required"}, status=400)

        relation, _ = ContentRelations.objects.get_or_create(
            user=request.user,
            tmdb_id=tmdb_id
        )

        # Set to null if 0, otherwise set the rating
        relation.rating = None if rating == 0 else rating
        relation.save()

        return Response({"rating": relation.rating}, status=200)

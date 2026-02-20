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
        user = request.user
        data = request.data

        field = data.get("field")
        item = data.get("item", {})

        tmdb_id = item.get("tmdb_id")
        if not tmdb_id:
            return Response({"error": "tmdb_id is required in item"}, status=status.HTTP_400_BAD_REQUEST)

        # Get or create the relation
        relation, _ = ContentRelations.objects.get_or_create(
            user=user,
            tmdb_id=tmdb_id,
            defaults={
                "title": item.get("title", ""),
                "poster_path": item.get("poster_path", ""),
                "release_date": item.get("release_date"),
                "media_type": item.get("media_type", "movie"),
                "liked": False,
                "watchlisted": False,
                "watched": False,
            }
        )

        # Update metadata
        for attr in ["title", "poster_path", "release_date", "media_type"]:
            value = item.get(attr)
            if value:
                setattr(relation, attr, value)

        # Toggle field
        if field in ["liked", "watchlisted", "watched"]:
            current = getattr(relation, field)
            setattr(relation, field, not current)

            # enforce mutual exclusivity between watched and watchlisted
            if field == "watched" and relation.watched:
                relation.watchlisted = False
            elif field == "watchlisted" and relation.watchlisted:
                relation.watched = False
        else:
            return Response({"error": "field must be liked, watchlisted, or watched"}, status=status.HTTP_400_BAD_REQUEST)

        relation.save()
        serializer = ContentRelationsSerializer(relation, context={"request": request})
        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(detail=False, methods=["post"], permission_classes=[IsAuthenticated])
    def set_rating(self, request):
        tmdb_id = request.data.get("tmdb_id")
        rating = request.data.get("rating")
        title = request.data.get("title", '')
        poster_path = request.data.get("poster_path", '')
        release_date = request.data.get("release_date")
        media_type = request.data.get("media_type", 'film')

        if not tmdb_id:
            return Response({"error": "tmdb_id required"}, status=400)

        if rating is None:
            return Response({"error": "rating required"}, status=400)

        relation, created = ContentRelations.objects.get_or_create(
            user=request.user,
            tmdb_id=tmdb_id,
            defaults={
                'title': title,
                'poster_path': poster_path,
                'release_date': release_date,
                'media_type': media_type,
            }
        )

        if not created and (title or poster_path or release_date or media_type):
            if title:
                relation.title = title
            if poster_path:
                relation.poster_path = poster_path
            if release_date:
                relation.release_date = release_date
            if media_type:
                relation.media_type = media_type
            relation.save()

        # Set to null if 0, otherwise set the rating
        relation.rating = None if rating == 0 else rating
        relation.save()

        return Response({"rating": relation.rating}, status=200)
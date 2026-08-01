from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from django.contrib.auth import get_user_model
from django.db import transaction

from .models import Review
from .serializers import ReviewSerializer, CreateReviewSerializer
from ContentRelations.models import ContentRelations

User = get_user_model()


class ReviewViewSet(viewsets.ViewSet):
    serializer_class = ReviewSerializer

    @action(detail=False, methods=['post'], permission_classes=[IsAuthenticated])
    def create_review(self, request):
        serializer = CreateReviewSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        item = serializer.validated_data["item"]
        review_text = serializer.validated_data.get("review", "")
        rating = serializer.validated_data["rating"]
        watched_status = serializer.validated_data["watched_status"]

        tmdb_id = item.get("tmdb_id")
        if not tmdb_id:
            return Response(
                {"error": "tmdb_id required"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        with transaction.atomic():
            relation, _ = ContentRelations.objects.get_or_create(
                user=request.user,
                tmdb_id=tmdb_id,
                defaults={
                    "title": item.get("title", ""),
                    "poster_path": item.get("poster_path", ""),
                    "release_date": item.get("release_date"),
                    "media_type": item.get("media_type", "film"),
                },
            )

            relation.title = item.get("title", relation.title)
            relation.poster_path = item.get("poster_path", relation.poster_path)
            relation.release_date = item.get(
                "release_date", relation.release_date
            )
            relation.media_type = item.get("media_type", relation.media_type)

            if watched_status in ["watched", "rewatched"]:
                relation.watched = True

            relation.rating = rating
            relation.save()

            review = Review.objects.create(
                user=request.user,
                content_relation=relation,
                review=review_text,
                rating=rating,
                watched_status=watched_status,
                contains_spoilers=serializer.validated_data.get(
                    "contains_spoilers", False
                ),
            )

        return Response(
            ReviewSerializer(review, context={"request": request}).data,
            status=status.HTTP_201_CREATED,
        )

    @action(detail=False, methods=["get"], permission_classes=[AllowAny])
    def by_username(self, request):
        username = request.query_params.get("username")

        if not username:
            return Response(
                {"error": "username is required"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        user = User.objects.filter(username=username).first()

        if not user:
            return Response(
                {"error": "User not found"},
                status=status.HTTP_404_NOT_FOUND,
            )

        reviews = Review.objects.filter(user=user)

        return Response(
            ReviewSerializer(
                reviews,
                many=True,
                context={"request": request},
            ).data
        )
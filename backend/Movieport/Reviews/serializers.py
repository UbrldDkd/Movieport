from rest_framework import serializers
from django.contrib.auth import get_user_model

from .models import Review
from ContentRelations.models import ContentRelations
from ContentRelations.serializers import ContentRelationsSerializer

User = get_user_model()

class ReviewSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField()
    content_relation = serializers.SerializerMethodField()
    is_owner = serializers.SerializerMethodField()

    class Meta:
        model = Review
        fields = [
            "id",
            "user",
            "content_relation",
            "review",
            "rating",
            "watched_status",
            "contains_spoilers",
            "is_owner",
            "created_at",
        ]
        read_only_fields = ["id", "created_at"]

    def get_user(self, obj):
        return {
            "id": obj.user.id,
            "username": obj.user.username,
            "avatar": obj.user.avatar if not obj.user.avatar_image else None,
            "avatar_url": (
                obj.user.avatar_image.url if obj.user.avatar_image else None
            ),
        }

    def get_content_relation(self, obj):
        return ContentRelationsSerializer(obj.content_relation).data

    def get_is_owner(self, obj):
        request = self.context.get("request")

        if request is None or not request.user.is_authenticated:
            return False

        return obj.user_id == request.user.id


class CreateReviewSerializer(serializers.Serializer):
    item = serializers.DictField()
    review = serializers.CharField(required=False, allow_blank=True)
    rating = serializers.DecimalField(max_digits=2, decimal_places=1)
    watched_status = serializers.ChoiceField(choices=Review.WATCH_STATUS_CHOICES)
    contains_spoilers = serializers.BooleanField(default=False)

    def validate(self, data):
        rating = data.get('rating')
        if rating < 0.5 or rating > 5:
            raise serializers.ValidationError('Rating must be between 0.5 and 5')
        return data

from rest_framework import serializers
from .models import ContentRelations

class ContentRelationsSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContentRelations
        fields = [
            'id',
            'user',
            'tmdb_id',
            'title',
            'poster_path',
            'release_date',
            'media_type',
            'liked',
            'watchlisted',
            'watched',
            'favourited',
            'rating',
            'created_at'
        ]
        read_only_fields = ['id', 'created_at']

class FavouriteItemSerializer(serializers.Serializer):
    tmdb_id = serializers.IntegerField()
    favourited = serializers.IntegerField(min_value=0, max_value=3)
    release_date = serializers.CharField(required=False, allow_null=True)
    title = serializers.CharField(required=False, allow_null=True, allow_blank=True)
    media_type = serializers.CharField(required=False, allow_null=True, allow_blank=True)
    poster_path = serializers.CharField(required=False, allow_null=True, allow_blank=True)

class SaveFavouritesSerializer(serializers.Serializer):
    favourites = FavouriteItemSerializer(many=True)

    def validate_favourites(self, value):
        if len(value) > 4:
            raise serializers.ValidationError(
                "Maximum 4 favourites allowed."
            )
        return value

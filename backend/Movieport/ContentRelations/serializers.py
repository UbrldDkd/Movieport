from rest_framework import serializers
from .models import ContentRelations

class ContentRelationsSerializer(serializers.ModelSerializer):

    class Meta:
        model = ContentRelations
        fields = [ 'user', 'tmdb_id', 'title', 'poster_path', 'release_date', 'media_type', 'liked', 'watchlisted', 'watched','favourited','rating', 'created_at']
        read_only_fields = ['id', 'created_at']

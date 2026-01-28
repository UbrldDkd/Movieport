from rest_framework import serializers
from .models import ContentRelations

class ContentRelationsSerializer(serializers.ModelSerializer):

    class Meta:
        model = ContentRelations
        fields = ['id', 'user', 'tmdb_id', 'liked', 'watchlisted', 'watched','favourited','rating', 'created_at']
        read_only_fields = ['id', 'created_at']

# serializers.py
from rest_framework import serializers
from .models import ContentActivity, ListActivity


class ContentActivitySerializer(serializers.ModelSerializer):
    class Meta:
        model = ContentActivity
        fields = ['id', 'user', 'tmdb_id', 'action_type', 'timestamp']


class ListActivitySerializer(serializers.ModelSerializer):
    list_title = serializers.CharField(source='list.title', read_only=True)
    list_slug = serializers.CharField(source='list.title_slug', read_only=True)
    list_owner = serializers.CharField(source='list.user.username', read_only=True)
    
    class Meta:
        model = ListActivity
        fields = ['id', 'user', 'list_title', 'list_slug', 'list_owner', 'timestamp']
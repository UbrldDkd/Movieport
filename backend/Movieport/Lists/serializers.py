from rest_framework import serializers
from .models import Lists
from ContentRelations.serializers import ContentRelationsSerializer

class ListsSerializer(serializers.ModelSerializer):
    item_count = serializers.SerializerMethodField()
    film_count = serializers.SerializerMethodField()
    tv_count = serializers.SerializerMethodField()
    items = ContentRelationsSerializer(many=True, read_only=True)
    is_owner = serializers.SerializerMethodField()
    watched_percentage = serializers.SerializerMethodField()
    liked_by = serializers.SerializerMethodField()
    likes_count = serializers.IntegerField(source='likes.count', read_only=True)

    class Meta:
        model = Lists
        fields = [
            'id', 'title', 'description', 'public', 'created_at', 'updated_at',
            'item_count', 'film_count', 'tv_count', 'title_slug', 'items', 
            'watched_percentage', 'liked_by', 'likes_count', 'is_owner'
        ]

    def get_item_count(self, obj):
        return obj.items.count()

    def get_film_count(self, obj):
        return obj.items.filter(media_type='film').count()
    
    def get_tv_count(self, obj):
        return obj.items.filter(media_type='tv').count()

    def get_is_owner(self, obj):
        request = self.context.get("request")
        if request and request.user.is_authenticated:
            return obj.user == request.user
        return False
    
    def get_watched_percentage(self, obj):
        total = obj.items.count()
        if total == 0:
            return 0
        watched = obj.items.filter(watched=True).count()
        return round((watched / total) * 100, 2)
    
    def get_liked_by(self, obj):
        return [user.username for user in obj.likes.all()]
# views.py
from django.contrib.auth import get_user_model
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from .models import ContentActivity, ListActivity
from .serializers import ContentActivitySerializer, ListActivitySerializer
from Lists.models import Lists


User = get_user_model()


class ActivityViewSet(viewsets.ViewSet):

    @action(detail=False, methods=["get"], permission_classes=[IsAuthenticated])
    def my_activity(self, request):
        content_acts = ContentActivity.objects.filter(user=request.user)
        list_acts = ListActivity.objects.filter(user=request.user)
        
        # Serialize both types
        content_data = ContentActivitySerializer(content_acts, many=True).data
        list_data = ListActivitySerializer(list_acts, many=True).data
        
        # Transform to uniform format
        activities = []
        for act in content_data:
            activities.append({
                'type': act['action_type'],
                'timestamp': act['timestamp'],
                'tmdb_id': act['tmdb_id']
            })
        for act in list_data:
            activities.append({
                'type': 'liked_list',
                'timestamp': act['timestamp'],
                'list_title': act['list_title'],
                'list_slug': act['list_slug'],
                'list_owner': act['list_owner']
            })
        
        # Sort by timestamp
        activities.sort(key=lambda x: x['timestamp'], reverse=True)
        return Response(activities, status=200)

    @action(detail=False, methods=["get"], url_path='by_username/(?P<username>[^/.]+)', permission_classes=[AllowAny])
    def get_activity(self, request, username=None):
        user = User.objects.filter(username=username).first()
        if not user:
            return Response({"error": "User not found"}, status=404)

        content_acts = ContentActivity.objects.filter(user=user)
        list_acts = ListActivity.objects.filter(user=user)
        
        # Serialize both types
        content_data = ContentActivitySerializer(content_acts, many=True).data
        list_data = ListActivitySerializer(list_acts, many=True).data
        
        # Transform to uniform format
        activities = []
        for act in content_data:
            activities.append({
                'type': act['action_type'],
                'timestamp': act['timestamp'],
                'tmdb_id': act['tmdb_id']
            })
        for act in list_data:
            activities.append({
                'type': 'liked_list',
                'timestamp': act['timestamp'],
                'list_title': act['list_title'],
                'list_slug': act['list_slug'],
                'list_owner': act['list_owner']
            })
        
        # Sort by timestamp
        activities.sort(key=lambda x: x['timestamp'], reverse=True)
        return Response(activities, status=200)

    @action(detail=False, methods=["post"], permission_classes=[IsAuthenticated])
    def toggle_action(self, request):
        tmdb_id = request.data.get("tmdb_id")
        list_id = request.data.get("list")
        action_type = request.data.get("action_type")

        if list_id:
            try:
                lst = Lists.objects.get(id=list_id)
            except Lists.DoesNotExist:
                return Response({"error": "List not found"}, status=404)
                
            activity, created = ListActivity.objects.get_or_create(
                user=request.user,
                list=lst
            )
            if not created:
                activity.delete()
                return Response({"removed": True}, status=200)
            return Response({"added": True}, status=200)

        if tmdb_id and action_type:
            activity, created = ContentActivity.objects.get_or_create(
                user=request.user,
                tmdb_id=tmdb_id,
                action_type=action_type
            )
            if not created:
                activity.delete()
                return Response({"removed": True}, status=200)
            return Response({"added": True}, status=200)

        return Response({"error": "Either tmdb_id or list required"}, status=400)
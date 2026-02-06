# models.py
from django.db import models
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType
from django.contrib.auth import get_user_model

User = get_user_model()

class ContentActivity(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='content_activities')
    title = models.CharField()
    tmdb_id = models.IntegerField()
    action_type = models.CharField(max_length=50)  # 'watched', 'liked', 'watchlisted'
    timestamp = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['-timestamp']

class ListActivity(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='list_activities')
    list = models.ForeignKey('Lists.Lists', on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['-timestamp']
        unique_together = ('user', 'list')
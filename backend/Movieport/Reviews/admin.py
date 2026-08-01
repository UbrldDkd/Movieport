from django.contrib import admin
from .models import Review

@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'content_relation', 'rating', 'watched_status', 'created_at')
    list_filter = ('watched_status', 'rating', 'created_at')
    search_fields = ('user__username', 'content_relation__title', 'content_relation__tmdb_id')

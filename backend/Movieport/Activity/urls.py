from django.urls import path
from . import views

urlpatterns = [
    path('recent/', views.recent_content_activity, name='recent-content-activity'),
    path('recent-lists/', views.recent_list_activity, name='recent-list-activity'),
]
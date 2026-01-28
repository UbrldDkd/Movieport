from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ContentRelationsViewSet

router = DefaultRouter()
router.register('', ContentRelationsViewSet, basename='content_relations')

urlpatterns = [
    path('', include(router.urls)),
]

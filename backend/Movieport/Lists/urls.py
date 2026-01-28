from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ListsViewSet

router = DefaultRouter()
router.register('', ListsViewSet, basename="lists")

urlpatterns = [
    path("", include(router.urls)),
]

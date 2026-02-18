from django.urls import path
from . import views
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('register/', views.register_user, name='register'),
    path('login/', views.login_user, name='login'),
    path('check_auth/', views.check_auth, name='check_auth'),
    path('logout_user/', views.logout_user, name='logout_user'),
    path('get_user/<str:username>/', views.get_user_by_username, name='get_user_by_username'),
    path('refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
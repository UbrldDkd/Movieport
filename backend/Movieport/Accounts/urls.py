from django.urls import path
from . import views

urlpatterns = [
    path('register/', views.register_user, name='register'),        
    path('login/', views.login_user, name='login'),
    path('check_auth/', views.check_auth, name='check_auth'),
    path('logout_user/', views.logout_user, name='logout_user'),
    path('get_user/<str:username>/', views.get_user_by_username, name='get_user_by_username'),
    path('refresh/', views.refresh_token, name='token_refresh'),
    
    # User settings endpoints
    path('profile/change_password/', views.change_password, name='change_password'),
    path('profile/get_settings/', views.get_profile_settings, name='get_profile_settings'),
    path('profile/update_settings/', views.update_profile_settings, name='update_profile_settings'),
    path('profile/update_avatar/', views.update_avatar, name='update_avatar'),
    
    # User network endpoints
    path('toggle_follow/<str:username>/', views.toggle_follow, name='toggle_follow'),
    
    # Search for users
    path('search_users/', views.search_users, name='search_users')
]
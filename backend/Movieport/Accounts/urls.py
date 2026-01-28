from django.urls import path
from . import views

urlpatterns = [
    path('register/', views.register_user, name='register'),
    path('login/', views.login_user, name='login'),
    path('check_auth/', views.check_auth, name='check_auth'),
    path('logout_user/', views.logout_user, name='logout_user'),
    path('get_csrf/', views.get_csrf, name='get_csrf'),
    path('get_user/<str:username>/', views.get_user_by_username, name='get_user_by_username'),

    
]
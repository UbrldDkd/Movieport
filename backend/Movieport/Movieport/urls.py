from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path('admin/', admin.site.urls),
    path('accounts/', include('Accounts.urls')),
    path('content_relations/', include('ContentRelations.urls')),
    path('lists/', include('Lists.urls')),
]
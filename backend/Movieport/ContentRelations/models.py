from django.db import models
from django.contrib.auth import get_user_model
from django.core.validators import MinValueValidator, MaxValueValidator


User = get_user_model()


class ContentRelations(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='content_relations')
    tmdb_id = models.IntegerField(unique=True)
    liked = models.BooleanField(default=False)
    watchlisted = models.BooleanField(default=False)
    watched = models.BooleanField(default=False)
    favourited = models.BooleanField(default=False)
    rating = models.DecimalField(max_digits=2, decimal_places=1, null=True, blank=True,validators=[MinValueValidator(0.5), MaxValueValidator(5.0)])
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    

    def __str__ (self):
        return f'movie {self.tmdb_id}'
    
    class Meta:
        ordering =['-created_at']

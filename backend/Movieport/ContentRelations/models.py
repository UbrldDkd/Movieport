from django.db import models
from django.contrib.auth import get_user_model
from django.core.validators import MinValueValidator, MaxValueValidator


User = get_user_model()


class ContentRelations(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='content_relations')
    tmdb_id = models.IntegerField(unique=True)
    title = models.CharField(max_length=255, default='')
    poster_path = models.CharField(max_length=500, default='')
    release_date = models.DateField(null=True, blank=True)
    media_type = models.CharField(max_length=10, choices=[('film', 'Film'), ('tv', 'TV')], default='film')
    liked = models.BooleanField(default=False)
    watchlisted = models.BooleanField(default=False)
    watched = models.BooleanField(default=False)
    favourited = models.BooleanField(default=False)
    rating = models.DecimalField(max_digits=2, decimal_places=1, null=True, blank=True,validators=[MinValueValidator(0.5), MaxValueValidator(5.0)])
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
        

    def __str__(self):
        year = self.release_date.year if self.release_date else "N/A"
        return f'{self.media_type} {self.title} ({year})'
    class Meta:
        ordering =['-created_at']

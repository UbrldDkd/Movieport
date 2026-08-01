from django.db import models
from django.contrib.auth import get_user_model
from django.core.validators import MinValueValidator, MaxValueValidator

from ContentRelations.models import ContentRelations

User = get_user_model()

class Review(models.Model):
    WATCH_STATUS_CHOICES = [
        ('watched', 'Watched'),
        ('rewatched', 'Rewatched'),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='reviews')
    content_relation = models.ForeignKey(ContentRelations, on_delete=models.CASCADE, related_name='reviews')
    review = models.TextField(blank=True, null=True)
    rating = models.DecimalField(max_digits=2, decimal_places=1, validators=[MinValueValidator(0.5), MaxValueValidator(5.0)])
    watched_status = models.CharField(max_length=10, choices=WATCH_STATUS_CHOICES, default='watched')
    contains_spoilers = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f'Review by {self.user.username} for {self.content_relation.tmdb_id} ({self.rating})'
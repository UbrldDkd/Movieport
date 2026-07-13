from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib.auth.hashers import check_password


class PortUser(AbstractUser):
    AVATAR_CHOICES = [
        ("war", "War"),
        ("conquest", "Conquest"),
        ("famine", "Famine"),
        ("death", "Death"),
    ]

    PRONOUN_CHOICES = [
        ("he/him", "He/Him"),
        ("she/her", "She/Her"),
        ("they/them", "They/Them"),
    ]

    date_of_birth = models.DateField(blank=True, null=True)

    website = models.URLField(blank=True, null=True)
    location = models.CharField(max_length=100, blank=True, null=True)
    bio = models.TextField(blank=True, null=True)
    
    following = models.ManyToManyField(
    "self",
    symmetrical=False,
    related_name="followers",
    blank=True,
)

    pronouns = models.CharField(
        max_length=20,
        choices=PRONOUN_CHOICES,
        default='they/them',
        blank=True,
        null=True,
    )

    avatar = models.CharField(
        max_length=20,
        choices=AVATAR_CHOICES,
        default='death',
        blank=True,
        null=True,
    )

    avatar_image = models.ImageField(
        upload_to="avatars/",
        blank=True,
        null=True,
    )

    notify_on_likes = models.BooleanField(default=True)
    notify_on_review = models.BooleanField(default=True)
    notify_on_watchlist = models.BooleanField(default=True)
    notify_on_list_updates = models.BooleanField(default=True)
    notify_on_comment = models.BooleanField(default=True)

    def __str__(self):
        return self.username

    def get_avatar_url(self):
        if self.avatar_image:
            return self.avatar_image.url
        if self.avatar:
            return f"/static/avatars/{self.avatar}.png"
        return None


class PasswordHistory(models.Model):
    user = models.ForeignKey(
        "PortUser",
        on_delete=models.CASCADE,
        related_name="password_history",
    )
    hashed_password = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]

    @staticmethod
    def is_password_in_history(user, raw_password, limit=5):
        history = PasswordHistory.objects.filter(user=user).order_by("-created_at")[:limit]
        return any(check_password(raw_password, h.hashed_password) for h in history)
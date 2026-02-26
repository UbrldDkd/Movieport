from django.db import models
from django.contrib.auth.models import AbstractUser, Group, Permission

class PortUser(AbstractUser):
    phone = models.CharField(max_length=20, blank=True, null=True, unique=True)
    date_of_birth = models.DateField(blank=True, null=True)
    
    # Override these to avoid reverse accessor clashes
    groups = models.ManyToManyField(
        Group,
        related_name="portuser_set",
        blank=True,
        help_text="The groups this user belongs to.",
        verbose_name="groups",
    )
    user_permissions = models.ManyToManyField(
        Permission,
        related_name="portuser_permissions_set",
        blank=True,
        help_text="Specific permissions for this user.",
        verbose_name="user permissions",
    )

    def __str__(self):
        return self.username
    
    def full_info(self):
        return f"Username: {self.username}, list_count: {self.lists.count()}"
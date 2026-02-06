from django.db import models
from django.contrib.auth.models import AbstractUser

class PortUser(AbstractUser):
    phone = models.CharField(max_length=20, blank=True, null=True, unique=True)
    date_of_birth = models.DateField(blank=True, null=True)

    def __str__(self):
        return self.username
    
    def full_info(self):
        return(f"Username: {self.username}, list_count: {self.lists.count()}")
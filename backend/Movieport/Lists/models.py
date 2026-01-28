from django.db import models
from django.utils.text import slugify
from django.contrib.postgres.fields import ArrayField
from django.contrib.auth import get_user_model

User = get_user_model()

class Lists(models.Model):
    title = models.CharField(max_length=100, default='')
    description = models.TextField(blank=True)
    public = models.BooleanField(default=True)
    title_slug = models.SlugField(max_length=120, blank=True, editable=False)
    old_slugs = ArrayField(models.CharField(max_length=120), default=list, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='lists')
    items = models.ManyToManyField('ContentRelations.ContentRelations', related_name='lists')
    likes = models.ManyToManyField(User, related_name='liked_lists', blank=True)
    

    def save(self, *args, **kwargs):
        if self.pk:
            old = Lists.objects.get(pk=self.pk)
            if old.title != self.title and old.title_slug:
                if old.title_slug not in self.old_slugs:
                    self.old_slugs.append(old.title_slug)

        base_slug = slugify(self.title)
        slug = base_slug
        counter = 1
        while Lists.objects.filter(user=self.user, title_slug=slug).exclude(pk=self.pk).exists():
            slug = f"{base_slug}-{counter}"
            counter += 1
        self.title_slug = slug

        super().save(*args, **kwargs)

    def __str__(self):
        return self.title

    class Meta:
        ordering = ['-created_at']

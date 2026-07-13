from rest_framework import serializers
from django.contrib.auth import get_user_model, authenticate
from .models import PasswordHistory
from Lists.models import Lists
from Lists.serializers import ListsSerializer
from ContentRelations.models import ContentRelations
from ContentRelations.serializers import ContentRelationsSerializer


User = get_user_model()

class AuthUserSerializer(serializers.ModelSerializer):
    avatar_url = serializers.SerializerMethodField()
    followers_count = serializers.SerializerMethodField()
    following_count = serializers.SerializerMethodField()
    lists = serializers.SerializerMethodField()
    content_relations = serializers.SerializerMethodField()
    liked_list_ids = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = [
            "id",
            "username",
            "email",
            "bio",
            "website",
            "location",
            "pronouns",
            "date_of_birth",
            "avatar",
            "avatar_image",
            "avatar_url",
            "followers_count",
            "following_count",
            "lists",
            "content_relations",
            "liked_list_ids",
        ]

    def get_avatar_url(self, obj):
        return obj.get_avatar_url()

    def get_followers_count(self, obj):
        return obj.followers.count()

    def get_following_count(self, obj):
        return obj.following.count()

    def get_lists(self, obj):
        return ListsSerializer(
            Lists.objects.filter(user=obj),
            many=True,
            context=self.context,
        ).data

    def get_content_relations(self, obj):
        return ContentRelationsSerializer(
            ContentRelations.objects.filter(user=obj),
            many=True,
        ).data

    def get_liked_list_ids(self, obj):
        return list(obj.liked_lists.values_list("id", flat=True))
    
class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["username", "email", "password"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)

class AvatarUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["avatar", "avatar_image"]

    def validate_avatar(self, value):
        if value:
            valid = [choice[0] for choice in User.AVATAR_CHOICES]
            if value not in valid:
                raise serializers.ValidationError("Invalid avatar choice")
        return value

    def validate(self, data):
        if data.get("avatar") and data.get("avatar_image"):
            raise serializers.ValidationError("Use either avatar or avatar_image, not both")
        return data

    def update(self, instance, validated_data):
        avatar = validated_data.get("avatar")
        avatar_image = validated_data.get("avatar_image")

        # clear both first (hard reset)
        instance.avatar = None
        if instance.avatar_image:
            instance.avatar_image.delete(save=False)
        instance.avatar_image = None

        # apply only one
        if avatar_image:
            instance.avatar_image = avatar_image
        elif avatar:
            instance.avatar = avatar

        instance.save()
        return instance
    
class LoginSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=25)
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        user = authenticate(
            username=data.get("username"),
            password=data.get("password"),
        )

        if not user:
            raise serializers.ValidationError("Invalid credentials")

        data["user"] = user
        return data



class NotificationSettingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            "notify_on_likes",
            "notify_on_review",
            "notify_on_watchlist",
            "notify_on_list_updates",
            "notify_on_comment",
        ]

class PasswordResetSerializer(serializers.Serializer):
    current_password = serializers.CharField(write_only=True)
    new_password = serializers.CharField(write_only=True)

    def validate(self, data):
        user = self.context.get("user")

        if not user:
            raise serializers.ValidationError("User not found in context")

        current_password = data["current_password"]
        new_password = data["new_password"]

        if not user.check_password(current_password):
            raise serializers.ValidationError({"current_password": "Incorrect password"})

        if user.check_password(new_password):
            raise serializers.ValidationError({"new_password": "New password cannot be same as old password"})

        if PasswordHistory.is_password_in_history(user, new_password, limit=5):
            raise serializers.ValidationError({"new_password": "Password was used recently"})

        if len(new_password) < 8:
            raise serializers.ValidationError({"new_password": "Too short"})

        return data


class ProfileUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            "username",
            "email",
            "website",
            "location",
            "bio",
            "pronouns",
            "avatar",
            "avatar_image",
        ]

    def validate_email(self, value):
        user = self.instance
        qs = User.objects.filter(email=value)

        if user:
            qs = qs.exclude(id=user.id)

        if qs.exists():
            raise serializers.ValidationError("This email is already in use.")

        return value
    

class PublicProfileSerializer(serializers.ModelSerializer):
    lists = serializers.SerializerMethodField()

    likes = serializers.SerializerMethodField()
    watchlist = serializers.SerializerMethodField()
    watched = serializers.SerializerMethodField()
    favourites = serializers.SerializerMethodField()

    liked_list_ids = serializers.SerializerMethodField()

    followers = serializers.SerializerMethodField()
    following = serializers.SerializerMethodField()

    is_owner = serializers.SerializerMethodField()
    is_following = serializers.SerializerMethodField()
    follows_you = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = [
            "id",
            "username",
            "bio",
            "website",
            "location",
            "avatar",
            "avatar_image",
            "pronouns",
            "lists",
            "likes",
            "watchlist",
            "watched",
            "favourites",
            "liked_list_ids",
            "followers",
            "following",
            "is_owner",
            "is_following",
            "follows_you",
        ]

    def get_lists(self, obj):
        return ListsSerializer(
            Lists.objects.filter(user=obj, public=True),
            many=True,
            context=self.context,
        ).data

    def get_likes(self, obj):
        return ContentRelationsSerializer(
            ContentRelations.objects.filter(user=obj, liked=True),
            many=True,
        ).data

    def get_watchlist(self, obj):
        return ContentRelationsSerializer(
            ContentRelations.objects.filter(user=obj, watchlisted=True),
            many=True,
        ).data

    def get_watched(self, obj):
        return ContentRelationsSerializer(
            ContentRelations.objects.filter(user=obj, watched=True),
            many=True,
        ).data

    def get_favourites(self, obj):
        return ContentRelationsSerializer(
            ContentRelations.objects.filter(
                user=obj,
                favourited__isnull=False,
            ).order_by("favourited"),
            many=True,
        ).data

    def get_liked_list_ids(self, obj):
        return list(obj.liked_lists.values_list("id", flat=True))

    def get_followers(self, obj):
        return [
            {
                "id": u.id,
                "username": u.username,
                "avatar": u.avatar,
            }
            for u in obj.followers.all()
        ]

    def get_following(self, obj):
        return [
            {
                "id": u.id,
                "username": u.username,
                "avatar": u.avatar,
            }
            for u in obj.following.all()
        ]

    def get_is_owner(self, obj):
        request = self.context["request"]
        return (
            request.user.is_authenticated
            and request.user.id == obj.id
        )

    def get_is_following(self, obj):
        request = self.context["request"]

        if not request.user.is_authenticated or request.user.id == obj.id:
            return None

        return request.user.following.filter(pk=obj.pk).exists()

    def get_follows_you(self, obj):
        request = self.context["request"]

        if not request.user.is_authenticated or request.user.id == obj.id:
            return None

        return obj.following.filter(pk=request.user.pk).exists()

    def to_representation(self, instance):
        data = super().to_representation(instance)

        if data["is_owner"]:
            data.pop("is_following")
            data.pop("follows_you")

        return data
   
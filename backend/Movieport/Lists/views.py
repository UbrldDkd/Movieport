# Standard library
from django.db import transaction
from django.db.models import Q
from django.contrib.auth import get_user_model

# Third-party imports
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated, AllowAny

# Local application imports
from .models import Lists
from .serializers import ListsSerializer
from ContentRelations.models import ContentRelations
from ContentRelations.serializers import ContentRelationsSerializer


User = get_user_model()


class ListsViewSet(viewsets.ViewSet):

    @action(detail=False, methods=["get"], permission_classes=[AllowAny])
    def get_all_public_lists(self, request):
        """Get all public lists from all users, ordered by latest."""
        lists = Lists.objects.filter(public=True).select_related('user').order_by('-created_at')
        serializer = ListsSerializer(lists, many=True, context={"request": request})
        data = serializer.data

        # Append username to each list
        for idx, list_obj in enumerate(lists):
            data[idx]['username'] = list_obj.user.username
            data[idx]['likers_count'] = list_obj.likes.count()

        return Response(data, status=status.HTTP_200_OK)

    @action(detail=False, methods=["get"], permission_classes=[IsAuthenticated])
    def lists_all(self, request):
        """Get all lists for the authenticated user."""
        lists = Lists.objects.filter(user=request.user)
        serializer = ListsSerializer(lists, many=True, context={"request": request})
        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(
        detail=False,
        methods=["get"],
        url_path="list/(?P<username>[^/.]+)/(?P<title_slug>[^/.]+)",
        permission_classes=[AllowAny]
    )
    def list_detail(self, request, username=None, title_slug=None):
        """Get a specific list by username and title slug."""
        user = User.objects.filter(username=username).first()
        if not user:
            return Response(
                {"error": "User not found"},
                status=status.HTTP_404_NOT_FOUND
            )

        lst = Lists.objects.filter(user=user).filter(
            Q(title_slug=title_slug) | Q(old_slugs__contains=[title_slug])
        ).first()

        if not lst:
            return Response(
                {"error": "List not found"},
                status=status.HTTP_404_NOT_FOUND
            )

        serializer = ListsSerializer(lst, context={"request": request})
        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(
        detail=False,
        methods=["post"],
        permission_classes=[AllowAny],
        url_path="lists_by_ids"
    )
    def lists_by_ids(self, request):
        """
        Get multiple lists by their IDs.
        Expects a JSON body with an array of list IDs.
        Returns each list plus the creator's username.
        """
        list_ids = request.data.get("list_ids", [])

        if not list_ids:
            return Response(
                {"error": "list_ids array required"},
                status=status.HTTP_400_BAD_REQUEST
            )

        if not isinstance(list_ids, list):
            return Response(
                {"error": "list_ids must be an array"},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Fetch lists by IDs including the user
        lists = Lists.objects.filter(id__in=list_ids, public=True).select_related('user')

        serializer = ListsSerializer(lists, many=True, context={"request": request})
        data = serializer.data

        # Append the username of the list creator to each serialized list
        for idx, list_obj in enumerate(lists):
            data[idx]['username'] = list_obj.user.username if list_obj.user else None

        return Response(data, status=status.HTTP_200_OK)


    @action(detail=False, methods=["post"], permission_classes=[IsAuthenticated])
    def create_list(self, request):
        """Create a new list with optional items."""
        items_data = request.data.pop("items", [])
        serializer = ListsSerializer(data=request.data, context={"request": request})
        serializer.is_valid(raise_exception=True)

        with transaction.atomic():
            new_list = serializer.save(user=request.user)

            for item in items_data:
                tmdb_id = item.get("tmdb_id")
                content_relation, _ = ContentRelations.objects.get_or_create(
                    user=request.user,
                    tmdb_id=tmdb_id,
                    defaults={
                        'title': item.get('title', ''),
                        'poster_path': item.get('poster_path', ''),
                        'release_date': item.get('release_date'),
                        'media_type': item.get('media_type', 'movie'),
                    }
                )
                new_list.items.add(content_relation)

        response_serializer = ListsSerializer(new_list, context={"request": request})
        return Response(response_serializer.data, status=status.HTTP_201_CREATED)

    @action(detail=True, methods=["patch"], permission_classes=[IsAuthenticated])
    def update_list(self, request, pk=None):
        """Update an existing list."""
        try:
            lst = Lists.objects.get(id=pk)
        except Lists.DoesNotExist:
            return Response(
                {"error": "List not found"},
                status=status.HTTP_404_NOT_FOUND
            )

        if lst.user != request.user:
            return Response(
                {"error": "Permission denied"},
                status=status.HTTP_403_FORBIDDEN
            )

        serializer = ListsSerializer(
            lst,
            data=request.data,
            partial=True,
            context={"request": request}
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(detail=True, methods=["delete"], permission_classes=[IsAuthenticated])
    def delete_list(self, request, pk=None):
        """Delete a list."""
        try:
            lst = Lists.objects.get(id=pk)
        except Lists.DoesNotExist:
            return Response(
                {"error": "List not found"},
                status=status.HTTP_404_NOT_FOUND
            )

        if lst.user != request.user:
            return Response(
                {"error": "Permission denied"},
                status=status.HTTP_403_FORBIDDEN
            )

        lst.delete()
        return Response(
            {"message": "List deleted"},
            status=status.HTTP_200_OK
        )

    @action(detail=False, methods=["post"], permission_classes=[IsAuthenticated])
    def add_items(self, request):
        """Add items to a list."""
        items = request.data.get("items")
        list_id = request.data.get("list")

        if not items or not list_id:
            return Response(
                {"error": "items and list required"},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Ensure items is a list for consistent processing
        if not isinstance(items, list):
            items = [items]

        # Validate that each item has required fields
        for item in items:
            if not item.get("tmdb_id"):
                return Response(
                    {"error": "Each item must include tmdb_id"},
                    status=status.HTTP_400_BAD_REQUEST
                )

        try:
            lst = Lists.objects.get(id=list_id, user=request.user)
        except Lists.DoesNotExist:
            return Response(
                {"error": "List not found or not owned by user"},
                status=status.HTTP_404_NOT_FOUND
            )

        added_items = []

        with transaction.atomic():
            for item in items:
                # Extract item data, using provided values or defaults
                content_item, _ = ContentRelations.objects.get_or_create(
                    user=request.user,
                    tmdb_id=item.get("tmdb_id"),
                    defaults={
                        'title': item.get('title', ''),
                        'poster_path': item.get('poster_path', ''),
                        'release_date': item.get('release_date'),
                        'media_type': item.get('media_type', 'movie'),
}
                )
                content_item.lists.add(lst)
                added_items.append(content_item)

        serializer = ContentRelationsSerializer(added_items, many=True)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    @action(detail=False, methods=["post"], permission_classes=[IsAuthenticated])
    def remove_items(self, request):
        """Remove items from list by tmdb_id."""
        list_id = request.data.get("list")
        tmdb_id = request.data.get("tmdb_ids")

        if not list_id or not tmdb_id:
            return Response(
                {"error": "list and tmdb_id required"},
                status=status.HTTP_400_BAD_REQUEST
            )

        if isinstance(tmdb_id, int):
            tmdb_ids = [tmdb_id]
        elif isinstance(tmdb_id, list):
            tmdb_ids = tmdb_id
        else:
            return Response(
                {"error": "tmdb_id must be int or array"},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            lst = Lists.objects.get(id=list_id, user=request.user)
        except Lists.DoesNotExist:
            return Response(
                {"error": "List not found or not owned by user"},
                status=status.HTTP_404_NOT_FOUND
            )

        relations = ContentRelations.objects.filter(
            user=request.user,
            tmdb_id__in=tmdb_ids
        )

        count = relations.count()
        lst.items.remove(*relations)

        return Response(
            {"message": f"Removed {count} item(s)"},
            status=status.HTTP_200_OK
        )

    @action(
        detail=False,
        methods=["post"],
        permission_classes=[IsAuthenticated],
        url_path="toggle_like/(?P<list_id>[^/.]+)"
    )
    def toggle_like(self, request, list_id=None):
        """
        Toggle like status for a list.
        Users cannot like their own lists.
        """
        try:
            lst = Lists.objects.get(id=list_id)
        except Lists.DoesNotExist:
            return Response(
                {"error": "List not found"},
                status=status.HTTP_404_NOT_FOUND
            )

        if lst.user == request.user:
            return Response(
                {"error": "Cannot like your own list"},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Toggle like status
        if lst.likes.filter(id=request.user.id).exists():
            lst.likes.remove(request.user)
            liked = False
        else:
            lst.likes.add(request.user)
            liked = True

        return Response(
            {"liked": liked, "likes_count": lst.likes.count()},
            status=status.HTTP_200_OK
        )
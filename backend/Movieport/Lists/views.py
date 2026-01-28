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
                relation, _ = ContentRelations.objects.get_or_create(
                    user=request.user,
                    tmdb_id=tmdb_id
                )
                new_list.items.add(relation)

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
        tmdb_ids = request.data.get("tmdb_id")
        list_id = request.data.get("list")

        if not tmdb_ids or not list_id:
            return Response(
                {"error": "tmdb_id and list required"},
                status=status.HTTP_400_BAD_REQUEST
            )

        if not isinstance(tmdb_ids, list):
            tmdb_ids = [tmdb_ids]

        try:
            lst = Lists.objects.get(id=list_id, user=request.user)
        except Lists.DoesNotExist:
            return Response(
                {"error": "List not found or not owned by user"},
                status=status.HTTP_404_NOT_FOUND
            )

        added_items = []

        with transaction.atomic():
            for tmdb_id in tmdb_ids:
                content_item, _ = ContentRelations.objects.get_or_create(
                    user=request.user,
                    tmdb_id=tmdb_id
                )
                content_item.lists.add(lst)
                added_items.append(content_item)

        serializer = ContentRelationsSerializer(added_items, many=True)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    @action(detail=False, methods=["post"], permission_classes=[IsAuthenticated])
    def remove_items(self, request):
        """Remove items from a list."""
        tmdb_ids = request.data.get("tmdb_id")
        list_id = request.data.get("list")

        if not tmdb_ids or not list_id:
            return Response(
                {"error": "tmdb_id and list required"},
                status=status.HTTP_400_BAD_REQUEST
            )

        if not isinstance(tmdb_ids, list):
            tmdb_ids = [tmdb_ids]

        try:
            lst = Lists.objects.get(id=list_id)
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

        removed_items = []

        with transaction.atomic():
            for tmdb_id in tmdb_ids:
                try:
                    content_relation = ContentRelations.objects.get(
                        user=request.user,
                        tmdb_id=tmdb_id
                    )
                except ContentRelations.DoesNotExist:
                    continue

                lst.items.remove(content_relation)
                removed_items.append(content_relation)

        serializer = ContentRelationsSerializer(removed_items, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

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
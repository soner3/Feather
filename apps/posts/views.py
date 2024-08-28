from typing import Any
from rest_framework.generics import ListAPIView
from rest_framework.request import Request
from rest_framework.response import Response
from .models import Post
from .serializer import PostSerializer
from rest_framework import permissions


class PostsList(ListAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [permissions.AllowAny]

    def get(self, request: Request, *args: Any, **kwargs: Any) -> Response:
        return super().get(request, *args, **kwargs)

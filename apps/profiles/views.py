from typing import Any
from rest_framework import status
from rest_framework.generics import RetrieveAPIView
from rest_framework.request import Request
from rest_framework.response import Response
from .serializers import CurrentProfileSerializer
from rest_framework import permissions
from .models import Profile


class RetrieveProfile(RetrieveAPIView):
    serializer_class = CurrentProfileSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request: Request, *args: Any, **kwargs: Any) -> Response:
        return super().get(request, *args, **kwargs)

    def get_object(self) -> Profile:
        user = self.request.user
        return Profile.objects.get(user=user)

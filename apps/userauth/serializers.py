from typing import Any, Dict
from apps.users.models import User
from django.core.exceptions import ValidationError
from rest_framework_simplejwt.serializers import (
    TokenObtainPairSerializer,
)
from django.core.exceptions import ObjectDoesNotExist


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):

    def validate(self, attrs: Dict[str, Any]) -> Dict[str, str]:
        credentials = {
            "emailOrUsername": attrs.get("email"),
        }

        try:
            user = User.objects.get(email=credentials["emailOrUsername"])
        except ObjectDoesNotExist:
            try:
                user = User.objects.get(username=credentials["emailOrUsername"])
            except ObjectDoesNotExist:
                raise ValidationError("User matching query does not exist.")

        attrs["email"] = user.email

        data = super().validate(attrs)

        data["username"] = user.username

        return data

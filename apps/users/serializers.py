from djoser.serializers import UserSerializer as DjoserUserSerializer
from rest_framework import serializers
from .models import User


class CurrentUserSerializer(DjoserUserSerializer):

    class Meta:
        model = User
        fields = ["email", "username", "first_name", "last_name"]


class UserPostsSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ["username"]

from rest_framework import serializers
from .models import Profile
from apps.users.serializers import CurrentUserSerializer, UserPostsSerializer


class CurrentProfileSerializer(serializers.ModelSerializer):
    user = CurrentUserSerializer()
    country = serializers.CharField()

    class Meta:
        model = Profile
        exclude = [
            "pkid",
            "created_at",
        ]


class ProfilePostsSerializer(serializers.ModelSerializer):
    user = UserPostsSerializer()

    class Meta:
        model = Profile
        fields = [
            "user",
            "profile_picture",
        ]

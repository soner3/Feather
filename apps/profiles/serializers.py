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
    profile_picture = serializers.SerializerMethodField()

    class Meta:
        model = Profile
        fields = [
            "user",
            "profile_picture",
        ]

    def get_profile_picture(self, obj):
        if obj.profile_picture:
            return obj.profile_picture.url

        return ""

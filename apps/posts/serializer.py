from rest_framework import serializers
from apps.profiles.serializers import ProfilePostsSerializer
from .models import Post


class PostSerializer(serializers.ModelSerializer):
    profile = ProfilePostsSerializer()

    class Meta:
        model = Post
        fields = ["id", "message", "profile"]

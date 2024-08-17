from django.urls import path
from .views import PostsList


urlpatterns = [
    path("list/", PostsList.as_view(), name="post-list"),
]

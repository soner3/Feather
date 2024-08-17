from django.urls import path
from .views import RetrieveProfile

urlpatterns = [
    path("users/me/", RetrieveProfile.as_view(), name="users-me"),
]

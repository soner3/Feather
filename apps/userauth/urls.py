from django.urls import path
from .views import (
    CookieTokenObtainPairView,
    CookieTokenRefreshView,
    CookieTokenDeleteView,
)

urlpatterns = [
    path("jwt/create/", CookieTokenObtainPairView.as_view(), name="jwt-name"),
    path("jwt/refresh/", CookieTokenRefreshView.as_view(), name="jwt-refresh"),
    path("jwt/delete/", CookieTokenDeleteView.as_view(), name="jwt-delete"),
]

from django.urls import path
from .views import (
    CookieTokenObtainPairView,
    CookieTokenRefreshView,
    CookieTokenVerifyView,
    CookieTokenDeleteView,
)

urlpatterns = [
    path("jwt/create/", CookieTokenObtainPairView.as_view(), name="jwt-name"),
    path("jwt/refresh/", CookieTokenRefreshView.as_view(), name="jwt-refresh"),
    path("jwt/verify/", CookieTokenVerifyView.as_view(), name="jwt-verify"),
    path("jwt/delete/", CookieTokenDeleteView.as_view(), name="jwt-delete"),
]

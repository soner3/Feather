from django.urls import path
from .views import (
    CookieTokenObtainPairView,
    CookieTokenRefreshView,
)

urlpatterns = [
    path("jwt/create/", CookieTokenObtainPairView.as_view(), name="jwt-name"),
    path("jwt/refresh/", CookieTokenRefreshView.as_view(), name="jwt-refresh"),
    # path("jwt/verify/", CookieRefreshTokenVerifyView.as_view(), name="jwt-verify"),
]

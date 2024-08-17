from django.urls import path
from rest_framework_simplejwt.views import TokenVerifyView
from .views import CookieTokenObtainPairView, CookieTokenRefreshView

urlpatterns = [
    path("jwt/create/", CookieTokenObtainPairView.as_view(), name="jwt-name"),
    path("jwt/refresh/", CookieTokenRefreshView.as_view(), name="jwt-refresh"),
    path("jwt/verify/", TokenVerifyView.as_view(), name="jwt-verify"),
]

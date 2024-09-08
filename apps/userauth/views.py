import datetime
from rest_framework.response import Response
from rest_framework import status
from rest_framework import permissions
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from rest_framework.views import APIView
from .serializers import CustomTokenObtainPairSerializer
from rest_framework.request import Request
from rest_framework_simplejwt.exceptions import InvalidToken, TokenError
from django.conf import settings


def set_http_cookies(
    response: Response,
    key: str,
    refresh_token: str,
    http_only: bool,
    secure: bool,
    expire_days: datetime.timedelta,
):
    response.set_cookie(
        key=key,
        value=refresh_token,
        expires=datetime.datetime.now() + expire_days,
        httponly=http_only,
        secure=secure,
        samesite="Lax",
    )


class CookieTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

    def post(self, request: Request, *args, **kwargs):
        response = super().post(request, *args, *kwargs)

        refresh_token = response.data["refresh"]
        access_token = response.data["access"]
        set_http_cookies(
            response,
            settings.REFRESH_COOKIE_NAME,
            refresh_token,
            True,
            False,
            datetime.timedelta(days=1),
        )
        set_http_cookies(
            response,
            settings.ACCESS_COOKIE_NAME,
            access_token,
            True,
            False,
            datetime.timedelta(minutes=10),
        )
        response.data.pop("refresh", None)
        response.data.pop("access", None)

        return response


class CookieTokenRefreshView(TokenRefreshView):

    def post(self, request: Request, *args, **kwargs) -> Response:
        data = request.data.copy()

        try:
            data["refresh"] = request.COOKIES[settings.REFRESH_COOKIE_NAME]
        except KeyError:
            return Response(status=status.HTTP_401_UNAUTHORIZED)

        serializer = self.get_serializer(data=data)
        try:
            serializer.is_valid(raise_exception=True)
        except TokenError as e:
            raise InvalidToken(e.args[0])

        response = Response(serializer.validated_data, status=status.HTTP_200_OK)
        refresh_token = response.data["refresh"]
        access_token = response.data["access"]

        set_http_cookies(
            response,
            settings.REFRESH_COOKIE_NAME,
            refresh_token,
            True,
            False,
            datetime.timedelta(days=1),
        )
        set_http_cookies(
            response,
            settings.ACCESS_COOKIE_NAME,
            access_token,
            True,
            False,
            datetime.timedelta(minutes=10),
        )
        response.data.pop("refresh", None)
        response.data.pop("access", None)

        return response


class CookieTokenDeleteView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request: Request):

        response = Response(data=request.data, status=status.HTTP_200_OK)
        try:
            response.delete_cookie(settings.REFRESH_COOKIE_NAME)
            response.delete_cookie(settings.ACCESS_COOKIE_NAME)
        except KeyError:
            return Response(status=status.HTTP_202_ACCEPTED)

        return response

from django.conf import settings
from django.contrib import admin
from django.urls import path, include


urlpatterns = [
    path(settings.ADMIN_URL, admin.site.urls),
    path("", include("djoser.urls")),
    path("auth/", include("apps.userauth.urls")),
]

admin.site.site_header = "Feather Admin"
admin.site.site_title = "Feather Admin Portal"
admin.site.index_title = "Welcome to Feathers Admin Portal"

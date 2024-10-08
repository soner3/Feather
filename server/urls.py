from django.conf import settings
from django.contrib import admin
from django.urls import path, include
from django.conf.urls.static import static

urlpatterns = [
    path(settings.ADMIN_URL, admin.site.urls),
    path("auth/", include("apps.userauth.urls")),
    path("", include("apps.profiles.urls")),
    path("posts/", include("apps.posts.urls")),
    path("", include("djoser.urls")),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

admin.site.site_header = "Feather Admin"
admin.site.site_title = "Feather Admin Portal"
admin.site.index_title = "Welcome to Feathers Admin Portal"

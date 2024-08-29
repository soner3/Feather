import uuid
from django.db import models
from apps.users.models import User
from django_countries.fields import CountryField

# from cloudinary.models import CloudinaryField
from django.utils.translation import gettext_lazy as _


class Profile(models.Model):
    pkid: models.BigAutoField = models.BigAutoField(primary_key=True, editable=False)
    id: models.UUIDField = models.UUIDField(
        default=uuid.uuid4, unique=True, editable=False
    )

    # 1:1 Relationship to User
    user: models.OneToOneField = models.OneToOneField(
        to=User,
        on_delete=models.SET_NULL,
        related_name="profile",
        null=True,
        verbose_name=_("User"),
    )
    country = CountryField()
    city: models.CharField = models.CharField(
        max_length=255,
        help_text=_("The City the User lives in"),
        null=True,
        blank=True,
        verbose_name=_("City"),
    )
    zip_code: models.CharField = models.CharField(
        max_length=25,
        help_text=_("The zip code of the City the User lives in"),
        null=True,
        blank=True,
        verbose_name=_("ZIP Code"),
    )
    street: models.CharField = models.CharField(
        max_length=255,
        help_text=_("The street the User lives in"),
        null=True,
        blank=True,
        verbose_name=_("Street"),
    )
    house_number: models.CharField = models.CharField(
        max_length=255,
        help_text=_("The house number of the User"),
        null=True,
        blank=True,
        verbose_name=_("House Number"),
    )
    # profile_picture = CloudinaryField("image", blank=True, null=True)
    profile_picture: models.URLField = models.URLField(blank=True, null=True)
    created_at: models.DateTimeField = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]
        verbose_name = _("Profile")
        verbose_name_plural = _("Profiles")

    def __str__(self) -> str:
        return f"{self.user.username}"

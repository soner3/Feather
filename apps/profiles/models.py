import uuid
from django.db import models
from apps.users.models import User
from django_countries.fields import CountryField
from django.utils.translation import gettext_lazy as _


class Profile(models.Model):
    pkid: models.BigAutoField = models.BigAutoField(primary_key=True, editable=False)
    id: models.UUIDField = models.UUIDField(
        default=uuid.uuid4(), unique=True, editable=False
    )
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
        null=False,
        blank=False,
        verbose_name=_("City"),
    )
    zip_code: models.CharField = models.CharField(
        max_length=25,
        help_text=_("The zip code of the City the User lives in"),
        null=False,
        blank=False,
        verbose_name=_("ZIP Code"),
    )
    street: models.CharField = models.CharField(
        max_length=255,
        help_text=_("The street the User lives in"),
        null=False,
        blank=False,
        verbose_name=_("Street"),
    )
    house_number: models.CharField = models.CharField(
        max_length=255,
        help_text=_("The street the User lives in"),
        null=False,
        blank=False,
        verbose_name=_("Street"),
    )
    created_at: models.DateTimeField = models.DateTimeField(auto_now_add=True)

    def __str__(self) -> str:
        return f"{self.user.username}"

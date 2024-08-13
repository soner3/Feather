import uuid
from django.db import models
from django.contrib.auth.validators import UnicodeUsernameValidator
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext_lazy as _
from .managers import UserManager


class User(AbstractUser):

    username_validator = UnicodeUsernameValidator()

    pkid: models.BigAutoField = models.BigAutoField(primary_key=True, editable=False)
    id: models.UUIDField = models.UUIDField(
        default=uuid.uuid4, editable=False, unique=True
    )
    first_name = models.CharField(verbose_name=_("First Name"), max_length=60)
    last_name = models.CharField(verbose_name=_("Last Name"), max_length=60)
    email = models.EmailField(
        verbose_name=_("Email Address"), unique=True, db_index=True
    )
    username = models.CharField(
        verbose_name=_("Username"),
        unique=True,
        max_length=60,
        validators=[username_validator],
    )

    EMAIL_FIELD = "email"
    USERNAME_FIELD = "email"

    REQUIRED_FIELDS = [
        "username",
        "first_name",
        "last_name",
    ]

    objects = UserManager()

    class Meta:
        verbose_name = _("User")
        verbose_name_plural = _("Users")
        ordering = ["-date_joined"]

    @property
    def get_full_name(self) -> str:
        full_name = f"{self.first_name} {self.last_name}"
        return full_name.strip()

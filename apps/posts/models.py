import uuid
from django.db import models
from django.utils.translation import gettext_lazy as _
from apps.profiles.models import Profile


class Post(models.Model):
    pkid: models.BigAutoField = models.BigAutoField(primary_key=True, editable=False)
    id: models.UUIDField = models.UUIDField(
        default=uuid.uuid4, editable=False, unique=True
    )

    # 1:n Relationship to Profile
    profile: models.ForeignKey = models.ForeignKey(
        to=Profile,
        on_delete=models.CASCADE,
        related_name="posts",
        verbose_name=_("Profile"),
    )

    message: models.TextField = models.TextField(
        blank=False,
        null=False,
        verbose_name=_("Message"),
        help_text=_("The message of the post"),
    )
    created_at: models.DateTimeField = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]
        verbose_name = _("Post")
        verbose_name_plural = _("Posts")

    def __str__(self) -> str:
        return f"Post by {self.profile.user.username}"

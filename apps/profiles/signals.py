from typing import Type
import logging
from apps.users.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Profile

logger = logging.getLogger(__name__)


@receiver(post_save, sender=User)
def create_profile(sender: Type[User], instance: User, created: bool, **kwargs) -> None:
    if created:
        Profile.objects.create(user=instance)
        logger.info(f"Profile created for {instance.first_name} {instance.last_name}")
    else:
        logger.info(
            f"Profile could not be created for {instance.first_name} {instance.last_name}"
        )

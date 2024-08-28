import requests
from django.core.management.base import BaseCommand
from apps.users.models import User
from apps.profiles.models import Profile
from apps.posts.models import Post
from django.contrib.auth.hashers import make_password


class Command(BaseCommand):
    help = "Imports users and posts from an external API and updates the database."

    def handle(self, *args, **kwargs):
        res = requests.get("https://dummyjson.com/users/")
        posts_res = requests.get("https://dummyjson.com/posts/")
        data = res.json()
        posts_data = posts_res.json()

        counter = 0

        for user_data in data["users"]:

            user, created = User.objects.update_or_create(
                username=user_data["username"],
                defaults={
                    "email": user_data["email"],
                    "first_name": user_data["firstName"],
                    "last_name": user_data["lastName"],
                    "password": make_password(user_data["password"]),
                },
            )
            profile, created = Profile.objects.update_or_create(
                user=user,
                defaults={
                    "country": user_data["address"]["state"][:2],
                    "city": user_data["address"]["city"],
                    "zip_code": user_data["address"]["postalCode"],
                    "street": user_data["address"]["address"],
                    "house_number": user_data["age"],
                    "profile_picture": user_data["image"],
                },
            )
            profile.save()

            post, created = Post.objects.update_or_create(
                profile=profile,
                defaults={"message": posts_data["posts"][counter]["body"]},
            )
            post.save()
            counter += 1

        self.stdout.write(self.style.SUCCESS("Successfully imported users and posts."))

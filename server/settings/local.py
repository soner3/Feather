from .base import *
from os import getenv

SECRET_KEY = getenv(
    "SECRET_KEY", "django-insecure-gkz)c#(t)^r(n@u4gh*obb4jaelxi@5z4pyu1$x-4t^wkma7f&"
)

DEBUG = True

ALLOWED_HOSTS = [
    "localhost",
    "nginx",
]

CSRF_TRUSTED_ORIGINS = [
    "http://localhost:8080",
]

EMAIL_BACKEND = "django.core.mail.backends.smtp.EmailBackend"
EMAIL_HOST = getenv("MAIL_HOST")
EMAIL_PORT = 1025
EMAIL_USE_TLS = False
EMAIL_USE_SSL = False
DEFAULT_FROM_EMAIL = getenv("FEATHER_ADMIN_MAIL")

# EMAIL_BACKEND = "django.core.mail.backends.smtp.EmailBackend"
# EMAIL_HOST = "smtp.example.com"
# EMAIL_PORT = 465
# EMAIL_USE_TLS = True
# EMAIL_HOST_USER = "your_email@example.com"
# EMAIL_HOST_PASSWORD = "your_email_password"
# DEFAULT_FROM_EMAIL = "webmaster@localhost"

LOGGING = {
    "version": 1,
    "disable_existing_loggers": False,
    "formatters": {
        "verbose": {
            "format": "%(levelname)s %(name)-12s %(asctime)s %(module)s %(process)d %(thread)d %(message)s"
        }
    },
    "handlers": {
        "console": {
            "level": "DEBUG",
            "class": "logging.StreamHandler",
            "formatter": "verbose",
        }
    },
    "root": {"level": "INFO", "handlers": ["console"]},
}

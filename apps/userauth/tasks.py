from celery import shared_task
from django.core.mail import send_mail


@shared_task(queue="tasks")
def send_activation_mail(
    subject: str,
    message: str,
    from_email: str | None,
    to: list[str],
    html_message=str | None,
):
    send_mail(
        subject=subject,
        message=message,
        from_email=from_email,
        recipient_list=to,
        fail_silently=False,
        html_message=html_message,
    )

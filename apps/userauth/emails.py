from djoser.email import ActivationEmail
from .tasks import send_activation_mail


class AsyncActivationEmail(ActivationEmail):

    def send(self, to, *args, **kwargs):
        self.render()

        send_activation_mail.delay(
            self.subject, self.body, self.from_email, to, self.html
        )

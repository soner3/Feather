from djoser.email import (
    ActivationEmail,
    ConfirmationEmail,
    PasswordResetEmail,
    PasswordChangedConfirmationEmail,
)
from .tasks import (
    send_activation_mail,
    send_confirmation_mail,
    send_password_reset_mail,
    send_password_reset_confirmation_mail,
)


class AsyncActivationEmail(ActivationEmail):

    def send(self, to, *args, **kwargs):
        self.render()

        send_activation_mail.delay(
            self.subject, self.body, self.from_email, to, self.html
        )


class AsyncConfirmationEmail(ConfirmationEmail):

    def send(self, to, *args, **kwargs):
        self.render()

        send_confirmation_mail.delay(
            self.subject, self.body, self.from_email, to, self.html
        )


class AsyncPasswordResetEmail(PasswordResetEmail):
    def send(self, to, *args, **kwargs):
        self.render()

        send_password_reset_mail.delay(
            self.subject, self.body, self.from_email, to, self.html
        )


class AsyncPasswordChangedConfirmationEmail(PasswordChangedConfirmationEmail):
    def send(self, to, *args, **kwargs):
        self.render()

        send_password_reset_confirmation_mail.delay(
            self.subject, self.body, self.from_email, to, self.html
        )

from profiles.models import User
from django.db import models

class Invitation(models.Model):
    sender = models.ForeignKey(User, related_name="sent_invites", on_delete=models.CASCADE)
    receiver = models.ForeignKey(User, related_name="received_invites", on_delete=models.CASCADE)
    game = models.CharField(max_length=16)
    status = models.CharField(
        max_length=20, choices=[("pending", "Pending"), ("accepted", "Accepted"), ("rejected", "Rejected")]
    )
    created_at = models.DateTimeField(auto_now_add=True)
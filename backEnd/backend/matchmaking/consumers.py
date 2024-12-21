import json
from channels.generic.websocket import AsyncWebsocketConsumer
from .models import Invitation
from backend.profile.models import User
from asgiref.sync import sync_to_async

class MatchmakingConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        if self.scope["user"].is_authenticated:
            self.user = self.scope["user"]
            await self.accept()
        else:
            await self.close()

    async def disconnect(self, close_code):
        pass

    async def receive(self, text_data):
        data = json.loads(text_data)

        if data["type"] == "send_invite":
            await self.handle_send_invite(data)
        elif data["type"] == "respond_invite":
            await self.handle_respond_invite(data)

    async def handle_send_invite(self, data):
        receiver_id = data["receiver_id"]
        game_name = data["game_name"]

        # Create an invitation
        try:
            receiver = await sync_to_async(User.objects.get)(id=receiver_id)
            invitation = await sync_to_async(Invitation.objects.create)(
                sender=self.user, receiver=receiver, game=game_name, status="pending"
            )

            # Notify receiver
            await self.channel_layer.group_add(f"user_{receiver.id}", self.channel_name)
            await self.channel_layer.group_send(
                f"user_{receiver.id}",
                {
                    "type": "notify_invite",
                    "message": f"{self.user.username} invited you to play {game_name}.",
                    "invite_id": invitation.id,
                },
            )
        except Exception as e:
            await self.send(json.dumps({"type": "error", "message": str(e)}))

    async def handle_respond_invite(self, data):
        invite_id = data["invite_id"]
        response = data["response"]  # "accepted" or "rejected"

        try:
            invitation = await sync_to_async(Invitation.objects.get)(id=invite_id)
            invitation.status = response
            await sync_to_async(invitation.save)()

            # Notify sender if the response is accepted
            if response == "accepted":
                await self.channel_layer.group_add(f"user_{invitation.sender.id}", self.channel_name)
                await self.channel_layer.group_send(
                    f"user_{invitation.sender.id}",
                    {
                        "type": "match_found",
                        "message": f"{invitation.receiver.username} accepted your invite! Game starting...",
                        "game_id": invitation.game.id,
                    },
                )

                # Notify receiver
                await self.send(json.dumps({"type": "match_found", "message": "Match found! Game starting..."}))

            elif response == "rejected":
                await self.send(json.dumps({"type": "invite_rejected", "message": "Invite rejected."}))

        except Exception as e:
            await self.send(json.dumps({"type": "error", "message": str(e)}))

    async def notify_invite(self, event):
        await self.send(
            text_data=json.dumps(
                {
                    "type": "invite_received",
                    "message": event["message"],
                    "invite_id": event["invite_id"],
                }
            )
        )

    async def match_found(self, event):
        await self.send(
            text_data=json.dumps(
                {
                    "type": "match_found",
                    "message": event["message"],
                    "game_id": event["game_id"],
                }
            )
        )

import json
from channels.generic.websocket import AsyncWebsocketConsumer
from asgiref.sync import sync_to_async
from .models import Invitation
from profiles.models import User

class MatchmakingConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        if not self.scope["user"].is_authenticated:

            await self.close()
            return
        self.user = self.scope["user"]
        self.user_group = f"user_{self.user.id}"
        print("user_group: ", f"user_{self.user.id}")
        await self.accept()
        await self.channel_layer.group_add(self.user_group, self.channel_name)

    async def disconnect(self, close_code):
        if hasattr(self, 'user_group'):
            await self.channel_layer.group_discard(self.user_group, self.channel_name)

    async def receive(self, text_data):
        data = json.loads(text_data)
        print("data: ", data)
        handlers = {
            "send_invite": self.handle_send_invite,
            "respond_invite": self.handle_respond_invite
        }
        handler = handlers.get(data["type"])
        if handler:
            await handler(data)

    async def handle_send_invite(self, data):
        try:
            receiver = await sync_to_async(User.objects.get)(id=data["receiver_id"])
            invitation = await sync_to_async(Invitation.objects.create)(
                sender=self.user,
                receiver=receiver,
                game=data["game_name"],
                status="pending"
            )
            
            await self.channel_layer.group_send(
                f"user_{receiver.id}",
                {
                    "type": "notify_invite",
                    "message": f"{self.user.username} invited you to play {data['game_name']}",
                    "game_name": data["game_name"],
                    "invite_id": invitation.id,
                }
            )
        except User.DoesNotExist:
            await self.send_error("User not found")
        except Exception as e:
            await self.send_error(str(e))

    async def handle_respond_invite(self, data):
        try:

            invitation = await sync_to_async(Invitation.objects.get)(id=data["invite_id"])
            invitation.status = data["response"]
            await sync_to_async(invitation.save)()

            if data["response"] == "accepted":
                
                message = {
                    "type": "match_found",
                    "message": "Game starting...",
                    "game_name": invitation.game,
                }

                # Notify both players
                get_sender_id = sync_to_async(lambda: invitation.sender.id)
                get_receiver_id = sync_to_async(lambda: invitation.receiver.id)
                
                sender_id = await get_sender_id()
                receiver_id = await get_receiver_id()
                
                # Notify both players
                for user_id in [sender_id, receiver_id]:
                    await self.channel_layer.group_send(f"user_{user_id}", message)
                    
        except Invitation.DoesNotExist:
            await self.send_error("Invitation not found")
        except Exception as e:
            await self.send_error(str(e))

    async def notify_invite(self, event):
        await self.send(text_data=json.dumps(event))

    async def match_found(self, event):
        await self.send(text_data=json.dumps(event))

    async def send_error(self, message):
        await self.send(text_data=json.dumps({
            "type": "error",
            "message": message
        }))
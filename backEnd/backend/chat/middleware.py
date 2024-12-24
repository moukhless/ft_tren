from channels.db import database_sync_to_async
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.tokens import AccessToken

User = get_user_model()

@database_sync_to_async
def get_user(token):
    try:
        print(token)
        user_id = AccessToken(token).payload['user_id']
        print(user_id, User.objects.get(id=user_id))
        return User.objects.get(id=user_id)
    except User.DoesNotExist:
        return None

class TokenAuthMiddleware:
    def __init__(self, app):
        self.app = app
    
    async def __call__(self, scope, receive, send):
        try:
            # print(scope)
            print("--------")
            cookie_header = None
            for header in scope.get('headers', []):
                if header[0] == b'cookie':
                    cookie_header = header[1].decode()
                    break
            print(cookie_header)
            token = ""
            array = cookie_header.split(';')
            for i in array:
                if i.startswith(' accessToken'):
                    token = i.split('=')[1]
                    break
            # print(token)
            user = await get_user(token)
            if user is not None:
                scope['user'] = user
        except Exception as e:
            print("Error", e)
            await send({
                "type": "websocket.close",
            })
            return None
        return await self.app(scope, receive, send)

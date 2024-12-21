from django.urls import path
from . import consumers

ws_urlpatterns = [
    path("ws/matchmaking", consumers.MatchmakingConsumer.as_asgi()),
]

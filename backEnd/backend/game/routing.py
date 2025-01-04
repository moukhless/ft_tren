from django.urls import path
from . import consumers

websocket_urlpatterns = [
    path("ws/league/", consumers.GameConsumer.as_asgi()),
]
# Generated by Django 4.2.16 on 2024-12-30 23:45

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('game', '0003_alter_game_player1_alter_game_player2'),
    ]

    operations = [
        migrations.AlterField(
            model_name='game',
            name='player1',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='player1', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='game',
            name='player2',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='player2', to=settings.AUTH_USER_MODEL),
        ),
    ]

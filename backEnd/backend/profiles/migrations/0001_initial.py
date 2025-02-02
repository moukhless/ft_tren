# Generated by Django 4.2.16 on 2024-12-26 22:32

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import profiles.models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('first_name', models.CharField(blank=True, max_length=25)),
                ('last_name', models.CharField(blank=True, max_length=25)),
                ('username', models.CharField(max_length=20, unique=True)),
                ('email', models.EmailField(max_length=255, unique=True)),
                ('password', models.CharField(max_length=255)),
                ('avatar', models.ImageField(blank=True, default='avatars/default.jpeg', upload_to='avatars/', validators=[profiles.models.validate_image])),
                ('pyotp_secret', models.CharField(default='', max_length=255)),
                ('created_at', models.DateTimeField(auto_now_add=True, null=True)),
                ('is2fa', models.BooleanField(default=False)),
                ('wins', models.IntegerField(default=0)),
                ('losses', models.IntegerField(default=0)),
                ('level', models.IntegerField(default=0)),
                ('matches_played', models.IntegerField(default=0)),
                ('is_online', models.BooleanField(default=False)),
                ('rank', models.IntegerField(default=0)),
                ('blocked', models.ManyToManyField(blank=True, to=settings.AUTH_USER_MODEL)),
                ('friends', models.ManyToManyField(blank=True, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'db_table': 'User',
            },
        ),
        migrations.CreateModel(
            name='Matches',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('status', models.IntegerField(default=0)),
                ('userone', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, related_name='userone', to=settings.AUTH_USER_MODEL)),
                ('usertow', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, related_name='usertow', to=settings.AUTH_USER_MODEL)),
                ('winner', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, related_name='winner', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'db_table': 'Matches',
                'ordering': ['-created_at'],
                'unique_together': {('userone', 'usertow')},
            },
        ),
        migrations.CreateModel(
            name='FriendRequest',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('status', models.IntegerField(default=0)),
                ('from_user', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, related_name='from_user', to=settings.AUTH_USER_MODEL)),
                ('to_user', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, related_name='to_user', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'db_table': 'Friend_Request',
                'unique_together': {('from_user', 'to_user')},
            },
        ),
    ]

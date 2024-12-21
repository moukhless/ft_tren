"""
Django settings for backend project.

Generated by 'django-admin startproject' using Django 4.2.13.

For more information on this file, see
https://docs.djangoproject.com/en/4.2/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/4.2/ref/settings/
"""
import os
from pathlib import Path
from datetime import timedelta


# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/4.2/howto/deployment/checklist/

# General settings
SECRET_KEY = os.environ.get('SECRET_KEY','foo')
ALLOWED_HOSTS = os.environ.get('ALLOWED_HOSTS').split(',')

DEBUG = True

# Application definition
INSTALLED_APPS = [
    'daphne',
    'channels',
    'corsheaders',
    # 'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'rest_framework_simplejwt',
    'rest_framework_simplejwt.token_blacklist',
    'rest_framework.authtoken',
    'profiles',
    'chat',
    'notification',
]

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ),
    'DEFAULT_PERMISSION_CLASSES': (
        'rest_framework.permissions.IsAuthenticated',
    ),
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.LimitOffsetPagination',
    'PAGE_SIZE': 10
}

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'backend.urls'

WSGI_APPLICATION = 'backend.wsgi.application'
ASGI_APPLICATION = 'backend.asgi.application'

CORS_ALLOW_ALL_ORIGINS = True
CORS_ALLOW_CREDENTIALS = True

CORS_ALLOWED_ORIGINS = [
    "http://localhost",
    "https://127.0.0.1",
    "http://10.12.9.3:5174",
]

# Database
# https://docs.djangoproject.com/en/4.2/ref/settings/#databases

# Database

DATABASES = {
    'default': {
        'ENGINE': os.environ.get('DB_ENGIEN', 'django.db.backends.postgresql'),
        'NAME': os.environ.get('DB_NAME', 'trencendense'),
        'USER': os.environ.get('DB_USER', 'ponguser'),
        'PASSWORD': os.environ.get('DB_PASSWORD', '123456'),
        'HOST': os.environ.get('DB_HOST', 'localhost'),  # This should match the service name in Docker
        'PORT': os.environ.get('DB_PORT', '5432'),
    }
}


AUTH_USER_MODEL = 'profiles.User'


# Internationalization
# https://docs.djangoproject.com/en/4.2/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True

MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/4.2/howto/static-files/

STATIC_URL = 'static/'

STATIC_ROOT = os.path.join(BASE_DIR, 'static')  # This is where collected static files will be stored
STATIC_DIRS = [
    os.path.join(BASE_DIR,'build/static')
]

# Default primary key field type
# https://docs.djangoproject.com/en/4.2/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(
        minutes=int(os.environ.get('ACCESS_TOKEN_LIFETIME', 5))  
    ),
    'REFRESH_TOKEN_LIFETIME': timedelta(
        days=int(os.environ.get('REFRESH_TOKEN_LIFETIME', 7))
    ),
    "AUTH_HEADER_TYPES": ("Bearer",),
    'SIGNING_KEY': os.environ.get('SECRET_KEY'),
    'ROTATE_REFRESH_TOKENS': True,
    'BLACKLIST_AFTER_ROTATION':True,
}

CHANNEL_LAYERS = {
    "default": {
        "BACKEND": "channels.layers.InMemoryChannelLayer"
    }
}

CLIENT_ID=os.environ.get('CLIENT_ID')
GITHUB_CLIENT_ID=os.environ.get('GITHUB_CLIENT_ID')


CLIENT_SECRET=os.environ.get('CLIENT_SECRET')
GITHUB_CLIENT_SECRET=os.environ.get('GITHUB_CLIENT_SECRET')

INTRA_REDIRECT_URI=os.environ.get('INTRA_REDIRECT_URI')
GITHUB_REDIRECT_URI=os.environ.get('GITHUB_REDIRECT_URI')

"""octofit_tracker URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.contrib import admin
from django.urls import path, include
import os

CODESPACE_NAME = os.environ.get('CODESPACE_NAME')
BASE_URL = f'https://{CODESPACE_NAME}-8000.app.github.dev' if CODESPACE_NAME else ''

from rest_framework import routers
from . import views
from rest_framework.response import Response
from rest_framework.decorators import api_view


router = routers.DefaultRouter()
router.register(r'users', views.UserViewSet)
router.register(r'teams', views.TeamViewSet)
router.register(r'activities', views.ActivityViewSet)
router.register(r'workouts', views.WorkoutViewSet)
router.register(r'leaderboard', views.LeaderboardViewSet)

@api_view(['GET'])
def api_root(request, format=None):
    # Si estamos en Codespaces, construir URLs públicas hacia el dominio de Codespaces
    if CODESPACE_NAME:
        base = f'https://{CODESPACE_NAME}-8000.app.github.dev/api/'
        return Response({
            'users': f'{base}users/',
            'teams': f'{base}teams/',
            'activities': f'{base}activities/',
            'workouts': f'{base}workouts/',
            'leaderboard': f'{base}leaderboard/',
        })

    # En otros entornos (ej. localhost) usar build_absolute_uri
    return Response({
        'users': request.build_absolute_uri('users/'),
        'teams': request.build_absolute_uri('teams/'),
        'activities': request.build_absolute_uri('activities/'),
        'workouts': request.build_absolute_uri('workouts/'),
        'leaderboard': request.build_absolute_uri('leaderboard/'),
    })

urlpatterns = [
    path('admin/', admin.site.urls),
    # Exponer todas las rutas del router bajo /api/
    path('api/', include((router.urls, 'api'))),
    path('', api_root, name='api-root'),
]

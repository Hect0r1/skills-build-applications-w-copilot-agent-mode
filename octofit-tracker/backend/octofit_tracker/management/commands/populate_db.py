from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from djongo import models

from octofit_tracker import models as octo_models

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **options):
        # Delete existing data
        User = get_user_model()
        User.objects.all().delete()
        octo_models.Team.objects.all().delete()
        octo_models.Activity.objects.all().delete()
        octo_models.Leaderboard.objects.all().delete()
        octo_models.Workout.objects.all().delete()

        # Create teams
        marvel = octo_models.Team.objects.create(name='Marvel')
        dc = octo_models.Team.objects.create(name='DC')

        # Create users
        ironman = User.objects.create_user(username='ironman', email='ironman@marvel.com', password='password', team=marvel)
        spiderman = User.objects.create_user(username='spiderman', email='spiderman@marvel.com', password='password', team=marvel)
        batman = User.objects.create_user(username='batman', email='batman@dc.com', password='password', team=dc)
        superman = User.objects.create_user(username='superman', email='superman@dc.com', password='password', team=dc)

        # Create activities
        octo_models.Activity.objects.create(user=ironman, type='run', duration=30, distance=5)
        octo_models.Activity.objects.create(user=spiderman, type='cycle', duration=45, distance=20)
        octo_models.Activity.objects.create(user=batman, type='swim', duration=60, distance=2)
        octo_models.Activity.objects.create(user=superman, type='run', duration=50, distance=10)

        # Create workouts
        octo_models.Workout.objects.create(user=ironman, name='Chest Day', description='Bench press and pushups')
        octo_models.Workout.objects.create(user=spiderman, name='Cardio', description='Running and cycling')
        octo_models.Workout.objects.create(user=batman, name='Strength', description='Weight lifting')
        octo_models.Workout.objects.create(user=superman, name='Endurance', description='Long run')

        # Create leaderboard
        octo_models.Leaderboard.objects.create(team=marvel, points=100)
        octo_models.Leaderboard.objects.create(team=dc, points=90)

        self.stdout.write(self.style.SUCCESS('octofit_db database populated with test data.'))

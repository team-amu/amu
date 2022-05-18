from django.db import models

# Create your models here.
class Actor(models.Model):
    id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=50)
    profile_path = models.CharField(max_length=200, blank=True)

class Genre(models.Model):
    id = models.IntegerField(primary_key=True)

    name = models.CharField(max_length=50)

class Movie(models.Model):
    id = models.IntegerField(primary_key=True)

    actors = models.ManyToManyField(Actor, related_name="movies", through='CastedActors')
    genres = models.ManyToManyField(Genre, related_name="movies")

    title = models.CharField(max_length=100)
    release_date = models.DateField()
    popularity = models.FloatField()
    vote_count = models.IntegerField()
    vote_average = models.FloatField()
    overview = models.TextField()
    homepage = models.TextField(blank=True)
    runtime = models.CharField(max_length=20)
    poster_path = models.CharField(max_length=200, blank=True)
    video_key = models.CharField(max_length=50, blank=True)
    image_key = models.TextField(blank=True)
    
    def __str__(self):
        return self.title

class CastedActors(models.Model):
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE)
    actor = models.ForeignKey(Actor, on_delete=models.CASCADE)

    character = models.CharField(max_length=100, blank=True)


from django.db import models
from django.contrib.auth.models import AbstractUser
from movies.models import Movie
from django.conf import settings

# urls에 static url 추가해줘야함~(추가할 때 공식문서 보고 추가해주기) 
def user_profile_image_path(instance, filename):
        return f'profile_image_{instance.pk}/{filename}'

# class User(AbstractUser):
#     followings = models.ManyToManyField('self', symmetrical=False, related_name='followers')
#     movie_like = models.ManyToManyField(Movie, related_name='like_users', through='MovieLike')
#     movie_bookmark = models.ManyToManyField(Movie, related_name='bookmark_users', through='MovieBookmark')

#     nickname = models.CharField(max_length=20)
#     email = models.EmailField(max_length=254)

#     # urls에 static url 추가해줘야함~(추가할 때 공식문서 보고 추가해주기)    
#     profile_image = models.ImageField(upload_to='images/', blank=True) 
    
#     # 문자열 기반 필드는 null True 금지!
#     introduce = models.CharField(max_length=100, blank=True)

class User(AbstractUser):
    followings = models.ManyToManyField('self', symmetrical=False, related_name='followers')
    like_movies = models.ManyToManyField(Movie, related_name='like_users', through='MovieLike')
    bookmark_movies = models.ManyToManyField(Movie, related_name='bookmark_users', through='MovieBookmark')

    nickname = models.CharField(max_length=20)
    email = models.EmailField(max_length=254)

class Profile(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)

    nickname = models.CharField(max_length=20)
    # urls에 static url 추가해줘야함~(추가할 때 공식문서 보고 추가해주기)    
    profile_image = models.ImageField(upload_to='images/', blank=True) 
    # 문자열 기반 필드는 null True 금지!
    introduce = models.CharField(max_length=100, blank=True)

class MovieLike(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

class MovieBookmark(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

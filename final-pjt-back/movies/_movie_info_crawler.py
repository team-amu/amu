import requests
import json
# from pprint import pprint
from django.shortcuts import render
from .models import Movie, Genre, Actor

def index(request):
    API_KEY = "c4f4535466f4ba0a86a32bc275a581a8"
    BASE_URL = "https://api.themoviedb.org/3"
    
    def get_movie_detail(movie_id):
        PATH = f"/movie/{movie_id}"
        url = f'{BASE_URL}{PATH}?api_key={API_KEY}&language=ko'
        res = requests.get(url)
        return json.loads(res.text)
    
    def get_movie_video_key(movie_id):
        PATH = f"/movie/{movie_id}/videos"
        url = f'{BASE_URL}{PATH}?api_key={API_KEY}&language=ko'
        res = requests.get(url)
        return json.loads(res.text)

    def get_movie_image_key(movie_id):
        PATH = f"/movie/{movie_id}/images"
        url = f'{BASE_URL}{PATH}?api_key={API_KEY}&language=ko'
        res = requests.get(url)
        return json.loads(res.text)
    
    # main
    def get_top_rated(page_num):
        PATH = "/movie/top_rated"
        url = f'{BASE_URL}{PATH}?api_key={API_KEY}&language=ko&page={page_num}'
        res = requests.get(url)
        data = json.loads(res.text)
        
        movies = data.get('results', [])
        
        count = 1
        # 20개 영화 중 영화 1개 데이터 분석
        for movie in movies:
            movie_id = movie.get('id', -1)
            if movie_id == -1: continue
            
            # detail data 완료
            movie_detail_data = get_movie_detail(movie_id)
            if not movie_detail_data.get('release_date', ''): continue
            if not movie_detail_data.get('poster_path', ''): continue
            if not movie_detail_data.get('overview', ''): continue
            
            # movie_video_key 완료
            movie_video_key_data = get_movie_video_key(movie_id)
            if movie_video_key_data.get('results', ''):
                movie_video_key = movie_video_key_data.get('results')[0]['key']
            else:
                movie_video_key = ''
            
            if not movie_video_key: continue
            
            # image_key 완료
            movie_image_key_data = get_movie_image_key(movie_id)
            posters = movie_image_key_data.get('posters', [])
            
            movie_image_key = ''
            for poster in posters:
                movie_image_key += poster.get('file_path', '') + '$'
            
            if movie_image_key and movie_image_key[-1] == '$':
                movie_image_key = movie_image_key[:-1]

            if not movie_image_key: continue   
            
            
            genres = []
            for genre in movie_detail_data.get('genres', ''):
                genres.append(genre.get('id', ''))
            
            if not genres: continue
            
            movie = Movie()
            
            ##### movie_detail_data
            movie.pk = movie_detail_data.get('id', '')
            movie.title = movie_detail_data.get('title', '')
            movie.release_date = movie_detail_data.get('release_date', '')
            movie.popularity = movie_detail_data.get('popularity', '')
            movie.vote_count = movie_detail_data.get('vote_count', '')
            movie.vote_average = movie_detail_data.get('vote_average', '')
            movie.overview = movie_detail_data.get('overview', '')
            movie.poster_path = movie_detail_data.get('poster_path', '')
            movie.homepage = movie_detail_data.get('homepage', '')
            movie.runtime = movie_detail_data.get('runtime', '')

            ##### movie_video_key
            movie.video_key = movie_video_key
            ##### movie_image_key
            movie.image_key = movie_image_key

            movie.save()

            # 영화와 장르의 중계테이블 만들기
            for genre in genres:
                movie.genres.add(genre)

            # 영화와 배우의 중계테이블 만들기
            movieId = movie_detail_data.get('id', 0)
            PATH = f"/movie/{movieId}/credits"
            url = f'{BASE_URL}{PATH}?api_key={API_KEY}&language=ko&page={page_num}'
            res = requests.get(url)
            data = json.loads(res.text)
            casts = data.get('cast')

            cast_count = 0
            for cast in casts:
                cast_count += 1
                actor = Actor()
                actor.pk = cast.get('id')

                if not cast.get('name', ''): continue
                actor.name = cast.get('name')
                if not cast.get('profile_path', ''): continue
                actor.profile_path = cast.get('profile_path')
                if not cast.get('character', ''): continue
                actor.save()
                actor.movies.add(movie, through_defaults={'character': cast.get('character')})

                if cast_count > 5:
                    break

            print(f'#{count}')
            count += 1
                    

    # 500 페이지 받아옵니다.
    for i in range(1, 501):
        get_top_rated(i)
    return render(request, 'movies/index.html')

def index2(request):
    API_KEY = "c4f4535466f4ba0a86a32bc275a581a8"
    BASE_URL = "https://api.themoviedb.org/3"
    PATH = "/genre/movie/list"
    url = f'{BASE_URL}{PATH}?api_key={API_KEY}&language=ko'
    res = requests.get(url)
    data = json.loads(res.text)
    
    for genreObj in data.get('genres'):
        genre = Genre()
        genre.pk = genreObj.get('id')
        genre.name = genreObj.get('name')
        genre.save()
    
    return render(request, 'movies/index2.html')
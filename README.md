# [아무(Archive of Movie)] 

![image-20220527025518107](https://user-images.githubusercontent.com/86189596/170598806-7a23584d-81af-46a8-be8c-19cac5fa7950.png)

영화 추천 커뮤티니 사이트인 아무는, 영화에 대한 나의 기록을 남긴다는 뜻인 Archive of Movie와, 아무 영화나 추천해 준다는 말장난을 이용하여 만들어진 이름입니다! 커뮤니티에서 자신과 비슷한 취향의 유저, 혹은 정반대의 유저들을 만나 다양한 영화를 추천 받아 보세요!

<br>

## 가. 개발 단계

### 1) 개발 기간

📅2022.05.11 ~ 2022.05.26

<br>

### 2) 와이어 프레임

> 디자인 툴 "Figma"를 이용하여 제작([🌺링크](https://www.figma.com/file/pWza1eRvuregdvFmTDtYIi/AMU-%EC%98%81%ED%99%94-tutorial?node-id=0%3A1))

![image-20220527023739252](https://user-images.githubusercontent.com/86189596/170598797-c5505937-11bb-431f-a91f-9eeed24a5c6b.png)

<br>

### 3) ERD

> draw.io 

![ERD drawio](https://user-images.githubusercontent.com/86189596/170598865-631d2fe2-b490-4e1d-a0a9-5e77fafb1483.png)

<br>

### 4) API 설계

#### ㄱ. main project

| HTTP verb | URL 패턴                  | 설명 및 연결 urls/함수                             |
| --------- | ------------------------- | -------------------------------------------------- |
|           | `admin/`                  | admin.site.url                                     |
|           | `api/v1/community/`       | include(’community.urls’)                          |
|           | `api/v1/movies/`          | include(’movies.urls’)                             |
|           | `api/v1/accounts/`        | include(’accounts.urls’)                           |
|           | `api/v1/accounts/`        | include(’dj_rest_auth.urls’)                       |
|           | `api/v1/accounts/signup/` | include(’dj_rest_auth.registration.urls’) 회원가입 |

<br>

#### ㄴ. accounts app

| HTTP verb | URL 패턴                       | 설명                                                         |
| --------- | ------------------------------ | ------------------------------------------------------------ |
| GET       | `profile/<username>/`          | user의 프로필 페이지로 이동 (좋아요한 영화들 출력이 기본)    |
| POST      | `profile/<username>/follow/`   | user에 대한 follow 상태 변화 (로그인 상태가 아닐 시 로그인 필요 알림 띄우기 or 팔로우 버튼 없애기) |
| POST      | `profile/<username>/update/`   | 본인일 때만 profile img, nickname, introduce 프로필 생성     |
| PUT       | `profile/<username>/update/`   | 본인일 때만 profile img, nickname, introduce 상태 변화       |
| GET       | `profile/<username>/bookmark/` | 북마크한 영화들이 출력 되고 있는 user의 프로필 페이지        |
| GET       | `profile/<username>/article/`  | user가 작성한 게시물이 출력 되고 있는 user의 프로필 페이지   |
| GET       | `profile/<username>/comment/`  | user가 작성한 댓글이 출력 되고 있는 user의 프로필 페이지     |

<br>

#### ㄷ. community app

| HTTP verb | URL 패턴                                      | 설명                    |
| --------- | --------------------------------------------- | ----------------------- |
| GET       | `total/<int:page>`                            | 전체 게시판 페이지      |
| GET       | `hot/<int:page>/`                             | 인기 있는 게시물 페이지 |
| GET       | `review/<int:page>/`                          | 영화 리뷰 페이지        |
| GET       | `free/<int:page>/`                            | 자유 게시물 페이지      |
| POST      | `''`                                          | 게시물 생성             |
| GET       | `<int:article_id>/`                           | 게시물의 디테일 페이지  |
| PUT       | `<int:article_id>/`                           | 본인인 경우 게시물 수정 |
| DELETE    | `<int:article_id>/`                           | 본인인 경우 게시물 삭제 |
| POST      | `<int:article_id>/like/`                      | 게시물 좋아요           |
| POST      | `<int:article_id>/comments/`                  | 댓글 생성               |
| PUT       | `<int:article_id>/comments/<int:comment_id>/` | 본인인 경우 댓글 수정   |
| DELETE    | `<int:article_id>/comments/<int:comment_id>/` | 본인인 경우 댓글 삭제   |

<br>

#### ㄹ. movies app

| HTTP verb | URL 패턴                      | 설명                                                         |
| --------- | ----------------------------- | ------------------------------------------------------------ |
| GET       | `/`                           | HOME화면 (추천 영화)                                         |
| GET       | `hot/`                        | 최근 HOT(최근 좋아요가 많이 눌린)한 영화 리스트 데이터 전송  |
| GET       | `like/`                       | 팔로우한 사람들이 좋아하는 영화 리스트 데이터 전송           |
| GET       | `bookmark/`                   | 팔로우한 사람들이 북마크한 영화 리스트 데이터 전송           |
| GET       | `genres/`                     | DB의 장르 데이터 전송                                        |
| GET       | `search/<int:search_page>/`   | 전체 영화 검색 페이지 /                                      |
| GET       | `<int:movie_id>/`             | 단일 영화 디테일 조회 페이지                                 |
| POST      | `<int:movie_id>/like/`        | 단일 영화에 대한 like 상태 변화 (로그인 상태가 아닐 시 로그인 필요 알림 띄우기 or like 버튼 없애기) |
| POST      | `<int:movie_id>/bookmark/`    | 단일 영화 bookmark기능 상태 변화 (로그인 상태가 아닐 시 로그인 필요 알림 띄우기 or bookmark 버튼 없애기) |
| GET       | `anonymous/recommend/recent/` | 비로그인 유저가 받는 추천 영화 리스트(최신 순)               |
| GET       | `anonymous/recommend/hot`     | 비로그인 유저가 받는 추천 영화 리스트(인기 순)               |

<br>

### 5) 컴포넌트 구조

> Django

```
D:.
|   .gitignore
|   db rest sql.sql
|   manage.py
|   package-lock.json
|   requirements.txt
|   test.txt
|   
+---accounts
|   |   adapters.py
|   |   admin.py
|   |   apps.py
|   |   models.py
|   |   serializers.py
|   |   tests.py
|   |   urls.py
|   |   views.py
|   |   __init__.py
|   |   
|   \---migrations
|           0001_initial.py
|           0002_alter_profile_profile_image.py
|           __init__.py
|           
+---amu
|       asgi.py
|       settings.py
|       urls.py
|       wsgi.py
|       __init__.py
|       
+---community
|   |   admin.py
|   |   apps.py
|   |   models.py
|   |   test.py
|   |   tests.py
|   |   urls.py
|   |   views.py
|   |   __init__.py
|   |   
|   +---migrations
|   |       0001_initial.py
|   |       __init__.py
|   |       
|   \---serializers
|           article.py
|           comment.py
|           
+---movies
|   |   admin.py
|   |   apps.py
|   |   models.py
|   |   tests.py
|   |   urls.py
|   |   views.py
|   |   _movie_info_crawler.py
|   |   __init__.py
|   |   
|   +---fixtures
|   |       actor.json
|   |       castedactors.json
|   |       data.json
|   |       genre.json
|   |       movie.json
|   |       movies_app.json
|   |       
|   +---migrations
|   |       0001_initial.py
|   |       __init__.py
|   |       
|   +---serializers
|   |       actor.py
|   |       character.py
|   |       genre.py
|   |       movie.py
|   |       
|   \---templates
|       \---movies
|               index.html
|               
\---venv
    |   pyvenv.cfg
    |   
    +---Include
    +---Lib
    |   \---site-packages
    |       |   clipboard.py
    |       |   decorator.py
    |       |   distutils-precedence.pth
    |       |   mypy_extensions.py
    |       |   pickleshare.py
    |       |   pprintpp.py
    |       |   six.py
    |       |   toposort.py
    |       |   typing_extensions.py
    |       |   _cffi_backend.cp310-win_amd64.pyd
    |       |   
    |       +---allauth
    |       |   |   app_settings.py
    |       |   |   decorators.py
    |       |   |   exceptions.py
    |       |   |   models.py
    |       |   |   ratelimit.py
    |       |   |   tests.py
    |       |   |   urls.py
    |       |   |   utils.py
    |       |   |   __init__.py
    |       |   |   
    |       |   +---account
    |       |   |   |   adapter.py
    |       |   |   |   admin.py
    |       |   |   |   apps.py
    |       |   |   |   app_settings.py
    |       |   |   |   auth_backends.py
    |       |   |   |   decorators.py
    |       |   |   |   forms.py
    |       |   |   |   managers.py
    |       |   |   |   models.py
    |       |   |   |   signals.py
    |       |   |   |   tests.py
    |       |   |   |   urls.py
    |       |   |   |   utils.py
    |       |   |   |   views.py
    |       |   |   |   __init__.py
    |       |   |   |   
```

> Vue

```
|   App.vue
|   main.js
|   text.txt
|   
+---api
|       drf.js
|       
+---assets
|       logo.png
|       logo.svg
|       
+---components
|   |   AccountErrorList.vue
|   |   
|   +---community
|   |       ArticleForm.vue
|   |       ArticleHotSortSelect.vue
|   |       ArticleSortSelect.vue
|   |       ArticleTitleItem.vue
|   |       ArticleUnitSelect.vue
|   |       CommentForm.vue
|   |       CommentItem.vue
|   |       CommentSection.vue
|   |       
|   +---movies
|   |       ActorItem.vue
|   |       CardItem.vue
|   |       CardList.vue
|   |       FilterSortSection.vue
|   |       GenresSelectBox.vue
|   |       ReviewItem.vue
|   |       ReviewList.vue
|   |       SearchBarSection.vue
|   |       SearchedCardItem.vue
|   |       SearchedCardSection.vue
|   |       TypeSelectBox.vue
|   |       
|   +---pagination
|   |       ArticleFreePagination.vue
|   |       ArticleHotPagination.vue
|   |       ArticleReviewPagination.vue
|   |       ArticleTotalPagination.vue
|   |       
|   \---profile
|           ProfileArticleItem.vue
|           ProfileBookmarkedMovieItem.vue
|           ProfileCommentItem.vue
|           ProfileContentSection.vue
|           ProfileLikedMovieItem.vue
|           ProfileUserSection.vue
|           
+---plugins
|       vuetify.js
|       
+---router
|       index.js
|       
+---store
|   |   index.js
|   |   
|   \---modules
|           accounts.js
|           common.js
|           community.js
|           movies.js
|           
+---styles
|   |   _app.scss
|   |   _variables.scss
|   |   
|   \---mixins
|           _button.scss
|           _components.scss
|           _font.scss
|           _form.scss
|           _layout.scss
|           _mixins.scss
|           _pagination.scss
|           _profile.scss
|           _select.scss
|           
\---views
    |   NotFound404.vue
    |   
    +---accounts
    |       LoginView.vue
    |       LogoutView.vue
    |       SignupView.vue
    |       
    +---community
    |       ArticleCreateView.vue
    |       ArticleDetailView.vue
    |       ArticleEditView.vue
    |       CommunityFreeView.vue
    |       CommunityHotView.vue
    |       CommunityReviewView.vue
    |       CommunityTotalView.vue
    |       
    +---movies
    |       HomeView.vue
    |       MovieDetailView.vue
    |       MovieSearchView.vue
    |       
    \---profile
            ProfileArticleView.vue
            ProfileBookmarkView.vue
            ProfileCommentView.vue
            ProfileLikeView.vue
```

<br>

## 나. 프로젝트 소개

### 1) 개발 도구

![image-20220527015930633](https://user-images.githubusercontent.com/86189596/170598792-6d07b075-0cf4-4a80-8874-b7b4646c3dd4.png)

<br>

### 2) 주요 기능

#### ㄱ. 회원가입 페이지

![회원가입](https://user-images.githubusercontent.com/97648019/171079937-dabaa3a9-61ae-42c7-bcb2-0718fe9b1783.gif)

- 보기 설정을 구현해서 아이콘을 누르면 모양이 변경됨과 동시에 별이 실제 텍스트로 보입니다.
- 비밀번호와 비밀번호 확인이 서로 일치하는지 확인할 수 있습니다.

![회원가입페이지(사진x)](https://user-images.githubusercontent.com/97648019/171079936-cccf3905-64ac-4a22-94c1-f94db7ff885c.gif)

- 프로필 사진을 등록하지 않고 가입이 가능합니다.
- 이 경우 기본 이미지로 최초 설정됩니다.

<br>

#### ㄴ. 로그인 페이지

![로그인](https://user-images.githubusercontent.com/97648019/171079781-909e5237-85ca-47e6-850d-a84856464ceb.gif)

- 회원가입과 마찬가지로 비밀번호 확인이 가능합니다.
- 회원가입 페이지로 이동하는 버튼을 두어 이동이 가능합니다.

<br>

#### ㄷ. 네비게이션 바

![네비게이션바](https://user-images.githubusercontent.com/97648019/171079778-e497f2b4-670d-4223-97e1-13be924c238d.gif)

- 아무 영화 사이트의 모든 페이지로 이동할 수 있습니다.
- 비로그인 유저에게는 마이페이지 링크가 보이지 않습니다.
- 프로필 사진을 등록하지 않은 유저에게는 기본 이미지가 보입니다.

<br>

#### ㄹ. 메인 페이지

![메인페이지1](./readme_asset/메인페이지1.gif)

- 아래의 다양한 분류에 대해서 영화를 추천받습니다.
  - `AMU 인기 영화` : 서비스 사이트에서 최근 한 달간 가장 많이 좋아요/북마크가 기록된 영화
  - `최근 개봉 영화` : 가장 최근 개봉한 영화들
  - `인기 영화` : TMDB 영화 API의 popular(관객 수) 기준으로 높은 점수를 받은 영화
- 로그인 사용자는 팔로우 기능을 기반으로 한 영화들을 추가로 추천받습니다.
  - `팔로워들이 좋아하는 영화` : 팔로워들이 좋아요한 영화들을 봅니다.
  - `팔로워들이 좋아하는 영화` : 팔로워들이 좋아요한 영화들을 봅니다.

![메인페이지2](https://user-images.githubusercontent.com/97648019/171079919-60f8629f-3adf-4417-a1a8-2c557ae74013.gif)

- 위의 검색바를 통해 검색 및 영화 검색 페이지로 이동할 수 있습니다.
- 검색어를 영화 제목과 배우 이름으로 설정할 수 있습니다.
- 검색하고 있는 글자가 포함된 제목의 영화들을 아래에 띄워줍니다. 떠오른 영화를 클릭 시 그 영화의 상세페이지로 이동할 수 있습니다.

<br>

#### ㅂ. 영화 검색 페이지

![상세 검색 페이지](./readme_asset/상세 검색 페이지.gif)

- 검색된 영화들을 볼 수 있는 페이지 입니다. 배우 이름으로 검색 시, 해당 배우가 출연한 영화들을 보여줍니다.
- 최신 순, 오래된 순, 평점 높은 순, 평점 높은 순, 제목 오름차순, 제목 내림차 순으로 검색한 영화들을 정렬하고, 장르와 최소 평점으로 필터링 할 수 있습니다.

<br>

#### ㅅ. 영화 상세 페이지

![영화상세페이지](./readme_asset/영화상세페이지.gif)

- 포스터와 영화의 트레일러를 감상할 수 있습니다.
- 로그인한 유저만 좋아요와 북마크 버튼을 클릭할 수 있습니다.
- 출연진의 사진을 클릭할 시 해당 배우가 출연한 영화를 보여주는 검색페이지로 이동합니다.
- 해당 영화에 대한 리뷰들을 볼 수 있습니다. 리뷰를 클릭 시 리뷰 게시글로 이동합니다.

<br>

#### ㅇ. 커뮤니티 페이지

![커뮤니티페이지](https://user-images.githubusercontent.com/97648019/171079941-bfa6b85d-3185-4cce-a485-a3e9ae7d98c9.gif)

- 아래의 여러 카테고리들로 구분됩니다.
  - `영화게시판` : 영화와 관련된 게시글입니다. 게시글에 영화를 검색해 입력하면 게시글에서 영화 포스터를 확인할 수 있습니다.
  - `자유게시판` : 영화와 무관한 개인적인 글을 작성하는 공간입니다.
  - `전체게시판` : 영화게시판의 게시물과 자유게시판의 게시물을 모두 볼 수 있습니다.
  - `인기게시판` : 댓글 수, 좋아요 수를 기준으로 10개, 50개, 100개가 넘는 게시물만 모아볼 수 있습니다.

- 정렬 선택 기준이 있습니다. 기준은 아래와 같습니다.
  - `최신순` : 가장 최근에 등록된 게시물부터 차례로 표시됩니다.
  - `좋아요 많은 순` : 좋아요 개수가 많은 게시물부터 차례로 표시됩니다.
  - `댓글 많은 순` : 댓글 개수가 많은 게시물부터 차례로 표시됩니다.

- 페이지 당 표시되는 게시물의 개수를 설정할 수 있습니다.
  - 5개, 10개, 20개 단위에서 선택합니다.

<br>

#### ㅈ. 게시물 작성 페이지

![게시글작성페이지](https://user-images.githubusercontent.com/97648019/171079776-d028e76d-6e07-4ecb-97a7-d00ca5bc1719.gif)

- 영화 리뷰와 일반 게시물 중에서 선택해서 게시할 수 있습니다.
- 해당 영화를 검색해서 등록해야만 리뷰를 작성할 수 있습니다.
- 귀여운 별을 이용해 평점을 등록할 수 있습니다!
- 영화게시판이 아닌, 자유게시판 선택시, 영화 검색바와 별이 사라집니다.

<br>

#### ㅊ. 게시물 수정 페이지

![게시글수정페이지](https://user-images.githubusercontent.com/97648019/171079774-c2d07af9-2a4e-4835-abe6-299960f09bd0.gif)

- 본인의 게시물을 수정할 수 있습니다. 
- 작성했던 내용과 제목 뿐만 아니라, 이 전에 선택했던 영화와 평점도 함께 보면서 수정할 수 있습니다!
- 수정 페이지에서 이전으로 가면 진행하던 수정을 무를 수 있습니다!!

<br>

#### ㅋ. 게시물 상세 페이지

![게시글상세페이지](https://user-images.githubusercontent.com/97648019/171079768-8eb47c22-19c6-4062-80b7-9311890eba7e.gif)

- 게시물을 작성한 유저만 수정과 삭제 버튼을 확인하고, 조작해 수정/삭제를 할 수 있습니다.
- 해당 게시물에 유저들은 좋아요와 댓글을 달 수 있습니다. 아무 영화 사이트의 유저들과 대화를 나눠보세요!
- 리뷰 게시물일 경우 해당 영화의 포스터를 같이 볼 수 있습니다.

<br>

#### ㅌ. 프로필 페이지

![프로필페이지](./readme_asset/프로필페이지.gif)

> 좋아요한 영화

- 유저의 프로필 페이지 진입시 기본적으로 이 유저가 좋아요를 누른 영화들을 보여줍니다. 
- 유저를 팔로우 할 수 있습니다.
- 본인의 프로필 페이지인 경우, 아무 영화 사이트의 활동명과 자기소개, 프로필 사진을 수정할 수 있습니다.

<br>

> 북마크한 영화

- 프로필 페이지의 유저가 북마크한 영화들을 보여줍니다.

<br>

> 작성한 게시글

- 프로필 페이지의 유저가 작성한 게시글들을 보여줍니다.
- 가장 최근 작성한 게시글부터 상단에 배치해 나열합니다.
- 게시글 제목을 클릭하면 해당 게시물로 이동합니다.

<br>

> 작성한 댓글

- 유저가 작성한 댓글들을 보여줍니다.
- 댓글을 달은 원글의 제목을 하단에 표시하여 확인이 가능하게 하였습니다.
- 해당 댓글 영역을 클릭하면 해당 댓글이 달리 게시물로 이동합니다.

<br>

#### ㅍ. 반응형 구현

| ![프로필반응형](https://user-images.githubusercontent.com/97648019/171082289-425285f5-6aaa-4869-a6bb-380d12ce99fe.gif) | ![검색페이지반응형](https://user-images.githubusercontent.com/97648019/171082293-995f2393-9569-4953-9d18-b4349fc69785.gif) | ![영화상세페이지반응형](https://user-images.githubusercontent.com/97648019/171082297-79125298-f0fc-4245-9522-8bfefcc3b15f.gif) | ![커뮤니티페이지반응형](https://user-images.githubusercontent.com/97648019/171082301-14e12703-33cf-4182-a181-eba2987436d4.gif) |
| ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |

<br>

## 다. 협업 과정

### 1. 팀원 및 업무 분담

|           |            공통            | ![ezgif com-gif-maker (1)](https://user-images.githubusercontent.com/86189596/170598870-4611e24c-f6fa-4c12-ae6d-c6786c886e60.png)<br/>박승훈 | ![ezgif com-gif-maker](https://user-images.githubusercontent.com/86189596/170598875-a654c734-4ad7-44d2-adcf-f64444eaa4c0.png)<br/>이윤경 |
| :-------: | :------------------------: | :----------------------------------------------------------: | :----------------------------------------------------------: |
| **BACK**  | ERD 설계<br/>API 설계<br/> | 데이터 소스 구축<br/>Pagination 로직 구현<br/>게시글 정렬 및 필터 기능 구현 | 데이터 모델링<br/>추천 알고리즘 구현<br/>영화 검색 기능 구현<br/>영화 정렬, 필터 기능 구현<br/> |
| **FRONT** |     와이어 프레임 제작     | 컴포넌트 설계 및 시각화<br/>SCSS 모듈화<br/>Community 컴포넌트 <br/>Profile 컴포넌트 |              Django-Vue 연동<br/>Movie 컴포넌트              |

<br>

### 2. 개발 기록

- [🧷노션 링크](https://cyclic-traffic-ddc.notion.site/bf74a7a8e0b64b8eb48b500552949ba0)

- **공통**

  ![KakaoTalk_20220527_063030578](https://user-images.githubusercontent.com/86189596/170598841-92f678d1-75da-4b97-9849-e47095e65a79.png)

<br>

- **박승훈**

![33](https://user-images.githubusercontent.com/86189596/170598862-fbe504d0-6884-463c-97c2-15538169aec0.PNG)

<br>

- **이윤경**

![22](https://user-images.githubusercontent.com/86189596/170598856-33d668bd-6c93-4817-8e37-a5469150e3ec.PNG)

<br>

## 라. 회고

### 1. 박승훈

> 와이어프레임이 무색하게

Figma를 이용해서 와이어프레임을 작성하는 데에 꽤나 많은 시간과 노력을 쏟았는데, 막상 개발에 돌입해 디자인을 하다보니 와이어프레임을 구현하지 못하거나 더 개선한 경우가 허다했습니다. 물론 좋은 뼈대가 되어준 것은 사실이나, 너무 디테일한 시각적 계획은 무의미하니 더 실전에 빠르게 돌입하는 것이 좋겠다고 느꼈습니다.

<br>

> 화면을 그리는 즐거움. 짧은 즐거움.

처음에는 필요한 데이터를 받는 것이 중요하다고 느껴서 django serializer를 완전히 구성하고, 화면에 뿌리기 위한 준비를 모두 마쳤는데 그 기간이 꽤나 길었습니다. 그 사이에 원하는대로 잘 되지 않기도 하고 노력의 성과가 시각적으로 도드라지지 않아 지치기도 했습니다.

그런데 프론트엔드로 화면을 구성하면서 준비된 데이터를 조금씩 화면에 필요한 재료로 사용하며 그리다보니 재미도 있었고, 레이아웃 구성 실력도 삽시간에 늘 수 있었습니다. 나중에는 데이터 구성도 구성이지만, 화면에 이를 그리고 필요한 부분을 더 보충하는 방식으로 진행해봐도 좋겠습니다.

<br>

> 길고도 짧았던 2주

사전에 팀원을 미리 구성하여 당초 주어진 기간보다 더 일찍 시작해 구상부터 기획까지 마쳤는데 그 날부터 오직 프로젝트만 생각하며 잠자고 밥 먹는 시간을 제외하고 프로젝트에만 몰입했는데, 2주가 어떻게 갔는가 싶을 정도로 시간이 부족했습니다.

실제로 2주 중에 10일은 새벽 4시가 넘도록 개발을 붙잡고 있었고, 이 중 일주일은 아침 해가 뜨고 나서 잠이 들었을 정도로 몰입했습니다. 우리의 온전한 실력으로 어엿한 하나의 서비스를 만드는 즐거움과 동시에 계획했던 많은 것들을 모두 해내고 싶다는 부담이 동시에 있었습니다.

마감을 바라보는 지금, 더 구현해보고 싶은 기능들이 있지만 이렇게 마무리를 지어야 함이 아쉽습니다. 기회가 된다면 이 프로젝트, 또는 다른 프로젝트를 처음부터 구성해 실전 개발 실력을 키우고 싶습니다.

<br>

> 개발은 역시 실전

이번 프로젝트 진행 중에 데이터를 불러오고 선택적으로 구체화하기 위한 django의 serializer, Python 언어 방식의 django의 ORM, 화면을 구성하는 CSS의 superset인 SCSS까지, 지금껏 제대로 이해하지 못했던 부분들이 정말 많은 기술들을 자의 반, 타의 반으로 파나가며 공부를 해야했고, 실전압축적으로 공부하며 피부로 와닿는 실습을 하니 단기간에 많은 이해와 성장이 동반되었다고 생각합니다.

실제로 SCSS 같은 경우는 개발 블로그의 레이아웃이나 세부 디자인을 커스터마이징하기 위해 한동안 많이 써봤음에도 불구하고 본격적으로 개발 단계에서 사용해보는 것이 처음인만큼 많이 해매거나 비효율적으로 사용하기도 했습니다. 하지만 불과 3일도 채 되지 않아 mixin, nesting, calc, 변수, 함수 등의 기능들을 조금이나마 익숙히 사용할 수 있었습니다.

<br>

> 프론트엔드 재밌다!

레이아웃 구성에서 **반응형 구현**을 잘 하지 못했는데, 구현을 위해 flex를 부딪히면서 구조화하는 연습을 하다보니 이제는 웬만한 구조는 모두 어떻게 짜야할지 구조화가 가능해졌습니다. 위에서 언급한 SCSS의 mixin을 이용해 자주 사용하는 반복 구문들은 컴포넌트화하여 include해 사용하는 데에도 익숙해졌습니다.

한 페이지씩 화면을 구성하며 점차 원하는대로 뚝딱뚝딱 페이지를 만들어내는 제 스스로의 성장을 보며 뿌듯하고, 극한의 상황에서 사람이 어떻게 난관을 파헤쳐나가는지 느낄 수 있었습니다.

<br>

> 고통은 나누면 반

이번 프로젝트는 사실상 정말 고역이었습니다. 기간은 짧았고, 하고 싶은 것은 많았습니다. 그래서 반 동기, 스터디원들과 함께 계속 개발에 몰두했는데, 오랜 밤샘 작업과 반복이 계속되며 지쳐가는 와중에도 함께 힘든 순간을 공유하고 위로할 수 있다는 것이 얼마나 큰 의지이자 도움이 되는지 느낄 수 있었습니다.

또한 스스로 안주하지 않고 더 나아갈 수 있는 원동력이 되었습니다. 막히거나 어려운 부분을 공유하며 서로 해결을 위해 도우며 앞장서고, 좋은 기술을 소개해주며 시너지를 얻었습니다. 한편 서로가 서로의 결과물에 감탄하고 영감과 자극을 받기도 하였습니다. 열정적인 동료들과 함께여서 이 2주간의 고행을 마칠 수 있었습니다.

<br>

### 2. 이윤경

> 두려움 반 재미 반!

처음에는 내가 아는게 없는데 개발이 가능한걸까? 무서웠고, 같은 팀원에게 폐가 되는게 아닐까 두려움이 있었지만, 점점 눈에 보이는 결과물을 만들어내면서 매일 자발적으로 밤을 지새우게 되었습니다. 2주간의 강행군에 많이 지치기도 했지만, 처음 포스트맨으로 원하는 값들을 끄집어 낸 순간 느낀 환희는 잊혀지지 않습니다. 모르는 것들이 많아도 공부해가면서 하나하나 기능들을 완성할 때마다 너무 기뻤고, 이러한 성취감 덕에 끝까지 개발을 이어나갈 수 있었던 것 같습니다.

<br>

> 다시 처음으로

개발을 진행해가면서 많이 배우고, 성장하지만, 또 그것은 이전의 나는 지금의 나보다 조금 형편없었다는 뜻이기도 합니다.. 이전에 왜 이런 방식으로 코드를 구현했는지 이해가 안가기 시작하고, 전에 만든 기능을 활용해야 하는데, 이 코드로는 원하는 방향으로 구현할 수 없다는 것을 중간에 깨달았습니다. 때문에 도중에 Vuex를 사용하지 않고, props와 emit으로 구현했던 검색기능을 수정해야했는데, 코드 수정 중, 오타 하나를 못찾아서 3시간을 날렸다는 것을 알았을 땐 딱 지구 한바퀴만 돌고 오고 싶기도 했습니다. 이부분에서 시간을 많이 빼앗긴 것 같아 아직도 아쉬운 마음이 많이 듭니다. 

<br>

> 뒤돌아보면서

하고 싶은 것들은 많았고, 이를 위해 많은 밤을 페어와 함께 지새웠지만, 아무리 시간을 늘려봐도, 부족한 실력을 메꾸기에는 짧았던 것 같습니다. 프로젝트를 진행하면서 현재 나에게 필요한 부분이 어느 곳인지 깨달았고(특히 CSS...), 다음에는 더 만족스러운 결과를 내기 위해 앞으로 더욱 공부해나갈 것 입니다! 프로젝트는 끝이 났지만, 무언가를 배울 때마다, AMU의 업데이트를 계속 진행해볼 것 같습니다.

마지막으로, 스스로에게 아쉬운 부분도 많았지만, 거의 매일 3시간씩 잠을 자며 힘냈던 자신에게 수고했다고는 말해주고 싶습니다! 부족했던 저와 함께 프로젝트를 진행해 준 페어에게 감사하고, 질문할 때마다 친절하게 달려와서 알려주던 스터디 팀원들에게도 사랑을 가득 담은 하트를 보냅니다!! 정말 대단해서 따라가고 싶은 동료들이 있다는 건 정말 행운인 것 같습니다. 끝나서 이렇게 마지막 문구를 적고 있다니.. 이 감정을 말로 어떻게 표현해야할 지 모르겠습니다.. 앞으로도 화이팅 !!! 🙌

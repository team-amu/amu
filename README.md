# [아무(Archive of Movie)] 

![image-20220527025518107](C:\Users\alsl3\AppData\Roaming\Typora\typora-user-images\image-20220527025518107.png)

영화 추천 커뮤티니 사이트인 아무는, 영화에 대한 나의 기록을 남긴다는 뜻인 Archive of Movie와, 아무 영화나 추천해 준다는 말장난을 이용하여 만들어진 이름입니다! 커뮤니티에서 자신과 비슷한 취향의 유저, 혹은 정반대의 유저들을 만나 다양한 영화를 추천 받아 보세요!

## 0. 개발 단계

#### 개발 기간

📅2022.05.11 ~ 2022.05.26

#### 와이어 프레임

![image-20220527023739252](C:\Users\alsl3\AppData\Roaming\Typora\typora-user-images\image-20220527023739252.png)

[🌺피그마 링크](https://www.figma.com/file/pWza1eRvuregdvFmTDtYIi/AMU-%EC%98%81%ED%99%94-tutorial?node-id=0%3A1)

#### ERD

![ERD.drawio](D:\ssafy\01_Track\PJT\AMu\ERD.drawio.png)

#### API 설계

- ##### main project

| HTTP verb | URL 패턴                  | 설명 및 연결 urls/함수                             |
| --------- | ------------------------- | -------------------------------------------------- |
|           | `admin/`                  | admin.site.url                                     |
|           | `api/v1/community/`       | include(’community.urls’)                          |
|           | `api/v1/movies/`          | include(’movies.urls’)                             |
|           | `api/v1/accounts/`        | include(’accounts.urls’)                           |
|           | `api/v1/accounts/`        | include(’dj_rest_auth.urls’)                       |
|           | `api/v1/accounts/signup/` | include(’dj_rest_auth.registration.urls’) 회원가입 |

- ##### accounts app

| HTTP verb | URL 패턴                       | 설명                                                         |
| --------- | ------------------------------ | ------------------------------------------------------------ |
| GET       | `profile/<username>/`          | user의 프로필 페이지로 이동 (좋아요한 영화들 출력이 기본)    |
| POST      | `profile/<username>/follow/`   | user에 대한 follow 상태 변화 (로그인 상태가 아닐 시 로그인 필요 알림 띄우기 or 팔로우 버튼 없애기) |
| POST      | `profile/<username>/update/`   | 본인일 때만 profile img, nickname, introduce 프로필 생성     |
| PUT       | `profile/<username>/update/`   | 본인일 때만 profile img, nickname, introduce 상태 변화       |
| GET       | `profile/<username>/bookmark/` | 북마크한 영화들이 출력 되고 있는 user의 프로필 페이지        |
| GET       | `profile/<username>/article/`  | user가 작성한 게시물이 출력 되고 있는 user의 프로필 페이지   |
| GET       | `profile/<username>/comment/`  | user가 작성한 댓글이 출력 되고 있는 user의 프로필 페이지     |

- ##### community app

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

- ##### movies app

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

#### 컴포넌트 구조

ㅁㅁㅁㅁㅁㅁ

## 1. 프로젝트 소개

### 개발 도구

![image-20220527015930633](C:\Users\alsl3\AppData\Roaming\Typora\typora-user-images\image-20220527015930633.png)

### 주요 기능

#### 회원가입 페이지

---

- 

#### 로그인 페이지

---

- 

- 

#### 네비게이션 바

---

- 아무 영화 사이트의 모든 페이지로 이동할 수 있습니다.
- 비로그인 유저에게는 마이페이지 링크가 보이지 않습니다.

- 프로필 사진을 등록하지 않은 유저에게는 기본 이미지가 보입니다.



#### 메인페이지

---

##### 로그인 시 / 비 로그인 시

- 현재 AMU 커뮤니티내에서 한달간 가장 많이 좋아요와 북마크를 받은 영화를 추천합니다.
- 로그인 유저에게는 팔로우한 친구들이 좋아하거나 북마크에 담은 영화들을 추천합니다.
- 비로그인 유저에게는 최근 개봉한 영화와 인기도가 높은 영화들을추천합니다.
- 위의 검색바를 통해 검색 및 영화 검색 페이지로 이동할 수 있습니다.
- 검색어를 영화 제목과 배우 이름으로 설정할 수 있습니다.
- 검색하고 있는 글자가 포함된 제목의 영화들을 아래에 띄워줍니다. 떠오른 영화를 클릭 시 그 영화의 상세페이지로 이동할 수 있습니다.



#### 영화 검색 페이지

---

- 검색된 영화들을 볼 수 있는 페이지 입니다. 배우 이름으로 검색 시, 해당 배우가 출연한 영화들을 보여줍니다.
- 최신 순, 오래된 순, 평점 높은 순, 평점 높은 순, 제목 오름차순, 제목 내림차 순으로 검색한 영화들을 정렬하고, 장르와 최소 평점으로 필터링 할 수 있습니다.



#### 영화 상세 페이지

---

- 포스터와 영화의 트레일러를 감상할 수 있습니다.
- 로그인한 유저만 좋아요와 북마크 버튼을 클릭할 수 있습니다.
- 출연진의 사진을 클릭할 시 해당 배우가 출연한 영화를 보여주는 검색페이지로 넘어갑니다.
- 해당 영화에 대한 리뷰들을 볼 수 있습니다. 클릭 시 리뷰 게시글로 이동합니다.



#### 커뮤니티 페이지

---

##### 전체게시판

- 커뮤니티의 모든 게시글을 볼 수 있는 페이지 입니다. 
- 최신순, 좋아요 많은 순, 댓글 많은 순으로 정렬하여 볼 수 있습니다.
- 5개, 10개, 20개 보기로 게시글의 페이지네이션을 재설정할 수 있습니다.
- 작성 시간.....분 시 날짜... 정확히 기억이 안남...

##### HOT 게시판

- 커뮤니티의 한달 간 핫한 게시글들을 보여줍니다.
- 좋아요와 댓글 수로 게시글을 필터링 할 수 있습니다.

##### 영화 리뷰 게시판

- 영화 리뷰 게시글들을 보여줍니다.
- 리뷰하고 있는 영화의 제목에서 명시해주었습니다.

##### 자유 게시판

- 영화에 대한 이야기가 아닌 자유 게시물들을 보여주는 페이지 입니다.

##### 게시물 작성 페이지

- 리뷰와 일반 게시물 중에서 선택해서 게시할 수 있습니다.
- 해당 영화를 검색해서 등록해야만 리뷰를 작성할 수 있습니다.
- 귀여운 별을 이용해 평점을 등록할 수 있습니다!
- 영화게시판이 아닌, 자유게시판 선택시, 영화 검색바와 별이 사라집니다.

**게시물 상세 페이지**

- 게시물을 작성한 유저만 수정과 삭제 버튼을 보고, 클릭할 수 있습니다.

- 해당 게시물에 유저들은 좋아요와 댓글을 달 수 있습니다. 아무 영화 사이트의 유저들과 대화를 나눠보세요!
- 리뷰 게시물일 경우 해당 영화의 포스터를 같이 볼 수 있습니다.

##### 게시물 수정 페이지

- 본인의 게시물을 수정할 수 있습니다. 
- 작성했던 내용과 제목 뿐만 아니라, 이 전에 선택했던 영화와 평점도 함께 보면서 수정할 수 있습니다!
- 수정 페이지에서 이전으로 가면 진행하던 수정을 무를 수 있습니다!!



#### 프로필 페이지

---

##### 좋아요

- 유저의 프로필 페이지 진입시 기본적으로 이 유저가 좋아요를 누른 영화들을 보여줍니다. 
- 유저를 팔로우 할 수 있습니다.
- 본인의 프로필 페이지인 경우, 아무 영화 사이트의 활동명과 자기소개, 프로필 사진을 수정할 수 있습니다.

##### 북마크 

- 프로필 페이지의 유저가 북마크한 영화들을 보여줍니다.

##### 게시글 

- 프로필 페이지의 유저가 작성한 게시글들을 보여줍니다.
- 작성한 시각.... 잘 기억이 안남..

##### 댓글

- 
- 

## 2. 협업 과정

### 팀원 및 업무 분담

|           |              공통               | ![ezgif.com-gif-maker (1)](D:\ssafy\01_Track\PJT\AMu\ezgif.com-gif-maker (1).png)<br/>박승훈 | ![ezgif.com-gif-maker](D:\ssafy\01_Track\PJT\AMu\ezgif.com-gif-maker.png)<br/>이윤경 |
| :-------: | :-----------------------------: | :----------------------------------------------------------: | :----------------------------------------------------------: |
| **BACK**  | 데이터 모델링<br/>API 설계<br/> | 데이터 소스 구축<br/>Pagination 로직 구현<br/>게시글 정렬 및 필터 기능 구현 | Django-Vue 연동<br/>추천 알고리즘 구현<br/>영화 검색 기능 구현 |
| **FRONT** |       와이어 프레임 제작        | 컴포넌트 설계 및 시각화<br/>SCSS 모듈화<br/>Community 컴포넌트 |             Profile 컴포넌트<br/>Movie 컴포넌트              |

### 개발 기록

- **공통**

![image-20220527044525931](C:\Users\alsl3\AppData\Roaming\Typora\typora-user-images\image-20220527044525931.png)

- **박승훈**



- **이윤경**

![image-20220527044540358](C:\Users\alsl3\AppData\Roaming\Typora\typora-user-images\image-20220527044540358.png)

[🧷노션 링크](https://cyclic-traffic-ddc.notion.site/bf74a7a8e0b64b8eb48b500552949ba0)

## 3.  회고

#### 박승훈

- **아쉬웠던 점**
  - 

- **느낀점**
  - 



#### **이윤경**

- **아쉬웠던 점**
  - 
- 느낀점
  - 
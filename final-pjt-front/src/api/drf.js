const HOST = "http://localhost:8000/api/v1/";

const ACCOUNTS = "accounts/";
const COMMUNITY = "community/";
const COMMENTS = "comments/";
const MOVIES = "movies/";

export default {
	accounts: {
		login: () => HOST + ACCOUNTS + "login/",
		logout: () => HOST + ACCOUNTS + "logout/",
		signup: () => HOST + ACCOUNTS + "signup/",
		// 유저 프로필 생성
		createProfile: (username) =>
			HOST + ACCOUNTS + "profile/" + `${username}/` + "update/",
		// // Token 으로 현재 user 판단
		currentUserInfo: () => HOST + ACCOUNTS + "user/", // login, logout 등등 처럼 제공되는 주소임!
		// 프로필 출력
		profileLike: (username) => HOST + ACCOUNTS + "profile/" + `${username}/`,
		profileBookmark: (username) =>
			HOST + ACCOUNTS + "profile/" + `${username}/` + "bookmark/",
		profileAritcle: (username) =>
			HOST + ACCOUNTS + "profile/" + `${username}/` + "article/",
		profileComment: (username) =>
			HOST + ACCOUNTS + "profile/" + `${username}/` + "comment/",
		// 프로필 정보 업데이트
		profileUpdate: (username) =>
			HOST + ACCOUNTS + "profile/" + `${username}/` + "update/",
		// follow
		follow: (username) =>
			HOST + ACCOUNTS + "profile/" + `${username}/` + "follow/",
	},
	community: {
		// article 조작 또는 이벤트 관련
		articleCreate: () => HOST + COMMUNITY,
		articleDetail: (articlePk) => HOST + COMMUNITY + `${articlePk}/`,
		articleUpdate: (articlePk) => HOST + COMMUNITY + `${articlePk}/`,
		articleDelete: (articlePk) => HOST + COMMUNITY + `${articlePk}/`,
		articleLike: (articlePk) => HOST + COMMUNITY + `${articlePk}/` + "like/",

		// article page 확인
		communityTotal: (page) => HOST + COMMUNITY + "total/" + `${page}/`,
		communityHot: (page) => HOST + COMMUNITY + "hot/" + `${page}/`,
		communityReview: (page) => HOST + COMMUNITY + "review/" + `${page}/`,
		communityFree: (page) => HOST + COMMUNITY + "free/" + `${page}/`,

		// comment 관련
		commentCreate: (articlePk) => HOST + COMMUNITY + `${articlePk}/` + COMMENTS,
		commentUpdate: (articlePk, commentPk) =>
			HOST + COMMUNITY + `${articlePk}/` + COMMENTS + `${commentPk}/`,
		commentDelete: (articlePk, commentPk) =>
			HOST + COMMUNITY + `${articlePk}/` + COMMENTS + `${commentPk}/`,
	},
	movies: {
		home: () => HOST + MOVIES,
		// 추천 알고리즘 영화들
		hotMovie: () => HOST + MOVIES + "hot/",
		likeMovie: () => HOST + MOVIES + "like/",
		bookmarkMovie: () => HOST + MOVIES + "bookmark/",
		//
		detail: (moviePk) => HOST + MOVIES + `${moviePk}/`,
		actors: (moviePk) => HOST + MOVIES + `${moviePk}/` + 'actors/',
		like: (moviePk) => HOST + MOVIES + `${moviePk}/` + "like/",
		bookmark: (moviePk) => HOST + MOVIES + `${moviePk}/` + "bookmark/",
		search: (searchPage) => HOST + MOVIES + `${searchPage}/`,
		sort: (searchPage) => HOST + MOVIES + `${searchPage}/`,
		filter: (searchPage) => HOST + MOVIES + `${searchPage}/`,
	},
};

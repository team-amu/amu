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
		// // Token 으로 현재 user 판단
		currentUserInfo: () => HOST + ACCOUNTS + "user/", // login, logout 등등 처럼 제공되는 주소임!
		// // username으로 프로필 제공
		// profile: username => HOST + ACCOUNTS + 'profile/' + username,
	},
	community: {
		// article 조작 또는 이벤트 관련
		articleCreate: () => HOST + COMMUNITY,
		articleDetail: (articlePk) => HOST + COMMUNITY + `${articlePk}/`,
		articleUpdate: (articlePk) => HOST + COMMUNITY + `${articlePk}/`,
		articleDelete: (articlePk) => HOST + COMMUNITY + `${articlePk}/`,
		articleLike: (articlePk) => HOST + COMMUNITY + `${articlePk}/` + "like/",

		// article page 확인
		articleTotal: (page) => HOST + COMMUNITY + "total/" + `${page}/`,
		articleHot: (page) => HOST + COMMUNITY + "hot/" + `${page}/`,
		articleReview: (page) => HOST + COMMUNITY + "review/" + `${page}/`,
		articleFree: (page) => HOST + COMMUNITY + "free/" + `${page}/`,

		// comment 관련
		commentCreate: (articlePk) => HOST + COMMUNITY + `${articlePk}/` + COMMENTS,
		commentUpdate: (articlePk, commentPk) =>
			HOST + COMMUNITY + `${articlePk}/` + COMMENTS + `${commentPk}/`,
		commentDelete: (articlePk, commentPk) =>
			HOST + COMMUNITY + `${articlePk}/` + COMMENTS + `${commentPk}/`,
	},
	movies: {
		home: () => HOST + MOVIES,
		detail: (moviePk) => HOST + MOVIES + `${moviePk}/`,
		like: (moviePk) => HOST + MOVIES + `${moviePk}/` + "like/",
		bookmark: (moviePk) => HOST + MOVIES + `${moviePk}/` + "bookmark/",
		search: (searchPage) => HOST + MOVIES + `${searchPage}/`,
		sort: (searchPage) => HOST + MOVIES + `${searchPage}/`,
		filter: (searchPage) => HOST + MOVIES + `${searchPage}/`,
	},
};

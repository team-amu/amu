import Vue from "vue";
import VueRouter from "vue-router";

// accounts 부분
import LoginView from "@/views/accounts/LoginView.vue";
import LogoutView from "@/views/accounts/LogoutView.vue";
import SignupView from "@/views/accounts/SignupView.vue";

// profile 부분
import ProfileLikeView from "@/views/profile/ProfileLikeView.vue";
import ProfileBookmarkView from "@/views/profile/ProfileBookmarkView.vue";
import ProfileArticleView from "@/views/profile/ProfileArticleView.vue";
import ProfileCommentView from "@/views/profile/ProfileCommentView.vue";

// movies 부분
import HomeView from "@/views/movies/HomeView.vue";
// import SearchView from "@/views/movies/SearchView.vue";
import MovieDetailView from "@/views/movies/MovieDetailView.vue";

// community 부분
import CommunityTotalView from "@/views/community/CommunityTotalView.vue";
import CommunityHotView from "@/views/community/CommunityHotView.vue";
import CommunityFreeView from "@/views/community/CommunityFreeView.vue";
import CommunityReviewView from "@/views/community/CommunityReviewView.vue";
import ArticleCreateView from "@/views/community/ArticleCreateView.vue";
import ArticleDetailView from "@/views/community/ArticleDetailView.vue";

// default 부분
import NotFound404 from "@/views/community/NotFound404.vue";

Vue.use(VueRouter);

const routes = [
	// accounts 부분
	{
		path: "/accounts/login",
		name: "login",
		component: LoginView,
	},
	{
		path: "/accounts/logout",
		name: "logout",
		component: LogoutView,
	},
	{
		path: "/accounts/signup",
		name: "signup",
		component: SignupView,
	},

	// profile 부분
	{
		path: "/profile/:username",
		name: "profileLike",
		component: ProfileLikeView,
	},
	{
		path: "/profile/:username/bookmark",
		name: "profileBookmark",
		component: ProfileBookmarkView,
	},
	{
		path: "/profile/:username/article",
		name: "profileArticle",
		component: ProfileArticleView,
	},
	{
		path: "/profile/:username/comment",
		name: "profileComment",
		component: ProfileCommentView,
	},

	// movies 부분
	{
		path: "/movies",
		name: "home",
		component: HomeView,
	},
	{
		path: "/movies/:moviePk",
		name: "movieDetail",
		component: MovieDetailView,
	},
	{
		path: "/movies/search/:searchPage",
		name: "movieDetail",
		component: MovieDetailView,
	},

	// community 부분
	{
		path: "/community",
		name: "articleCreate",
		component: ArticleCreateView,
	},
	{
		path: "/community/:articlePk",
		name: "articleDetail",
		component: ArticleDetailView,
	},
	{
		path: "/community/total/:page",
		name: "communityTotal",
		component: CommunityTotalView,
	},
	{
		path: "/community/hot/:page",
		name: "communityHot",
		component: CommunityHotView,
	},
	{
		path: "/community/review/:page",
		name: "communityReview",
		component: CommunityReviewView,
	},
	{
		path: "/community/free/:page",
		name: "communityFree",
		component: CommunityFreeView,
	},

	// default 부분
	{
		// 404 페이지
		path: "/404",
		name: "NotFound",
		component: NotFountView,
	},

	{
		// 이상한 url인 경우 404 페이지로 redirect
		path: "*",
		redirect: "/404",
	},
];

const router = new VueRouter({
	mode: "history",
	base: process.env.BASE_URL,
	routes,
});

// // Navigation Guard 설정
// router.beforeEach((to, from, next) => {
// 	// '/' => '/articles/1'
// 	// 이전에 있던 '/' 가 from, '/articles/1'이 to(목적지)

// 	// 로그인 여부 확인
// 	const { isLoggedIn } = store.getters;

// 	// Auth가 필요한 route의 name
// 	const authPages = ["articleCreate"];

// 	// 0. router에서 이동 감지

// 	// 1. 현재 이동하고자 하는 페이지가 로그인이 필요한지 확인
// 	const isAuthRequired = authPages.includes(to.name);

// 	// 2. 로그인이 필요한 페이지인데 로그인이 되어있지 않다면 로그인 페이지(/login)로 이동
// 	if (isAuthRequired && !isLoggedIn) {
// 		next({ name: "login" });
// 	} else {
// 		// 3. 로그인이 되어 있다면 원래 이동할 곳으로 이동
// 		next();
// 	}

// 	// 4. 로그인이 되어있는데 /login, /signup 페이지로 이동한다면 메인 페이지(/)로 이동
// });

export default router;

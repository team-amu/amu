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
// import CommunityTotalView from "@/views/community/CommunityTotalView.vue";
// import CommunityHotView from "@/views/community/CommunityHotView.vue";
// import CommunityFreeView from "@/views/community/CommunityFreeView.vue";
// import CommunityReviewView from "@/views/community/CommunityReviewView.vue";
import ArticleCreateView from "@/views/community/ArticleCreateView.vue";
// import ArticleDetailView from "@/views/community/ArticleDetailView.vue";

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
];

const router = new VueRouter({
	mode: "history",
	base: process.env.BASE_URL,
	routes,
});

export default router;

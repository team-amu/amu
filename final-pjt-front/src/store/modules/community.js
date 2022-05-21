// import router from "@/router";
import axios from "axios";
import drf from "@/api/drf";
// import _ from "lodash";

export default {
	state: {
		communityArticleUnit: localStorage.getItem("communityArticleUnit") || 5,
		reviewPageNum: localStorage.getItem("reviewPageNum") || 1,
		freePageNum: localStorage.getItem("freePageNum") || 1,
		reviews: [],
		frees: [],
		articleInfo: {},
	},

	getters: {
		communityArticleUnit: (state) => state.communityArticleUnit,
		reviewPageNum: (state) => state.reviewPageNum,
		freePageNum: (state) => state.freePageNum,
		reviews: (state) => state.reviews,
		frees: (state) => state.frees,
		articleInfo: (state) => state.articleInfo,
	},

	mutations: {
		SET_REVIEWS: (state, reviews) => (state.reviews = reviews),
		SET_FREES: (state, frees) => (state.frees = frees),
		SET_REVIEW_PAGE_NUM: (state, page) => (state.reviewPageNum = page),
		SET_FREE_PAGE_NUM: (state, page) => (state.freePageNum = page),
		SET_COMMUNITY_ARTICLE_UNIT: (state, unit) =>
			(state.communityArticleUnit = unit),
		SET_ARTICLE_INFO: (state, article) => (state.articleInfo = article),
	},

	actions: {
		// Article Unit 저장
		setCommunityArticleUnit({ commit }, unit) {
			commit("SET_COMMUNITY_ARTICLE_UNIT", unit);
			localStorage.setItem("communityArticleUnit", unit);
		},
		// Article Page 저장
		setReviewPageNum({ commit }, page) {
			commit("SET_REVIEW_PAGE_NUM", page);
			localStorage.setItem("reviewPageNum", page);
		},
		setFreePageNum({ commit }, page) {
			commit("SET_FREE_PAGE_NUM", page);
			localStorage.setItem("freePageNum", page);
		},
		// Review를 페이지와 단위 정보 보내서 가져와서 state에 저장
		setReviews({ commit, getters }, page) {
			const params = {
				unit: Number(getters.communityArticleUnit),
			};
			axios({
				url: drf.community.communityReview(page),
				method: "get",
				params: params,
			})
				.then((res) => {
					commit("SET_REVIEWS", res.data);
				})
				.catch((err) => {
					console.error(err.data);
				});
		},
		setFrees({ commit, getters }, page) {
			const params = {
				unit: Number(getters.communityArticleUnit),
			};
			axios({
				url: drf.community.communityFree(page),
				method: "get",
				params: params,
			})
				.then((res) => {
					commit("SET_FREES", res.data);
				})
				.catch((err) => {
					console.error(err.data);
				});
		},
		setArticleInfo({ commit }, articlePk) {
			axios({
				url: drf.community.articleDetail(articlePk),
				method: "get",
			})
				.then((res) => {
					commit("SET_ARTICLE_INFO", res.data);
				})
				.catch((err) => {
					console.error(err.data);
				});
		},
	},
};

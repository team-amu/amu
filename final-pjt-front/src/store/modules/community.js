// import router from "@/router";
import axios from "axios";
import drf from "@/api/drf";
// import _ from "lodash";

export default {
	state: {
		communityArticleUnit: localStorage.getItem("communityArticleUnit") || 5,
		reviews: {},
	},

	getters: {
		communityArticleUnit: (state) => state.communityArticleUnit,
		reviews: (state) => state.reviews,
	},

	mutations: {
		SET_REVIEWS: (state, reviews) => (state.reviews = reviews),
		SET_COMMUNITY_ARTICLE_UNIT: (state, unit) =>
			(state.communityArticleUnit = unit),
	},

	actions: {
		setCommunityArticleUnit({ commit }, unit) {
			commit("SET_COMMUNITY_ARTICLE_UNIT", unit);
			localStorage.setItem("communityArticleUnit", unit);
		},
		// Review를 페이지와 단위 정보 보내서 가져와서 state에 저장
		setReviewArticles({ commit, getters }, page) {
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
	},
};

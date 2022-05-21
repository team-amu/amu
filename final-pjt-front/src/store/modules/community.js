import router from "@/router";
import axios from "axios";
import drf from "@/api/drf";
import _ from "lodash";

export default {
	state: {
		communityArticleUnit: localStorage.getItem("communityArticleUnit") || 5,
		communityArticleSort: localStorage.getItem("communityArticleSort") || "-pk",
		totalPageNum: localStorage.getItem("totalPageNum") || 1,
		reviewPageNum: localStorage.getItem("reviewPageNum") || 1,
		freePageNum: localStorage.getItem("freePageNum") || 1,
		reviews: [],
		frees: [],
		totals: [],
		articleInfo: {},
	},

	getters: {
		communityArticleUnit: (state) => state.communityArticleUnit,
		communityArticleSort: (state) => state.communityArticleSort,
		totalPageNum: (state) => state.totalPageNum,
		reviewPageNum: (state) => state.reviewPageNum,
		freePageNum: (state) => state.freePageNum,
		totals: (state) => state.totals,
		reviews: (state) => state.reviews,
		frees: (state) => state.frees,
		articleInfo: (state) => state.articleInfo,
		isAuthor: (state, getters) => {
			return state.articleInfo.user?.pk === getters.currentUser.pk;
		},
		isArticle: (state) => !_.isEmpty(state.articleInfo),
	},

	mutations: {
		SET_TOTALS: (state, totals) => (state.totals = totals),
		SET_REVIEWS: (state, reviews) => (state.reviews = reviews),
		SET_FREES: (state, frees) => (state.frees = frees),
		SET_TOTAL_PAGE_NUM: (state, page) => (state.totalPageNum = page),
		SET_REVIEW_PAGE_NUM: (state, page) => (state.reviewPageNum = page),
		SET_FREE_PAGE_NUM: (state, page) => (state.freePageNum = page),
		SET_COMMUNITY_ARTICLE_UNIT: (state, unit) =>
			(state.communityArticleUnit = unit),
		SET_COMMUNITY_ARTICLE_SORT: (state, sort) =>
			(state.communityArticleSort = sort),
		SET_ARTICLE_INFO: (state, article) => (state.articleInfo = article),
		SET_ARTICLE_COMMENTS: (state, comments) =>
			(state.articleInfo.comments = comments),
	},

	actions: {
		// 게시물 단위 저장
		setCommunityArticleUnit({ commit }, unit) {
			commit("SET_COMMUNITY_ARTICLE_UNIT", unit);
			localStorage.setItem("communityArticleUnit", unit);
		},

		// 게시물 정렬 기준 저장
		setCommunityArticleSort({ commit }, sort) {
			commit("SET_COMMUNITY_ARTICLE_SORT", sort);
			localStorage.setItem("communityArticleSort", sort);
		},

		// 전체게시판 게시물 페이지 저장
		setTotalPageNum({ commit }, page) {
			commit("SET_TOTAL_PAGE_NUM", page);
			localStorage.setItem("totalPageNum", page);
		},

		// 영화게시판 게시물 페이지 저장
		setReviewPageNum({ commit }, page) {
			commit("SET_REVIEW_PAGE_NUM", page);
			localStorage.setItem("reviewPageNum", page);
		},

		// 자유게시판 게시물 페이지 저장
		setFreePageNum({ commit }, page) {
			commit("SET_FREE_PAGE_NUM", page);
			localStorage.setItem("freePageNum", page);
		},

		// 영화게시판 게시물 단위별로 totals에 저장
		setTotals({ commit, getters }, page) {
			const params = {
				unit: Number(getters.communityArticleUnit),
				sort: getters.communityArticleSort,
			};
			axios({
				url: drf.community.communityTotal(page),
				method: "get",
				params: params,
			})
				.then((res) => {
					commit("SET_TOTALS", res.data);
				})
				.catch((err) => {
					console.error(err.data);
				});
		},

		// 영화게시판 게시물 단위별로 reviews에 저장
		setReviews({ commit, getters }, page) {
			const params = {
				unit: Number(getters.communityArticleUnit),
				sort: getters.communityArticleSort,
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

		// 자유게시판 게시물 단위별로 frees에 저장
		setFrees({ commit, getters }, page) {
			const params = {
				unit: Number(getters.communityArticleUnit),
				sort: getters.communityArticleSort,
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

		// 게시물 상세정보 state에 저장
		setArticleInfo({ commit, getters }, articlePk) {
			axios({
				url: drf.community.articleDetail(articlePk),
				method: "get",
				headers: getters.authHeader,
			})
				.then((res) => {
					commit("SET_ARTICLE_INFO", res.data);
				})
				.catch((err) => {
					console.error(err.data);
				});
		},

		// 게시물 생성
		createArticle({ commit, getters }, formData) {
			console.log(formData);
			axios({
				method: "post",
				url: drf.community.articleCreate(),
				headers: getters.authHeader,
				data: formData,
			}).then((res) => {
				commit("SET_ARTICLE_INFO", res.data);
				alert("작성이 완료되었습니다!");
				router
					.push({
						name: "articleDetail",
						params: { articlePk: getters.articleInfo.pk },
					})
					.catch((err) => {
						console.error(err);
					});
			});
		},

		// 게시물 수정
		updateArticle({ commit, getters }, formData) {
			axios({
				method: "put",
				url: drf.community.articleUpdate(formData.pk),
				data: formData,
				headers: getters.authHeader,
			}).then((res) => {
				commit("SET_ARTICLE_INFO", res.data);
				alert("수정이 완료되었습니다!");
				router.push({
					name: "articleDetail",
					params: { articlePk: formData.pk },
				});
			});
		},

		// 게시물 삭제
		deleteArticle({ commit, getters }, articlePk) {
			if (confirm("정말 삭제하시겠습니까?")) {
				axios({
					url: drf.community.articleDelete(articlePk),
					method: "delete",
					headers: getters.authHeader,
				})
					.then(() => {
						commit("SET_ARTICLE_INFO", {});
						alert("삭제가 완료되었습니다!");
						router.push({
							name: "communityTotal",
							params: { page: "1" },
						});
					})
					.catch((err) => {
						console.err(err.response);
					});
			}
		},

		// 댓글 생성
		createComment({ commit, getters }, { content, articlePk }) {
			axios({
				url: drf.community.commentCreate(articlePk),
				method: "post",
				data: { content },
				headers: getters.authHeader,
			})
				.then((res) => {
					commit("SET_ARTICLE_COMMENTS", res.data);
				})
				.catch((err) => console.error(err.response));
		},

		// 댓글 수정
		updateComment({ commit, getters }, { content, articlePk, commentPk }) {
			axios({
				url: drf.community.commentUpdate(articlePk, commentPk),
				method: "put",
				data: { content },
				headers: getters.authHeader,
			})
				.then((res) => {
					commit("SET_ARTICLE_COMMENTS", res.data);
				})
				.catch((err) => console.err(err.response));
		},

		// 댓글 삭제
		deleteComment({ commit, getters }, { articlePk, commentPk }) {
			if (confirm("정말 삭제하시겠습니까?")) {
				axios({
					url: drf.community.commentDelete(articlePk, commentPk),
					method: "delete",
					data: {},
					headers: getters.authHeader,
				})
					.then((res) => {
						commit("SET_ARTICLE_COMMENTS", res.data);
					})
					.catch((err) => console.error(err.response));
			}
		},
	},
};

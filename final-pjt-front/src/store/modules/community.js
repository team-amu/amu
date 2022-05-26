import router from "@/router";
import axios from "axios";
import drf from "@/api/drf";
import _ from "lodash";

export default {
	state: {
		totals: [],
		hots: [],
		reviews: [],
		frees: [],

		totalPageNum: localStorage.getItem("totalPageNum") || 1,
		hotPageNum: localStorage.getItem("hotPageNum") || 1,
		reviewPageNum: localStorage.getItem("reviewPageNum") || 1,
		freePageNum: localStorage.getItem("freePageNum") || 1,

		totalsWholeCount: localStorage.getItem("totalsWholeCount") || 0,
		hotsWholeCount: localStorage.getItem("hotsWholeCount") || 0,
		reviewsWholeCount: localStorage.getItem("reviewsWholeCount") || 0,
		freesWholeCount: localStorage.getItem("freesWholeCount") || 0,

		communityArticleUnit: localStorage.getItem("communityArticleUnit") || 5,
		communityArticleSort: localStorage.getItem("communityArticleSort") || "-pk",
		communityArticleHotSort:
			localStorage.getItem("communityArticleHotSort") || "likes.10",

		articleInfo: {},
	},

	getters: {
		totals: (state) => state.totals,
		hots: (state) => state.hots,
		reviews: (state) => state.reviews,
		frees: (state) => state.frees,

		totalPageNum: (state) => state.totalPageNum,
		hotPageNum: (state) => state.hotPageNum,
		reviewPageNum: (state) => state.reviewPageNum,
		freePageNum: (state) => state.freePageNum,

		communityArticleUnit: (state) => state.communityArticleUnit,
		communityArticleSort: (state) => state.communityArticleSort,
		communityArticleHotSort: (state) => state.communityArticleHotSort,

		totalsWholePageNum: (state) =>
			Math.ceil(state.totalsWholeCount / state.communityArticleUnit),
		hotsWholePageNum: (state) =>
			Math.ceil(state.hotsWholeCount / state.communityArticleUnit),
		reviewsWholePageNum: (state) =>
			Math.ceil(state.reviewsWholeCount / state.communityArticleUnit),
		freesWholePageNum: (state) =>
			Math.ceil(state.freesWholeCount / state.communityArticleUnit),

		articleInfo: (state) => state.articleInfo,
		isAuthor: (state, getters) => {
			return state.articleInfo.user?.pk === getters.currentUser.pk;
		},
		isArticle: (state) => !_.isEmpty(state.articleInfo),
	},

	mutations: {
		SET_TOTALS: (state, totals) => (state.totals = totals),
		SET_HOTS: (state, hots) => (state.hots = hots),
		SET_REVIEWS: (state, reviews) => (state.reviews = reviews),
		SET_FREES: (state, frees) => (state.frees = frees),

		SET_TOTAL_PAGE_NUM: (state, page) => (state.totalPageNum = page),
		SET_HOT_PAGE_NUM: (state, page) => (state.hotPageNum = page),
		SET_REVIEW_PAGE_NUM: (state, page) => (state.reviewPageNum = page),
		SET_FREE_PAGE_NUM: (state, page) => (state.freePageNum = page),

		SET_TOTALS_WHOLE_COUNT: (state, count) => (state.totalsWholeCount = count),
		SET_HOTS_WHOLE_COUNT: (state, count) => (state.hotsWholeCount = count),
		SET_REVIEWS_WHOLE_COUNT: (state, count) =>
			(state.reviewsWholeCount = count),
		SET_FREES_WHOLE_COUNT: (state, count) => (state.freesWholeCount = count),

		SET_COMMUNITY_ARTICLE_UNIT: (state, unit) =>
			(state.communityArticleUnit = unit),
		SET_COMMUNITY_ARTICLE_SORT: (state, sort) =>
			(state.communityArticleSort = sort),
		SET_COMMUNITY_ARTICLE_HOT_SORT: (state, hotSort) =>
			(state.communityArticleHotSort = hotSort),

		SET_ARTICLE_INFO: (state, article) => (state.articleInfo = article),
		SET_ARTICLE_COMMENTS: (state, comments) =>
			(state.articleInfo.comments = comments),
	},

	actions: {
		// 전체게시판 게시물 단위별로 totals에 저장
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
					commit("SET_TOTALS", res.data.articles);
					commit("SET_TOTALS_WHOLE_COUNT", res.data.articlesWholeCount);
				})
				.catch((err) => {
					console.error(err.data);
					if (err.response.status === 404) {
						router.push({ name: "NotFound" });
					}
				});
		},

		// 인기게시판 게시물 단위별로 hots 저장
		setHots({ commit, getters }, page) {
			const params = {
				unit: Number(getters.communityArticleUnit),
				sort: getters.communityArticleSort,
				hotSort: getters.communityArticleHotSort,
			};
			axios({
				url: drf.community.communityHot(page),
				method: "get",
				params: params,
			})
				.then((res) => {
					commit("SET_HOTS", res.data.articles);
					commit("SET_HOTS_WHOLE_COUNT", res.data.articlesWholeCount);
				})
				.catch((err) => {
					console.error(err.data);
					// if (err.response.status === 404) {
					// 	router.push({ name: "NotFound" });
					// }
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
					commit("SET_REVIEWS", res.data.articles);
					commit("SET_REVIEWS_WHOLE_COUNT", res.data.articlesWholeCount);
				})
				.catch((err) => {
					console.error(err.data);
					if (err.response.status === 404) {
						router.push({ name: "NotFound" });
					}
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
					commit("SET_FREES", res.data.articles);
					commit("SET_FREES_WHOLE_COUNT", res.data.articlesWholeCount);
				})
				.catch((err) => {
					console.error(err.data);
					if (err.response.status === 404) {
						router.push({ name: "NotFound" });
					}
				});
		},

		// 전체게시판 게시물 페이지 저장
		setTotalPageNum({ commit }, page) {
			commit("SET_TOTAL_PAGE_NUM", Number(page));
			localStorage.setItem("totalPageNum", Number(page));
		},

		// 인기게시판 게시물 페이지 저장
		setHotPageNum({ commit }, page) {
			commit("SET_HOT_PAGE_NUM", Number(page));
			localStorage.setItem("hotPageNum", Number(page));
		},

		// 영화게시판 게시물 페이지 저장
		setReviewPageNum({ commit }, page) {
			commit("SET_REVIEW_PAGE_NUM", Number(page));
			localStorage.setItem("reviewPageNum", Number(page));
		},

		// 자유게시판 게시물 페이지 저장
		setFreePageNum({ commit }, page) {
			commit("SET_FREE_PAGE_NUM", Number(page));
			localStorage.setItem("freePageNum", Number(page));
		},

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

		// 인기 게시물 정렬 기준 저장
		setCommunityArticleHotSort({ commit }, hotSort) {
			commit("SET_COMMUNITY_ARTICLE_HOT_SORT", hotSort);
			localStorage.setItem("communityArticleHotSort", hotSort);
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
					if (err.response.status === 404) {
						router.push({ name: "NotFound" });
					}
				});
		},

		// 게시물 생성
		createArticle({ commit, getters }, formData) {
			if (formData.category === "free") {
				formData.movie = null;
				formData.rank = null;
			}
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
						if (err.response.status === 404) {
							router.push({ name: "NotFound" });
						}
					});
			});
		},

		// 게시물 수정
		updateArticle({ commit, getters }, formData) {
			if (formData.category === "free") {
				formData.movie = null;
				formData.rank = null;
			}
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
							name: "communityArticle",
							params: { page: "1" },
						});
					})
					.catch((err) => {
						console.err(err.response);
						if (err.response.status === 404) {
							router.push({ name: "NotFound" });
						}
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
				.catch((err) => {
					console.err(err.response);
					if (err.response.status === 404) {
						router.push({ name: "NotFound" });
					}
				});
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
				.catch((err) => {
					console.err(err.response);
					if (err.response.status === 404) {
						router.push({ name: "NotFound" });
					}
				});
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
					.catch((err) => {
						console.err(err.response);
						if (err.response.status === 404) {
							router.push({ name: "NotFound" });
						}
					});
			}
		},

		cutDate({ commit }, data) {
			commit;
			const [date, time] = data.split("T");
			const [Y, M, D] = date.split("-");
			const [h, m, etc] = time.split(":");
			const [s, ms] = etc.split(".");
			return { Y, M, D, h, m, s, ms };
		},
	},
};

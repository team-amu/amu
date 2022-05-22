import router from "@/router";
import axios from "axios";
import drf from "@/api/drf";

// import _ from "lodash";

export default {
	state: {
		hotMovie: {},
		likeMovie: {},
		bookmarkMovie: {},
		movieDetail: {},
	},

	getters: {
		hotMovie: (state) => state.hotMovie,
		likeMovie: (state) => state.likeMovie,
		bookmarkMovie: (state) => state.bookmarkMovie,
		// isHotMovie: (state) => !_.isEmpty(state.hotMovie),
		// isLikeMovie: (state) => !_.isEmpty(state.likeMovie),
		// isBookmarkMovie: (state) => !_.isEmpty(state.bookmarkMovie),
		movieDetail: (state) => state.movieDetail,
	},

	mutations: {
		SET_HOT_MOVIE: (state, movie) => (state.hotMovie = movie),
		SET_LIKE_MOVIE: (state, movie) => (state.likeMovie = movie),
		SET_BOOKMARK_MOVIE: (state, movie) => (state.bookmarkMovie = movie),
		SET_MOVIE_DETAIL: (state, movieDetail) => (state.movieDetail = movieDetail),
	},

	actions: {
		fetchHotMovie({ commit }) {
			axios({
				url: drf.movies.hotMovie(),
				method: "get",
				// data: {}
			})
				.then((res) => {
					commit("SET_HOT_MOVIE", res.data);
				})
				.catch((err) => {
					console.log(err.response.data);
				});
		},

		fetchLikeMovie({ commit, getters }) {
			axios({
				url: drf.movies.likeMovie(),
				method: "get",
				// data: {}
				headers: getters.authHeader,
			})
				.then((res) => {
					commit("SET_LIKE_MOVIE", res.data);
				})
				.catch((err) => {
					console.log(err.response.data);
				});
		},

		fetchBookmarkMovie({ commit, getters }) {
			axios({
				url: drf.movies.bookmarkMovie(),
				method: "get",
				// data: {}
				headers: getters.authHeader,
			})
				.then((res) => {
					commit("SET_BOOKMARK_MOVIE", res.data);
				})
				.catch((err) => {
					console.log(err.response.data);
				});
		},

		fetchMovieDetail({ commit }, moviePk) {
			axios({
				url: drf.movies.detail(moviePk),
				method: "get",
				// data: {}
			})
				.then((res) => {
					commit("SET_MOVIE_DETAIL", res.data);
				})
				.catch((err) => {
					console.log(err.response.data);
					if (err.response.status === 404) {
						router.push({ name: "NotFound" });
					}
				});
		},
	},
};

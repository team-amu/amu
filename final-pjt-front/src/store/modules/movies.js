import router from "@/router";
import axios from "axios";
import drf from "@/api/drf";

import _ from "lodash";

export default {
	state: {
		hotMovie: [],
		likeMovie: [],
		bookmarkMovie: [],
		movieDetail: {},
		// 검색기능
		keywordMovies: [],
		searchedMovies: [],
		genres: [],
		selectedGenres: [],
		searchKeywords: '',
		type: 'title',
		minRank: '0',
		sortKeyword: '-release_date'
		//
	},

	getters: {
		isKeywordsMovie: (state) => !_.isEmpty(state.keywordMovies),
		hotMovie: (state) => state.hotMovie,
		likeMovie: (state) => state.likeMovie,
		bookmarkMovie: (state) => state.bookmarkMovie,
		movieDetail: (state) => state.movieDetail,
		// 검색기능
		keywordMovies: (state) => state.keywordMovies,
		searchedMovies: (state) => state.searchedMovies,
		genres: (state) => state.genres,
		isGenres: (state) => state.genres.length > 0,
		selectedGenres: (state) => state.selectedGenres,
		searchKeywords: (state) => state.searchKeywords,
		type: (state) => state.type,
		minRank: (state) => state.minRank,
		sortKeyword: (state) => state.sortKeyword,
		//
	},

	mutations: {
		SET_HOT_MOVIE: (state, movie) => (state.hotMovie = movie),
		SET_LIKE_MOVIE: (state, movie) => (state.likeMovie = movie),
		SET_BOOKMARK_MOVIE: (state, movie) => (state.bookmarkMovie = movie),
		SET_MOVIE_DETAIL: (state, movieDetail) => (state.movieDetail = movieDetail),
		// 검색기능
		SET_KEYWORD_MOVIE: (state, keywordMovies) => (state.keywordMovies = keywordMovies),
		SET_SEARCHED_MOVIES: (state, searchedMovies) => {state.searchedMovies = searchedMovies},
		SET_GENRES: (state, genres) => {state.genres = genres},
		SET_SELECTED_GENRES: (state, genreId) => {
			if ( state.selectedGenres.every((id) =>{
				return id !== genreId
			})) {
				state.selectedGenres.push(genreId)
			} else {
				state.selectedGenres = state.selectedGenres.filter((id) => {
					return id !== genreId
				})
			}
		},
		SET_SEARCH_KEYWORDS: (state, searchKeywords) => {state.searchKeywords = searchKeywords},
		SET_TYPE: (state, type) => {state.type = type},
		SET_MIN_RANK: (state, minRank) => {state.minRank = minRank},
		SET_SORT_KEYWORD: (state, sortKeyword) => {state.sortKeyword = sortKeyword}
		//
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
					console.error(err.response.data);
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
					console.error(err.response.data);
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
					console.error(err.response.data);
				});
		},

		fetchMovieDetail({ commit, getters }, moviePk) {
			axios({
				url: drf.movies.detail(moviePk),
				method: "get",
				headers: getters.authHeader,
				// data: {}
			})
				.then((res) => {
					commit("SET_MOVIE_DETAIL", res.data);
				})
				.catch((err) => {
					console.error(err.response.data);
					if (err.response.status === 404) {
						router.push({ name: "NotFound" });
					}
				});
		},

		movieLike({ commit, getters }, moviePk) {
			axios({
				url: drf.movies.like(moviePk),
				method: "post",
				headers: getters.authHeader,
				// data: {}
			})
				.then((res) => {
					commit("SET_MOVIE_DETAIL", res.data);
				})
				.catch((err) => {
					console.error(err.response.data);
				});
		},

		movieBookmark({ commit, getters }, moviePk) {
			axios({
				url: drf.movies.bookmark(moviePk),
				method: "post",
				headers: getters.authHeader,
				// data: {}
			})
				.then((res) => {
					commit("SET_MOVIE_DETAIL", res.data);
				})
				.catch((err) => {
					console.error(err.response.data);
				});
		},
		
		fetchKeywordMovie({commit}, {searchKeywords, type}) {
			console.log(searchKeywords)
			axios({
        url: drf.movies.keywordSearch(),
        methods: "get",
        params: {
          searchKeywords,
          type
        }
      })
        .then((res) => {
					commit("SET_KEYWORD_MOVIE", res.data)
        })
        .catch((err) => {
          console.error(err.response.data)
        })
		},

		fetchSearchMovie({commit}, { searchPage, searchKeywords, type, 
			selectedGenres, minRank, sort}) {
			axios({
				url: drf.movies.search(searchPage),
        methods: "get",
        params: {
          searchKeywords,
          type,
					selectedGenres,
					minRank, 
					sort,
				}
      })
        .then((res) => {
          commit("SET_SEARCHED_MOVIES", res.data)
        })
        .catch((err) => {
          console.error(err.response.data)
        })
		},

		fetchGenres({ commit }) {
			axios({
				url: drf.movies.genres(),
				methods: "get",
			})
				.then((res) => {
					commit("SET_GENRES", res.data)
				})
				.catch((err) => {
					console.error(err.response.data)
				})
		},

		changeSelectedGenres({ commit }, genreId) {
			commit("SET_SELECTED_GENRES", genreId)
		},

  },
}


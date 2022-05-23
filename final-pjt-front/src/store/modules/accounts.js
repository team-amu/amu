import router from "@/router";
import axios from "axios";
import drf from "@/api/drf";

import _ from "lodash";

export default {
	state: {
		// 직접 접근 금지! getters 이용하기!
		token: localStorage.getItem("token") || "", // 새로고침해도 로컬스토리지에 토큰 있으면 저장할 수 있도록!
		currentUser: {},
		profile: {},
		currentUserProfile: {},
		authError: null,
		profileError: null,

		profileLikedMoviePageNum:
			localStorage.getItem("profileLikedMoviePageNum") || 1,

		profileLikedMovieWholeCount:
			localStorage.getItem("profileLikedMovieWholeCount") || 1,
	},

	getters: {
		// state의 정보는 모두 getters를 이용해서 꺼낸다!!
		isLoggedIn: (state) => !!state.token,
		currentUser: (state) => state.currentUser,
		isCurrentUser: (state) => !_.isEmpty(state.currentUser),
		profile: (state) => state.profile,
		isProfile: (state) => !_.isEmpty(state.profile), // 객체는 {}도 True기 때문에 lodash의 힘을 빌린다!
		authError: (state) => state.authError,
		authHeader: (state) => ({ Authorization: `Token ${state.token}` }),
		profileError: (state) => state.profileError,
		currentUserProfile: (state) => state.currentUserProfile,

		profileLikedMoviePageNum: (state) => state.profileLikedMoviePageNum,

		profileLikedMovieWholePageNum: (state) =>
			Math.ceil(state.profileLikedMovieWholeCount / 12),
	},

	mutations: {
		SET_TOKEN: (state, token) => (state.token = token),
		SET_CURRENT_USER: (state, user) => (state.currentUser = user),
		SET_PROFILE: (state, profile) => (state.profile = profile),
		SET_AUTH_ERROR: (state, error) => (state.authError = error),
		SET_PROFILE_ERROR: (state, error) => (state.profileError = error),

		SET_PROFILE_LIKED_MOVIE_PAGE_NUM: (state, page) =>
			(state.profileLikedMoviePageNum = page),

		SET_PROFILE_LIKED_MOVIE_WHOLE_COUNT: (state, count) =>
			(state.profileLikedMovieWholeCount = count),
	},

	actions: {
		saveToken({ commit }, token) {
			/* 
      state.token 추가 
      localStorage에 token 추가
      */
			commit("SET_TOKEN", token);
			localStorage.setItem("token", token);
		},

		removeToken({ commit }) {
			/* 
      state.token 삭제
      localStorage에 token 추가
      */
			commit("SET_TOKEN", "");
			localStorage.setItem("token", "");
		},

		signup({ commit, getters, dispatch }, payload) {
			/* 
        POST: 사용자 입력정보를 signup URL로 보내기
        성공하면
          응답 토큰 저장
          현재 사용자 정보 받기
          메인 페이지(ArticleListView)로 이동
        실패하면
          에러 메시지 표시
      */

			axios({
				url: drf.accounts.signup(),
				method: "post",
				data: payload.credentials,
			})
				.then((res) => {
					const token = res.data.key;
					dispatch("saveToken", token); // 로컬 스토리지에 토큰 저장
					dispatch("fetchCurrentUser"); // 로컬 스토리지에 유저 정보 저장

					// 프로필 생성!
					axios({
						url: drf.accounts.createProfile(payload.credentials.username),
						method: "post",
						data: payload.profile,
						headers: getters.authHeader,
					})
						.then((res) => {
							commit("SET_PROFILE", res.data);
						})
						.catch((err) => {
							console.error(err.response.data);
							commit("SET_PROFILE_ERROR", err.response.data);
						});

					router.push({ name: "home" });
				})
				.catch((err) => {
					console.error(err.response.data);
					commit("SET_AUTH_ERROR", err.response.data);
				});
		},

		login({ commit, dispatch }, credentials) {
			/* 
      POST: 사용자 입력정보를 login URL로 보내기
        성공하면
          응답 토큰 저장
          현재 사용자 정보 받기
          메인 페이지(ArticleListView)로 이동
        실패하면
          에러 메시지 표시
      */
			axios({
				url: drf.accounts.login(),
				method: "post",
				data: credentials,
			})
				.then((res) => {
					const token = res.data.key;
					dispatch("saveToken", token);
					dispatch("fetchCurrentUser");
					router.push({ name: "home" });
				})
				.catch((err) => {
					console.error(err.response.data);
					commit("SET_AUTH_ERROR", err.response.data);
				});
		},

		logout({ commit, getters, dispatch }) {
			/* 
      POST: token을 logout URL로 보내기
        성공하면
          토큰 삭제
          사용자 알람
          LoginView로 이동
        실패하면
          에러 메시지 표시
      */
			axios({
				url: drf.accounts.logout(),
				method: "post",
				// data: {}, // post요청은 무조건 data가 넘어갈 것이라고 가정되어있어. 그치만 주석처리 해줘도 상관 없음!
				headers: getters.authHeader,
			})
				.then((res) => {
					dispatch("removeToken");
					commit("SET_CURRENT_USER", res.data);
					alert("성공적으로 logout!");
					router.push({ name: "login" }); // login 으로 보내지 말고 추후 수정 필요 220519
				})
				.error((err) => {
					console.error(err.response);
				});
		},

		fetchCurrentUser({ commit, getters, dispatch }) {
			/*
      GET: 사용자가 로그인 했다면(토큰이 있다면)
        currentUserInfo URL로 요청보내기
          성공하면
            state.cuurentUser에 저장
          실패하면(토큰이 잘못되었다면)
            기존 토큰 삭제
            LoginView로 이동
      */
			if (getters.isLoggedIn) {
				axios({
					url: drf.accounts.currentUserInfo(),
					method: "get",
					headers: getters.authHeader,
				})
					.then((res) => commit("SET_CURRENT_USER", res.data))
					.catch((err) => {
						if (err.response.status === 401) {
							dispatch("removeToken");
							router.push({ name: "login" });
						}
					});
			}
		},

		fetchProfileLike({ commit }, { username, page }) {
			console.log("205", username, page);
			axios({
				url: drf.accounts.profileLike(username, page),
				method: "get",
			})
				.then((res) => {
					console.log("accounts.js 202 ", res.data);
					// page로 나눠서 저장
					const profile = res.data.profile;
					const [start, end] = [(page - 1) * 12, page * 12];
					profile.user.like_movies = profile.user.like_movies.slice(start, end);
					console.log(profile);
					commit("SET_PROFILE", profile);
					commit(
						"SET_PROFILE_LIKED_MOVIE_WHOLE_COUNT",
						res.data.profileLikedMovieWholeCount
					);
					// localStorage.setItem(
					// 	"profile_liked_movie_whole_count",
					// 	res.data.profile_liked_movie_whole_count
					// );
				})
				.catch((err) => {
					console.error(err.response.data);
					if (err.response.status === 404) {
						router.push({ name: "NotFound" });
					}
				});
		},

		fetchProfileBookmark({ commit }, username) {
			/*
      GET: profile URL로 요청보내기
        성공하면
          state.profile에 저장
      */
			axios({
				url: drf.accounts.profileBookmark(username),
				method: "get",
			})
				.then((res) => {
					commit("SET_PROFILE", res.data);
				})
				.catch((err) => {
					console.error(err.response.data);
					if (err.response.status === 404) {
						router.push({ name: "NotFound" });
					}
				});
		},

		fetchProfileArticle({ commit }, username) {
			/*
      GET: profile URL로 요청보내기
        성공하면
          state.profile에 저장
      */
			axios({
				url: drf.accounts.profileAritcle(username),
				method: "get",
			})
				.then((res) => {
					commit("SET_PROFILE", res.data);
				})
				.catch((err) => {
					console.error(err.response.data);
					if (err.response.status === 404) {
						router.push({ name: "NotFound" });
					}
				});
		},

		fetchProfileComment({ commit }, username) {
			/*
      GET: profile URL로 요청보내기
        성공하면
          state.profile에 저장
      */
			axios({
				url: drf.accounts.profileComment(username),
				method: "get",
			})
				.then((res) => {
					commit("SET_PROFILE", res.data);
				})
				.catch((err) => {
					console.error(err.response.data);
					if (err.response.status === 404) {
						router.push({ name: "NotFound" });
					}
				});
		},

		follow({ commit, getters }, username) {
			axios({
				url: drf.accounts.follow(username),
				method: "post",
				headers: getters.authHeader,
			})
				.then((res) => {
					commit("SET_PROFILE", res.data);
				})
				.catch((err) => {
					console.error(err.response.data);
				});
		},

		profileUpdate(
			{ commit, getters },
			{ username, nickname, profile_image, introduce }
		) {
			const profile = { nickname, profile_image, introduce };
			axios({
				url: drf.accounts.profileUpdate(username),
				method: "put",
				data: profile,
				headers: getters.authHeader,
			})
				.then((res) => {
					commit("SET_PROFILE", res.data);
				})
				.catch((err) => {
					console.error(err.response.data);
					commit("SER_PROFILE_ERROR", err.response.data);
				});
		},

		setProfileLikedMoviePageNum({ commit }, page) {
			commit("SET_PROFILE_LIKED_MOVIE_PAGE_NUM", Number(page));
			localStorage.setItem("profileLikedMoviePageNum", Number(page));
		},
	},
};

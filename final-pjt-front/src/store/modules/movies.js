import router from "@/router";
import axios from "axios";
import drf from "@/api/drf";

import _ from "lodash";

export default {
  state: {
    // 직접 접근 금지! getters 이용하기!
    token: localStorage.getItem('token') || '' , // 새로고침해도 로컬스토리지에 토큰 있으면 저장할 수 있도록!
    currentUser: {},
    profile: {},
    currentUserProfile: {},
    authError: null,
    profileError: null,
  },

  getters: {
    // state의 정보는 모두 getters를 이용해서 꺼낸다!!
    isLoggedIn: state => !!state.token, 
    currentUser: state => state.currentUser,
  },

  mutations: {
    SET_TOKEN: (state, token) => state.token = token,
  },

	actions: {
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
							commit("SER_PROFILE_ERROR", err.response.data);
						});

					router.push({ name: "home" });
				})
				.catch((err) => {
					console.error(err.response.data);
					commit("SET_AUTH_ERROR", err.response.data);
				});
		},
  },
}

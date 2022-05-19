import router from '@/router'
import axios from 'axios'
import drf from '@/api/drf'

export default {
  state: {
    // 직접 접근 금지! getters 이용하기!
    token: localStorage.getItem('token') || '' ,
    currentUser: {},
    profile: {},
    authError: null,
  },

  getters: {
    // state의 정보는 모두 getters를 이용해서 꺼낸다!!
    isLoggedIn: state => !!state.token, // 토큰이 로컬 스토리지에 들어가 있으면 로그인 되어있는 것
    currentUser: state => state.currentUser,
    profile: state => state.profile,
    authError: state => state.authError,
  },

  mutations: {
    SET_TOKEN: (state, token) => state.token = token,
    SET_CURRENT_USER: (state, user) => state.currentUser = user,
    SET_PROFILE: (state, profile) => state.profile = profile,
    SET_AUTH_ERROR: (state, error) => state.authError = error,
  },

  actions: {
    saveToken({ commit }, token) {
      /* 
      state.token 추가 
      localStorage에 token 추가
      */
      commit('SET_TOKEN', token)
      localStorage.setItem('token', token)
    },

    removeToken({ commit }) {
      /* 
      state.token 삭제
      localStorage에 token 추가
      */
      commit('SET_TOKEN', '')
      localStorage.setItem('token', '')
    },

    signup({commit, dispatch}, credentials) {
      /* 
        POST: 사용자 입력정보를 signup URL로 보내기
        성공하면
          응답 토큰 저장
          현재 사용자 정보 받기
          메인 페이지(ArticleListView)로 이동
        실패하면
          에러 메시지 표시
      */

      // 대상 컴퓨터 연결 에러 문제로 가입성공 했을 시에 db에는 들어가나 토큰값이 state에 저장이 안됨!! 220519
      axios({
        url: drf.accounts.signup(),
        method: 'post',
        data: credentials
      })
        .then(res => {
          const token = res.data.key
          dispatch('saveToken', token)
          // dispatch('fetchCurrentUser')
          router.push({ name: 'home' })
        })
        .catch(err => {
          console.error(err.response.data)
          commit('SET_AUTH_ERROR', err.response.data)
        })
    },

    // login({commit, dispatch}, credentials) {

    // },

  }

}
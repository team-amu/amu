const HOST = 'http://localhost:8000/api/v1/'

const ACCOUNTS = 'accounts/'
// const COMMUNITY = 'community/'
// const MOVIES = 'movies/'

export default {
  accounts: {
    login: () => HOST + ACCOUNTS + 'login/',
    logout: () => HOST + ACCOUNTS + 'logout/',
    signup: () => HOST + ACCOUNTS + 'signup/',
    // 일단 위에 3개만~ 220519
    // // Token 으로 현재 user 판단
    // currentUserInfo: () => HOST + ACCOUNTS + 'user/',
    // // username으로 프로필 제공
    // profile: username => HOST + ACCOUNTS + 'profile/' + username,
  },
  // 교수님 코드!! 보고 참고해서 입맛에 맞게 바꿀 것 220519
  // articles: {
  //   // /articles/
  //   articles: () => HOST + ARTICLES,
  //   // /articles/1/
  //   article: articlePk => HOST + ARTICLES + `${articlePk}/`,
  //   likeArticle: articlePk => HOST + ARTICLES + `${articlePk}/` + 'like/',
  //   comments: articlePk => HOST + ARTICLES + `${articlePk}/` + COMMENTS,
  //   comment: (articlePk, commentPk) =>
  //     HOST + ARTICLES + `${articlePk}/` + COMMENTS + `${commentPk}/`,
  // },
}

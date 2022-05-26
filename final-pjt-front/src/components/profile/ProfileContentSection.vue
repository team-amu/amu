<template>
  <div id="profile-content-section">
    <!-- 좋아요한 영화 목록 -->
    <div id="profile-liked-movie-list" v-if="isLikedMovie">
      <profile-liked-movie-item
        v-for="content in contentsr"
        :key="content.pk"
        :content="content"
      ></profile-liked-movie-item>
    </div>

    <!-- 북마크한 영화 목록 -->
    <div id="profile-bookmarked-movie-list" v-if="isBookmarkedMovie">
      <profile-bookmarked-movie-item
        v-for="content in contentsr"
        :key="content.pk"
        :content="content"
      ></profile-bookmarked-movie-item>
    </div>

    <!-- 내가 쓴 게시글 목록 -->
    <ul id="profile-article-list" v-if="isArticle">
      <li id="article-list-header">
        <div class="article-id">글 번호</div>
        <div class="article-title">글 제목</div>
        <div class="article-user">작성자</div>
      </li>
      <profile-article-item
        v-for="content in contentsr"
        :key="content.pk"
        :content="content"
      ></profile-article-item>
    </ul>

    <!-- 내가 쓴 댓글 목록 -->
    <ul id="profile-comment-list" v-if="isComment">
      <li id="comment-list-header">
        <div class="article-id">글 번호</div>
        <div class="article-title">글 내용</div>
        <div class="article-user">작성 시각</div>
      </li>
      <profile-comment-item
        v-for="content in contentsr"
        :key="content.pk"
        :content="content"
      ></profile-comment-item>
    </ul>
  </div>
</template>

<script>
import ProfileLikedMovieItem from '@/components/profile/ProfileLikedMovieItem.vue'
import ProfileBookmarkedMovieItem from '@/components/profile/ProfileBookmarkedMovieItem.vue'
import ProfileArticleItem from '@/components/profile/ProfileArticleItem.vue'
import ProfileCommentItem from '@/components/profile/ProfileCommentItem.vue'
export default {
  components: { 
    ProfileLikedMovieItem,
    ProfileBookmarkedMovieItem,
    ProfileArticleItem,
    ProfileCommentItem,
  },
  name: 'ProfileContentSection',
  props: {
    contents: Array,
    type: String,
  },
  data(){
    return {
      isLikedMovie: false,
      isBookmarkedMovie: false,
      isArticle: false,
      isComment: false,
      contentsr: [],
    }
  },
  created () {
    this.contentsr = [...this.contents].reverse()
    switch(this.type) {
      case 'likedMovie' :
        this.isLikedMovie = true
        break
      case 'bookmarkedMovie' :
        this.isBookmarkedMovie = true
        break
      case 'article' :
        this.isArticle = true
        break
      case 'comment' :
        this.isComment = true
        break
    }
  }
}
</script>

<style lang="scss" scoped>
li {
  @include li-title;
}

#article-list-header {
  @include article-list-header
}

#profile-content-section {
  // #profile-liked-movie-list {}
  // #profile-bookmarked-movie-list {}

  #profile-article-list {
    border: 2px solid white;
    border-radius: 10px;
    padding: 0;
    margin: 1em 0;
  }

}

#profile-comment-list {
  border: 2px solid white;
  border-radius: 10px;
  padding: 0;
  margin: 1em 0;

  #comment-list-header {
    @include article-list-header
  }
}

</style>
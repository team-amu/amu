<template>
  <div>
    <h2>ProfileContentSection</h2>
    
    <!-- 좋아요한 영화 목록 -->
    <div v-if="isLikedMovie">
      <profile-liked-movie-item
        v-for="content in contents"
        :key="content.pk"
        :content="content"
      ></profile-liked-movie-item>
    </div>

    <!-- 북마크한 영화 목록 -->
    <div v-if="isBookmarkedMovie">
      <profile-bookmarked-movie-item
        v-for="content in contents"
        :key="content.pk"
        :content="content"
      ></profile-bookmarked-movie-item>
    </div>

    <!-- 내가 쓴 게시글 목록 -->
    <ul v-if="isArticle">
      <profile-article-item
        v-for="content in contents"
        :key="content.pk"
        :content="content"
      ></profile-article-item>
    </ul>

    <!-- 내가 쓴 댓글 목록 -->
    <ul v-if="isComment">
      <profile-comment-item
        v-for="content in contents"
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
    }
  },
  created () {
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

<style>
</style>
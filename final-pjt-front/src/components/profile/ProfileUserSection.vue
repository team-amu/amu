<template>
  <div id="profile-user-section">
    <section
      id="edit-section"
      v-if="isEditing"
    >
        <div class="input-label">프로필 사진 등록</div>
        <v-file-input
          v-model="payload.profile_image"
          class="file-input">
        </v-file-input>

        <div class="input-label">닉네임</div>
        <input
          type="text"
          v-model="payload.nickname"
          class="edit-input"
        >

        <div class="input-label">한 줄 소개</div>
        <input
          type="text"
          v-model="payload.introduce"
          class="edit-input"
        >
        <div class="edit-btn-section">
          <button class="edit-btn" @click="onUpdate">수정</button>
          <button class="edit-btn" @click="switchIsEditing">취소</button>
        </div>
        
    </section>

    <section
      id="user-info-section"
      v-if="!isEditing"
    >
      <div
        id="user-profile-image"
      >
        <img :src="imageSrc" alt="프로필사진" class="color-rotation">
      </div>
      <div class="user-info-prev-detail">
        <div class="user-info-detail">
          <span class="user-nickname">
            {{ profile.nickname }}
          </span>
          <button
            v-if="isFollow() && !isMe()"
            @click="follow(profileUsername)"
            class="unfollow-btn"
          ><v-icon>mdi-account-minus</v-icon> 언팔로우</button>

          <button
            v-if="!isFollow() && !isMe()"
            @click="follow(profileUsername)"
            class="follow-btn"
          ><v-icon>mdi-account-plus</v-icon> 팔로우</button>

          <button
            v-if="isMe() && !isEditing"
            @click="switchIsEditing"
            class="edit-btn"
          ><v-icon>mdi-account-cog</v-icon>정보 수정</button>
        </div>
        <div class="user-follow-section">
          <div class="user-follow-part">
            <v-icon>mdi-account-group</v-icon>
            <span>팔로워 {{ profile.user.followers_count }}</span>
          </div>
          <div class="user-follow-part">
            <v-icon>mdi-account-star</v-icon>
            <span>팔로잉 {{ profile.user.followings_count }}</span>
          </div>
        </div>
        <hr>
        <p>{{ profile.introduce }}</p>
      </div>
    </section>

    <section
      class="profile-btn-section"
      v-if="!isEditing"
    >
      <router-link
        class="profile-btn-link"
        :to="{ name: 'profileLike', params: { username: currentUser.username }}"
      >
        <div class="profile-btn">
          <div class="profile-btn-title">좋아요한 영화</div>
          <div class="profile-btn-count-part">
            <v-icon class="profile-btn-icon">mdi-heart</v-icon>
            <span class="profile-btn-count">{{ profile.user.like_movies.length }}</span>
          </div>
        </div>
      </router-link>

      <router-link
        class="profile-btn-link"
        :to="{ name: 'profileBookmark', params: { username: currentUser.username }}"
      >
        <div class="profile-btn">
          <div class="profile-btn-title">북마크한 영화</div>
          <div class="profile-btn-count-part">
            <v-icon class="profile-btn-icon">mdi-book-heart</v-icon>
            <span class="profile-btn-count">{{ profile.user.bookmark_movies.length }}</span>
          </div>
        </div>
      </router-link>

      <router-link
        class="profile-btn-link"
        :to="{ name: 'profileArticle', params: { username: currentUser.username }}"
      >
        <div class="profile-btn">
          <div class="profile-btn-title">작성한 게시글</div>
          <div class="profile-btn-count-part">
            <v-icon class="profile-btn-icon">mdi-note-text</v-icon>
            <span class="profile-btn-count">{{ profile.user.articles.length }}</span>
          </div>
        </div>
      </router-link>

      <router-link
        class="profile-btn-link"
        :to="{ name: 'profileComment', params: { username: currentUser.username }}"
      >
        <div class="profile-btn">
          <div class="profile-btn-title">작성한 댓글</div>
          <div class="profile-btn-count-part">
            <v-icon class="profile-btn-icon">mdi-comment-text</v-icon>
            <span class="profile-btn-count">{{ profile.user.comments.length }}</span>
          </div>
        </div>
      </router-link>
    </section>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'ProfileUserSection',
  props: {
    profile: Object,
  },
  data() {
    return {
      isEditing: false,
      payload: {
        username: this.$route.params.username,
        nickname: this.profile.nickname,
        profile_image: this.profile.profile_image,
        introduce: this.profile.introduce,
      },
      profileImageStyle: {
        'background-image': 'url(this.imageSrc)',
      },
    }
  },
  computed: {
    ...mapGetters(['currentUser', 'isProfile']),
    profileUsername() {
      return this.$route.params.username
    },
    imageSrc() {
      if (this.isProfile && this.profile.profile_image) {
        return `http://localhost:8000${this.profile.profile_image}`
      } 
      else {
        return 'http://localhost:8000/media/images/default.png'
      }
    }
  },
  methods: {
    ...mapActions(['follow', 'profileUpdate']),
    isFollow() {
      return this.profile.user.followers.some((ele) => {
        return ele.id === this.currentUser.pk
      })
    },
    isMe() {
      return this.profile.user.id === this.currentUser.pk
    },
    switchIsEditing() {
      this.isEditing = !this.isEditing
    },
    onUpdate() {
      this.profileUpdate(this.payload)
      this.isEditing = false
    },
  },
}
</script>

<style lang="scss" scoped>
@include rotate;

@mixin mother-btn {
  @include flex;
  align-items: center;
  width: 30%;
  height: 15%;
  gap: .5em;
}

#profile-user-section {
  @include f-5;
  @include flex(column);

  #edit-section{
    .input-label {
      margin: 2em 0 .5em 0;
      padding: .5em 0;
    }

    .edit-input {
      @include input-style1;
      margin: 1em 0;
    }

    .file-input {
      @include input-style1;
      margin: 1em 0;
    }

    .edit-btn-section {
      @include flex;
      justify-content: flex-end;
      gap: 1em;

      button {
        margin: 1em 0;
      }
    }
  }

  #user-info-section {
    @include flex;
    gap: 3em;
    margin: 2em 0 1em 0;

    #user-profile-image {
      @include flex;
      justify-content: center;
      align-items: center;
      overflow: hidden;
      aspect-ratio: 1 / 1;
      border-radius: 50%;
      border: 2px solid white;

      width: 2000px;
      flex-shrink: 1;

      img {
        flex-shrink: 0;
        min-width: 100%;
        max-width: 100%;
      }
    }

    .user-info-prev-detail {
      @include flex(column);
      gap: .5em;
      width: 4000px;
      flex-shrink: 1;

      .user-info-detail {
        @include flex;
        gap: 1em;

        .user-nickname {
          @include f-2;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .follow-btn {
          @include blank-btn1(0.3);
          @include mother-btn;
          @include icon;
          width: 30%;
          height: auto;

          &:hover {
            @include icon(black);
          }
        }

        .unfollow-btn {
          @include pt-btn2(0.3);
          @include mother-btn;
          width: 30%;
          height: auto;

          &:hover {
            @include icon(black);
          }
        }
      }

      .user-follow-section {
        @include flex;
        gap: 1em;

        .user-follow-part {
          @include flex;
          @include icon;
          gap: .5em;
        }
      }
    }
  }

    .edit-btn {
    @include blank-btn1(0.3);
    @include mother-btn;
    @include icon;
    width: 30%;
    height: auto;

    &:hover {
      @include icon(black);
    }
  }

  .profile-btn-section {
    @include f-6;
    @include flex;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: .5em;
    margin: 1em 0;

    .profile-btn-link {
      width: 24%;
    }

    .profile-btn {
      $profile-btn-color: white;
      @include icon;
      @include flex(column);
      justify-content: center;
      align-items: center;
      border: 1px solid $profile-btn-color;
      border-radius: 5px;
      padding: .5em;
      flex-shrink: 1;
      gap: .5em;

      // &:hover {
      //   $profile-btn-color: $dm-pt-color1;
      // }

      .profile-btn-count-part {
        @include flex;
        gap:.5em;
        @include f-4;
        span {
          color: $profile-btn-color;
        }

        .profile-btn-icon {
          @include f-4;
        }
      }
    }
  }
}
</style>
<template>
  <li id="review-item">
    <section class="rank">
      <div class="rank"></div>
    </section>

    <section id="review-header">
      <span id="review-profile-title">{{ review.title }}</span>
      <div id="review-profile">
        <div
          id="review-profile-image"
          :style="profileImageSrc"
        ></div>
        <span id="review-profile-nickname">{{ review.user.profile.nickname }}</span>
        <span>⭐{{ review.rank}}</span>
      </div>
    </section>

    <section id="review-content">
      {{ review.content }}
    </section>

    <section id="review-date">
      <div class="date-part"><v-icon>mdi-clock</v-icon> 작성 {{ cuttedCreatedAt }}</div>
      <div class="date-part"><v-icon>mdi-pen</v-icon> 수정 {{ cuttedUpdatedAt }}</div>
    </section>
  </li>
</template>

<script>
export default {
  name: 'ReviewItem',
  props: {
    review: Object,
  },
  computed: {
    cuttedCreatedAt() {
      return this.timedelta(this.review.created_at)
    },

    cuttedUpdatedAt() {
      return this.timedelta(this.review.updated_at)
    },
    profileImageSrc() {
      const profile_image = this.review.user.profile.profile_image
      return {
        'background-image': `url("http://localhost:8000${profile_image}")`,
        'background-size': 'cover'
      }
    }
  },
  methods: {
    timedelta (data) {
      const date1 = new Date(data);
      const date2 = new Date();
      let timedelta = Math.ceil((date2 - date1)/1000)
      if (timedelta < 60) {
        return `${timedelta}초 전`
      }
      timedelta = Math.floor(timedelta/60)
      if (timedelta < 60) {
        return `${timedelta}분 전`
      }
      timedelta = Math.floor(timedelta/60)
      if (timedelta < 24) {
        return `${timedelta}시간 전`
      }
      timedelta = Math.floor(timedelta/24)
      if (timedelta < 7) {
        return `${timedelta}일 전`
      }
      timedelta = Math.floor(timedelta/7)
      if (timedelta < 4) {
        return `${timedelta}주 전`
      }
      timedelta = Math.floor(timedelta/4)
      if (timedelta < 12) {
        return `${timedelta}달 전`
      }
      timedelta = Math.floor(timedelta/12)
      return `${timedelta}년 전`
    },
  }
}
</script>

<style lang="scss" scoped>
  span {
    @include f-5;
    color: $dm-bg-color1;
  }
  p {
    @include f-6;
    color: $dm-bg-color1;
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    overflow: hidden;
    width: 94%;
    margin-left: 3%;
  }
  #review-date {
      @include flex-gap(row, 1);
      align-self: flex-end;
  }

  #review-content {
    @include f-6;

  }

#review-item {
  @include flex-gap(column, .7);
  @include f-5;
  margin-top: 0.5rem;
  color: black;
  background-color: white;
  border-radius:20px;
  padding: 0 1.5em 1em .5em;

  #review-header {
    @include flex-gap(row, 0.5);
    justify-content: start;
    align-items: center;
    border-bottom: 1px solid lightgray;
    padding: 0 0 .5em .5em;
    margin: .5em 0;

    #review-profile {
      @include flex-gap;
      align-items: center;

      #review-profile-image {
        width: 2em;
        height: 2em;
        border-radius: 50%;
      }

      #review-profile-nickname {
        font-weight: 600;
        color: $dm-pt-color2;
      }
    }
  }

  #review-content {
    padding-left: .5em;
  }
}

.whole {
  width: 100%;
  z-index: 2;
}


.content {
  width: 100%;
  border: 1px red solid;
  z-index: 2;
}

.actor-images {
  @include flex;
  flex-wrap: wrap;
}

.date-part {
  @include f-6;
  color: $dm-bg-color1;

  i {
    @include f-5;
    color: $dm-bg-color1;
  }
}

#title-section {
  @include flex-gap;
  border-bottom: 1px solid white;

  .vote {
    display: inline-flex;
    z-index: 2;
  }
}
</style>
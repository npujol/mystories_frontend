<template>
  <div class="home-my-feed">
    <StoryList type="feed" :owner="owner" />
  </div>
</template>

<script>
import StoryList from "../components/StoryList.vue";

export default {
  name: "HomeMyFeed",
  components: {
    StoryList
  },
  computed: {
    owner() {
      return this.$route.params.username;
    }
  }
};
</script>

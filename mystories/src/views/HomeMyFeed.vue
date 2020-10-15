<template>
  <div class="home-my-feed">
    <RwvStoryList type="feed" :owner="owner" />
  </div>
</template>

<script>
import RwvStoryList from "@/components/StoryList.vue";

export default {
  name: "rwv-home-my-feed",
  components: {
    RwvStoryList
  },
  computed: {
    owner() {
      return this.$route.params.username;
    }
  }
};
</script>

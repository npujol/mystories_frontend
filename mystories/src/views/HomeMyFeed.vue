<template>
  <div class="home-my-feed">
    <RwvStoryList type="feed" :author="author" />
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
    author() {
      return this.$route.params.author;
    }
  }
};
</script>

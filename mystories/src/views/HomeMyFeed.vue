<template>
  <div class="home-my-feed"><RwvStoryList type="feed" /></div>
</template>

<script>
import RwvStoryList from "@/components/StoryList.vue";

export default {
  name: "rwv-home-my-feed",
  components: {
    RwvStoryList
  }
};
</script>

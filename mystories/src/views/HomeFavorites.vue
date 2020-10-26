<template>
  <div>
    <StoryList type="favorites" :favorited="owner" />
  </div>
</template>

<script>
import StoryList from "../components/StoryList.vue";

export default {
  name: "HomeFavorites",
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

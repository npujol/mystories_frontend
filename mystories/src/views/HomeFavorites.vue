<template>
  <div>
    <RwvStoryList type="favorites" :favorited="owner" />
  </div>
</template>

<script>
import RwvStoryList from "@/components/StoryList.vue";

export default {
  name: "rwv-home-favorites",
  components: {
    RwvStoryList
  },
  computed: {
    owner() {
      return this.$route.params.owner;
    }
  }
};
</script>

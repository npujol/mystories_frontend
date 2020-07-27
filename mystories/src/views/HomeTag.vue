<template>
  <div class="home-tag"><RwvStoryList :tag="tag.tag"></RwvStoryList></div>
</template>

<script>
import RwvStoryList from "../components/StoryList.vue";

export default {
  name: "RwvHomeTag",
  components: {
    RwvStoryList
  },
  computed: {
    tag() {
      return this.$route.params.tag;
    }
  }
};
</script>

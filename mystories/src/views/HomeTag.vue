<template>
  <div><RwvStoryList type="tag" :tag="tag"> </RwvStoryList></div>
</template>

<script>
import RwvStoryList from "../components/StoryList.vue";

export default {
  name: "HomeTag",
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

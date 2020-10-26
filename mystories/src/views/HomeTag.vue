<template>
  <div><StoryList type="tag" :tag="tag"> </StoryList></div>
</template>

<script>
import StoryList from "../components/StoryList.vue";

export default {
  name: "HomeTag",
  components: {
    StoryList
  },
  computed: {
    tag() {
      return this.$route.params.tag;
    }
  }
};
</script>

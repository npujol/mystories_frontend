<template>
  <div class="home-global"><RwvStoryList type="all" /></div>
</template>
<script>
import RwvStoryList from "../components/StoryList.vue";

export default {
  name: "rwv-home-global",
  components: {
    RwvStoryList
  }
};
</script>

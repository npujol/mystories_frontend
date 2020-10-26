<template>
  <div class="home-global"><StoryList type="all" /></div>
</template>
<script>
import StoryList from "../components/StoryList.vue";

export default {
  name: "HomeGlobal",
  components: {
    StoryList
  }
};
</script>

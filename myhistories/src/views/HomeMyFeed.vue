<template>
  <div class="home-my-feed"><RwvHistoryList type="feed" /></div>
</template>

<script>
import RwvHistoryList from "@/components/HistoryList.vue";

export default {
  name: "rwv-home-my-feed",
  components: {
    RwvHistoryList
  }
};
</script>

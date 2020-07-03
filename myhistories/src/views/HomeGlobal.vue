<template>
  <div class="home-global"><RwvHistoryList type="all" /></div>
</template>
<script>
import RwvHistoryList from "../components/HistoryList.vue";

export default {
  name: "rwv-home-global",
  components: {
    RwvHistoryList
  }
};
</script>

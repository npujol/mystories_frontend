<template>
  <div class="home-tag"><RwvHistoryList :tag="tag"></RwvHistoryList></div>
</template>

<script>
import RwvHistoryList from "../components/HistoryList.vue";

export default {
  name: "RwvHomeTag",
  components: {
    RwvHistoryList
  },
  computed: {
    tag() {
      return this.$route.params.tag;
    }
  }
};
</script>

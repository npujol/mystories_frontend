<template>
  <div class="profile-page">
    <RwvHistoryList :author="author" :items-per-page="5"></RwvHistoryList>
  </div>
</template>

<script>
import RwvHistoryList from "@/components/HistoryList.vue";

export default {
  name: "RwvProfileHistories",
  components: {
    RwvHistoryList
  },
  computed: {
    author() {
      return this.$route.params.username;
    }
  }
};
</script>

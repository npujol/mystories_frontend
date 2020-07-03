<template>
  <div class="profile-page">
    <RwvHistoryList :favorited="favorited" :items-per-page="5">
    </RwvHistoryList>
  </div>
</template>

<script>
import RwvHistoryList from "@/components/HistoryList.vue";

export default {
  name: "RwvProfileFavorited",
  components: {
    RwvHistoryList
  },
  computed: {
    favorited() {
      return this.$route.params.username;
    }
  }
};
</script>

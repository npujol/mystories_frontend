<template>
  <v-row class="d-flex justify-center">
    <v-col>
      <v-card color="basil" class="mx-auto">
        <RwvStoryList type="feed" :owner="owner"></RwvStoryList>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import RwvStoryList from "../components/StoryList.vue";

export default {
  name: "ProfileStories",
  components: {
    RwvStoryList
  },
  computed: {
    owner() {
      return this.$route.params.username;
    }
  }
};
</script>

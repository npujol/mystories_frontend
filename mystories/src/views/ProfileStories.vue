<template>
  <v-row class="d-flex justify-center">
    <v-col>
      <v-card color="basil" class="mx-auto">
        <StoryList type="feed" :owner="owner"></StoryList>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import StoryList from "../components/StoryList.vue";

export default {
  name: "ProfileStories",
  components: {
    StoryList
  },
  computed: {
    owner() {
      return this.$route.params.username;
    }
  }
};
</script>

<template>
  <v-row class="d-flex justify-center">
    <v-col>
      <v-card color="basil" class="mx-auto">
        <StoryList :favorited="favorited"> </StoryList>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import StoryList from "../components/StoryList.vue";

export default {
  name: "ProfileFavorited",
  components: {
    StoryList
  },
  computed: {
    favorited() {
      return this.$route.params.username;
    }
  }
};
</script>

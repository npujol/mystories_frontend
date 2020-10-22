<template>
  <v-row class="d-flex justify-center">
    <v-col>
      <v-card color="basil" class="mx-auto">
        <RwvStoryList :favorited="favorited"> </RwvStoryList>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import RwvStoryList from "../components/StoryList.vue";

export default {
  name: "ProfileFavorited",
  components: {
    RwvStoryList
  },
  computed: {
    favorited() {
      return this.$route.params.username;
    }
  }
};
</script>

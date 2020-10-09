<template>
  <v-row class="d-flex justify-center">
    <v-col>
      <v-card color="basil" class="mx-auto">
        <v-card-title class="text-center justify-center">
          <h1 class="font-weight-bold display-3 basil--text text-center">
            A place to shared yours stories
          </h1>
        </v-card-title>

        <RwvStoryList :owner="owner"></RwvStoryList>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import RwvStoryList from "@/components/StoryList.vue";

export default {
  name: "RwvProfileStories",
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

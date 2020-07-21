<template>
  <v-row class="d-flex justify-center">
    <v-col cols="12" md="12">
      <v-card color="basil" class="mx-auto">
        <v-card-title class="text-center justify-center">
          <h1 class="font-weight-bold display-3 basil--text text-center">
            Yours favorited histories
          </h1>
        </v-card-title>

        <RwvHistoryList :favorited="favorited" :items-per-page="5">
        </RwvHistoryList>
      </v-card>
    </v-col>
  </v-row>
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

<template>
  <div id="app">
    <v-app>
      <RwvHeader />
      <v-main>
        <v-container class="fill-height" fluid>
          <v-row justify="center" align="center">
            <v-col cols="10">
              <router-view class="pa-2"></router-view>
            </v-col>
          </v-row>
        </v-container>
      </v-main>
      <RwvFooter />
    </v-app>
  </div>
</template>

<script>
import RwvHeader from "./components/TheHeader.vue";
import RwvFooter from "./components/TheFooter.vue";

export default {
  name: "App",
  data: () => ({
    drawer: null
  }),
  components: {
    RwvHeader,
    RwvFooter
  },
  created() {
    this.$vuetify.theme.dark = true;
  }
};
</script>

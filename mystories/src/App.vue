<template>
  <div id="app">
    <v-app>
      <RwvHeader />
      <v-main>
        <v-container class="fill-height" fluid>
          <v-row class="d-flex justify-center">
            <v-col>
              <v-tooltip right>
                <template v-slot:activator="{ on }">
                  <v-btn :href="source" icon large target="_blank" v-on="on">
                    <!-- <v-icon>mdi-code-tags</v-icon> -->
                  </v-btn>
                </template>
                <span>Source</span>
              </v-tooltip>
            </v-col>
          </v-row>
          <router-view></router-view>
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
  props: {
    source: String
  },
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

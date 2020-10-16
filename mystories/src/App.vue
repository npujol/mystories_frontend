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
          <v-fab-transition>
            <v-btn
              fab
              v-scroll="onScroll"
              v-show="fab"
              color="primary"
              bottom
              right
              fixed
              @click="toTop"
            >
              <v-icon>mdi-chevron-up</v-icon>
            </v-btn>
          </v-fab-transition>
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
    drawer: null,
    fab: false
  }),
  components: {
    RwvHeader,
    RwvFooter
  },
  created() {
    this.$vuetify.theme.dark = true;
  },
  computed: {
    activeFab() {
      switch (this.tabs) {
        case "one":
          return { class: "purple", icon: "account_circle" };
        case "two":
          return { class: "red", icon: "edit" };
        case "three":
          return { class: "green", icon: "keyboard_arrow_up" };
        default:
          return {};
      }
    }
  },
  methods: {
    onScroll(e) {
      if (typeof window === "undefined") return;
      const top = window.pageYOffset || e.target.scrollTop || 0;
      this.fab = top > 20;
    },
    toTop() {
      this.$vuetify.goTo(0);
    }
  }
};
</script>

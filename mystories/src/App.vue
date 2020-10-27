<template>
  <div id="app">
    <v-app>
      <v-alert v-if="errors && errors.error" dismissible type="error">
        {{ errors.error | error }}
      </v-alert>
      <Header />
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
              small
              @click="toTop"
            >
              <v-icon>mdi-chevron-up</v-icon>
            </v-btn>
          </v-fab-transition>
        </v-container>
      </v-main>
      <Footer />
    </v-app>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Header from "./components/TheHeader.vue";
import Footer from "./components/TheFooter.vue";

export default {
  name: "App",
  data: () => ({
    drawer: null,
    fab: false
  }),
  components: {
    Header,
    Footer
  },
  created() {
    this.$vuetify.theme.dark = true;
  },
  computed: {
    ...mapState({
      errors: (state) => state.auth.errors
    })
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

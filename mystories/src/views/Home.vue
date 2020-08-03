<template>
  <v-card color="basil" class="mx-auto" aling="center">
    <v-card-title class="d-flex text-center justify-center">
      <h1 class="font-weight-bold basil--text text-center">
        A place to shared yours stories
      </h1>
    </v-card-title>

    <v-tabs
      v-model="tab"
      background-color="transparent"
      color="basil"
      grow
      mandatory
      @change="onChangeTab"
    >
      <v-tab :disabled="tab === 0" @change="linkTo('home', {})">
        <v-icon>mdi-home</v-icon>
        Global Feed
      </v-tab>
      <v-tab
        :disabled="tab === 1"
        v-if="isAuthenticated"
        @change="linkTo('home-my-feed', { author: currentUser.username })"
      >
        <v-icon>mdi-account-circle</v-icon>
        Your Feed
      </v-tab>
      <v-tab
        :disabled="tab === 2"
        v-if="tag"
        @change="linkTo('home-tag', { tag })"
      >
        <v-icon>mdi-tag</v-icon>
        {{ tag }}
      </v-tab>
    </v-tabs>
    <v-chip-group active-class="primary--text" v-model="selected">
      <RwvTag
        :disabled="value.tag == selected"
        v-for="value in tags"
        :tag="value.tag"
        :key="value.pk"
      >
      </RwvTag>
    </v-chip-group>
    <router-view></router-view>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";
import RwvTag from "../components/VTag.vue";
import { FETCH_TAGS } from "../store/actions.type.js";

export default {
  name: "home",
  data() {
    return {
      tab: null
    };
  },
  components: {
    RwvTag
  },
  async beforeMount() {
    this.initialState(this.$route);
  },
  async beforeRouteUpdate(to, from, next) {
    await this.initialState(to);
    return next();
  },
  mounted() {
    this.$store.dispatch(FETCH_TAGS);
  },
  computed: {
    ...mapGetters(["isAuthenticated", "tags", "currentUser"]),
    tag() {
      return this.$route.params.tag;
    },
    author() {
      return this.$route.params.author;
    },
    selected() {
      return this.tag;
    }
  },
  methods: {
    linkTo(route, params) {
      if (params.length === 0) {
        this.$router.push({ name: route });
      }
      this.$router.push({ name: route, params: params });
    },
    onChangeTab(clickedTab) {
      this.tab = clickedTab;
    },
    initialState(route) {
      if (route.name == "home") {
        this.tab = 0;
      }
      if (route.name == "home-my-feed") {
        this.tab = 1;
      }
      if (route.name == "home-tag") {
        this.tab = 2;
        console.log(this.tag);
        this.selected = route.params.tag;
      }
    }
  }
};
</script>

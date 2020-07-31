<template>
  <v-card color="basil" class="mx-auto" aling="center">
    <v-card-title class="d-flex text-center justify-center">
      <h1 class="font-weight-bold basil--text text-center">
        A place to shared yours stories
      </h1>
    </v-card-title>

    <v-tabs v-model="tab" background-color="transparent" color="basil" grow>
      <v-tab @click="linkTo('home', {})">
        <v-icon>mdi-home</v-icon>
        Global Feed
      </v-tab>
      <v-tab v-if="isAuthenticated" @click="linkTo('home-my-feed', {})">
        <v-icon>mdi-account-circle</v-icon>
        Your Feed
      </v-tab>
      <v-tab v-if="tag" @click="linkTo('home-tag', { tag })">
        <v-icon>mdi-tag</v-icon>
        {{ tag }}
      </v-tab>
    </v-tabs>
    <v-chip-group
      class="d-flex pa-10 align-self-center"
      active-class="primary--text"
    >
      <RwvTag v-for="tag in tags" :tag="tag.tag" :key="tag.pk"> </RwvTag>
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
  mounted() {
    this.$store.dispatch(FETCH_TAGS);
  },
  computed: {
    ...mapGetters(["isAuthenticated", "tags"]),
    tag() {
      return this.$route.params.tag;
    }
  },
  methods: {
    linkTo(route, params) {
      if (params.length === 0) {
        this.$router.push({ name: route });
      }
      this.$router.push({ name: route, params: params });
    }
  }
};
</script>

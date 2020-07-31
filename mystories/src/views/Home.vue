<template>
  <v-row class="d-flex justify-center align-center">
    <v-col>
      <v-card color="basil" class="mx-auto" aling="center">
        <v-card-title class="d-flex text-center justify-center">
          <h1 class="d-flex font-weight-bold basil--text text-center">
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
        <v-row justify="space-around">
          <v-col cols="12" sm="6" md="4">
            <v-sheet class="py-4 px-1">
              <v-chip-group active-class="primary--text">
                <RwvTag v-for="tag in tags" :tag="tag.tag" :key="tag.pk">
                </RwvTag>
              </v-chip-group>
            </v-sheet>
          </v-col>
        </v-row>
        <router-view></router-view>
      </v-card>
    </v-col>
  </v-row>
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

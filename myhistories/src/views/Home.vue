<template>
  <section class="hero is-light">
    <div class="hero-body">
      <div class="container">
        <p class="title">
          Histories
        </p>
        <p class="subtitle">
          A place to shared yours histories.
        </p>
      </div>
      <div>
        <v-tabs type="is-boxed is-centered">
          <v-tab-item v-if="isAuthenticated">
            <template slot="header">
              <router-link :to="{ name: 'home-my-feed' }">
                <icon icon="information-outline"></icon>
                Your Feed
              </router-link>
            </template>
          </v-tab-item>
          <v-tab-item>
            <template slot="header">
              <router-link :to="{ name: 'home' }" exact>
                <icon icon="home"></icon>
                Global Feed
              </router-link>
            </template>
          </v-tab-item>
          <v-tab-item v-if="tag">
            <template slot="header">
              <router-link :to="{ name: 'home-tag', params: { tag } }">
                <icon icon="tag"></icon>
                {{ tag }}
              </router-link>
            </template>
          </v-tab-item>
        </v-tabs>
      </div>
      <div class="tags">
        <RwvTag v-for="tag in tags" :tag="tag.tag" :key="tag.pk"> </RwvTag>
      </div>
    </div>
    <router-view></router-view>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import RwvTag from "../components/VTag.vue";
import { FETCH_TAGS } from "../store/actions.type.js";

export default {
  name: "home",
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
  }
};
</script>

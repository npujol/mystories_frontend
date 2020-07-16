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
        <b-tabs type="is-boxed is-centered">
          <b-tab-item v-if="isAuthenticated">
            <template slot="header">
              <router-link :to="{ name: 'home-my-feed' }">
                <b-icon icon="information-outline"></b-icon>
                Your Feed
              </router-link>
            </template>
          </b-tab-item>
          <b-tab-item>
            <template slot="header">
              <router-link :to="{ name: 'home' }" exact>
                <b-icon icon="home"></b-icon>
                Global Feed
              </router-link>
            </template>
          </b-tab-item>
          <b-tab-item v-if="tag">
            <template slot="header">
              <router-link :to="{ name: 'home-tag', params: { tag } }">
                <b-icon icon="tag"></b-icon>
                {{ tag }}
              </router-link>
            </template>
          </b-tab-item>
        </b-tabs>
      </div>
      <div class="tags">
        <b-taglist>
          <RwvTag v-for="tag in tags" :tag="tag.tag" :key="tag.pk"> </RwvTag>
        </b-taglist>
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

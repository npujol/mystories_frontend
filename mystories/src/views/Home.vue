<template>
  <v-container fluid>
    <v-fab-transition v-if="isAuthenticated">
      <v-btn
        fab
        color="red accent-2"
        button
        right
        fixed
        @click="linkTo('story-new', {})"
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-fab-transition>
    <v-card class="mx-auto" aling="center">
      <v-card-title class="text-center aling-center justify-space-around">
        <h2 class="font-weight-bold basil--text text-center">
          A place to share yours stories
        </h2>
      </v-card-title>
      <v-spacer></v-spacer>
      <template>
        <v-tabs
          v-model="tab"
          background-color="transparent"
          grow
          centered
          icons
          @change="onChangeTab"
        >
          <v-tab
            class="white--text"
            :disabled="tab === 0"
            @change="linkTo('home', {})"
          >
            <v-icon color="white">mdi-home</v-icon>
            Global Feed
          </v-tab>
          <v-tab
            class="white--text"
            :disabled="tab === 1"
            v-if="isAuthenticated"
            @change="linkTo('home-my-feed', { username: currentUser.username })"
          >
            <v-icon color="white">mdi-account-circle</v-icon>
            Your Feed
          </v-tab>
          <v-tab
            class="white--text"
            :disabled="tab === 2"
            v-if="isAuthenticated"
            @change="
              linkTo('home-favorites', { username: currentUser.username })
            "
          >
            <v-icon color="white">mdi-heart</v-icon>
            Favorited
          </v-tab>
          <v-tab
            :disabled="tab === 3"
            v-if="tag"
            @change="linkTo('home-tag', { tag })"
          >
            <v-icon>mdi-tag</v-icon>
            {{ tag.tag }}
          </v-tab>
        </v-tabs>
      </template>
      <v-card-text>
        <v-chip-group
          show-arrows
          active-class="v-slide-item--active"
          v-model="selected"
        >
          <Tag
            :disabled="value.pk === selected"
            v-for="value in tags"
            :tag="value.tag"
            :key="value.pk"
          >
          </Tag>
        </v-chip-group>
        <router-view></router-view>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
import Tag from "../components/Tag.vue";
import { linkTo } from "../components/mixins/linkTo.js";
import { FETCH_TAGS } from "../store/actions.type.js";

export default {
  name: "home",
  mixins: [linkTo],
  data() {
    return {
      tab: null
    };
  },
  components: {
    Tag
  },
  async beforeRouteUpdate(to, from, next) {
    await this.setTab(to);
    return next();
  },
  async beforeUpdate() {
    await this.setTab(this.$route);
  },
  mounted() {
    this.$store.dispatch(FETCH_TAGS);
  },
  computed: {
    ...mapGetters(["isAuthenticated", "tags", "currentUser"]),
    tag() {
      return this.tags.find(tag => tag.tag === this.$route.params.tag);
    },
    owner() {
      return this.$route.params.owner;
    },
    selected: {
      get() {
        return this.tag ? this.tag.pk : null;
      },
      set(newValue) {
        return this.tag ? this.tag.pk : null;
      }
    }
  },
  methods: {
    onChangeTab(clickedTab) {
      this.tab = clickedTab;
    },
    setTab(route) {
      if (route.name == "home") {
        this.tab = 0;
      }
      if (route.name == "home-my-feed") {
        this.tab = 1;
      }
      if (route.name == "home-favorites") {
        this.tab = 2;
      }
      if (route.name == "home-tag") {
        this.tab = 3;
      }
    }
  }
};
</script>

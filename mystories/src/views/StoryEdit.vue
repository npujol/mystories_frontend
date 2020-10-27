<template>
  <StoryFormBase
    v-if="isAuthenticated"
    :isNew="false"
    :story="story"
  ></StoryFormBase>
</template>

<script>
import { mapGetters } from "vuex";
import store from "@/store";
import {
  FETCH_STORY,
  STORY_RESET_STATE,
  FETCH_STORY_PRIVATE
} from "../store/actions.type.js";
import StoryFormBase from "../components/StoryFormBase.vue";

export default {
  name: "StoryEdit",
  components: { StoryFormBase },
  mounted() {
    this.fetchPrivateStory();
  },
  computed: {
    ...mapGetters(["isAuthenticated", "story"])
  },
  methods: {
    async fetchPrivateStory() {
      try {
        const data = await this.$store.dispatch(FETCH_STORY_PRIVATE, {
          slug: this.$route.params.slug
        });
      } catch {
        this.$router.push({ name: "story", params: { slug: data.slug } });
      }
    }
  }
};
</script>

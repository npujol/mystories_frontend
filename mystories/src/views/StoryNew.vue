<template>
  <StoryFormBase
    v-if="isAuthenticated"
    :isNew="true"
    :story="story"
  ></StoryFormBase>
</template>

<script>
import { mapGetters } from "vuex";
import store from "@/store";
import { FETCH_STORY, STORY_RESET_STATE } from "../store/actions.type.js";
import StoryFormBase from "../components/StoryFormBase.vue";

export default {
  name: "StoryNew",
  components: { StoryFormBase },
  async beforeRouteLeave(to, from, next) {
    await store.dispatch(STORY_RESET_STATE);
    next();
  },
  computed: {
    ...mapGetters(["story", "isAuthenticated"])
  },
  mounted() {
    this.$store.dispatch(STORY_RESET_STATE);
    if (!this.isAuthenticated) {
      this.$router.push({ name: "home" });
    }
  }
};
</script>

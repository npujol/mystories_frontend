<template>
  <v-card outlined>
    <v-img :src="storyPreview" class="white--text align-end" height="200px">
      <v-container>
        <v-row>
          <v-card-title shrink class="headline font-weight-bold basil--text">
            {{ story.title }}
          </v-card-title>
          <v-spacer></v-spacer>
          <v-card-actions>
            <StoryActions
              v-if="isAuthenticated"
              :isPreview="isPreview"
              :story="story"
            />
          </v-card-actions>
        </v-row>
      </v-container>
    </v-img>
    <v-list two-line>
      <v-list-item>
        <v-list-item-avatar
          @click="linkTo('profile', { username: story.owner.username })"
        >
          <img class="is-rounded" :src="ownerPreview" />
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title
            class="text-decoration-underline primary--text"
            @click="linkTo('profile', { username: story.owner.username })"
          >
            {{ story.owner.username }}
          </v-list-item-title>
          <v-list-item-subtitle>Author</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <v-chip-group show-arrows class="flex pa-2">
      <Tag v-for="(value, index) in story.tags" :tag="value" :key="index">
      </Tag>
    </v-chip-group>
    <v-card-text class="white--text align-center">
      {{ story.description }}
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
        v-if="isPreview"
        elevation="12"
        color="primary accent-4"
        @click="
          linkTo('story', {
            slug: story.slug
          })
        "
      >
        <span> Read more </span>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";
import Tag from "./Tag.vue";
import StoryActions from "./StoryActions.vue";
import { linkTo } from "./mixins/linkTo.js";

export default {
  name: "StoryPreview",
  mixins: [linkTo],
  components: {
    Tag,
    StoryActions
  },
  props: {
    story: {
      type: Object,
      required: true
    },
    isPreview: {
      type: Boolean,
      required: true,
      default: true
    }
  },
  data() {
    return {
      storyPreview: "https://picsum.photos/510/300?random",
      ownerPreview: "https://picsum.photos/510/300?random"
    };
  },
  mounted() {
    if (this.story.image) {
      this.storyPreview = this.story.image;
    }
    if (this.story.owner.image) {
      this.ownerPreview = this.story.owner.image;
    }
  },
  computed: {
    ...mapGetters(["isAuthenticated"])
  }
};
</script>

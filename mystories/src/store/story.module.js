import Vue from "vue";
import { StoriesApi } from "../client";

import {
  FETCH_STORY_PRIVATE,
  FETCH_STORY,
  STORY_FAVORITE_CREATE,
  STORY_FAVORITE_DELETE,
  STORY_PUBLISH,
  STORY_EDIT,
  TAG_STORY_EDIT_CREATE,
  TAG_STORY_EDIT_DELETE,
  STORY_DELETE,
  STORY_RESET_STATE,
  FETCH_STORY_AUDIO,
  STORY_AUDIO_CREATE
} from "./actions.type.js";
import {
  RESET_STATE,
  SET_STORY,
  TAG_CREATE,
  TAG_DELETE,
  UPDATE_STORY_IN_LIST,
  SET_AUDIO,
  SET_STORY_PRIVATE
} from "./mutations.type.js";

const storiesApi = new StoriesApi();
const initialState = {
  story: {
    slug: "",
    owner: {},
    title: "",
    description: "",
    image: "",
    body: "",
    language: "es",
    favoritesCount: "",
    createdAt: "",
    updatedAt: "",
    bodyMarkdown: "",
    tags: []
  },
  storyAudio: null
};
const getters = {
  story(state) {
    return state.story;
  },
  storyAudio() {
    return state.storyAudio;
  }
};

export const state = { ...initialState };

export const actions = {
  async [FETCH_STORY](context, payload) {
    const data = await storiesApi.storiesRead(payload.slug);
    context.commit(SET_STORY, data);
    return data;
  },
  async [FETCH_STORY_PRIVATE](context, payload) {
    const story = await storiesApi.storiesRead(payload.slug);
    context.commit(SET_STORY, story);
    const data = await storiesApi.storiesGetBodyMarkdown(payload.slug);
    context.commit(SET_STORY_PRIVATE, data);
    return data;
  },
  async [FETCH_STORY_AUDIO](context, payload) {
    const data = await storiesApi.storiesGetAudio(payload.slug);
    context.commit(SET_AUDIO, data);
    return data;
  },
  async [STORY_FAVORITE_CREATE](context, slug) {
    const data = await storiesApi.storiesFavorite(slug, {});
    context.commit(UPDATE_STORY_IN_LIST, data, { root: true });
    context.commit(SET_STORY, data);
  },
  async [STORY_FAVORITE_DELETE](context, slug) {
    const data = await storiesApi.storiesUnfavorite(slug, {});
    // Update list as well. This allows us to favorite an story in the Home view.
    context.commit(UPDATE_STORY_IN_LIST, data, { root: true });
    context.commit(SET_STORY, data);
  },
  async [STORY_PUBLISH](context, payload) {
    const {
      title,
      description,
      image,
      bodyMarkdown,
      language,
      tags
    } = context.state.story;

    const { generateAudio } = payload;
    const newStory = await storiesApi.storiesCreate({
      title: title,
      description: description,
      body_markdown: bodyMarkdown,
      language: language,
      tags: tags
    });
    if (image && typeof image !== "string") {
      await storiesApi.storiesChangeImage(newStory.slug, image);
    }

    if (newStory.slug && generateAudio) {
      context.dispatch(STORY_AUDIO_CREATE, newStory.slug);
    }
    const data = await storiesApi.storiesRead(newStory.slug);
    context.dispatch(STORY_RESET_STATE);
    return data;
  },
  [STORY_DELETE](context, payload) {
    return storiesApi.storiesDelete(payload.slug);
  },
  async [STORY_EDIT](context, payload) {
    const { story, generateAudio, image } = payload;

    if (image && typeof image !== "string") {
      await storiesApi.storiesChangeImage(story.slug, image);
    }

    if (story.slug && generateAudio) {
      context.dispatch(STORY_AUDIO_CREATE, story.slug);
    }
    const data = await storiesApi.storiesPartialUpdate(story.slug, {
      title: story.title,
      description: story.description,
      body_markdown: story.bodyMarkdown,
      language: story.language,
      tags: story.tags
    });
    return data;
  },
  [TAG_STORY_EDIT_CREATE](context, tag) {
    context.commit(TAG_CREATE, tag);
  },
  [TAG_STORY_EDIT_DELETE](context, tag) {
    context.commit(TAG_DELETE, tag);
  },
  [STORY_RESET_STATE](context) {
    context.commit(RESET_STATE);
  },
  async [STORY_AUDIO_CREATE](context, slug) {
    const data = await storiesApi.storiesMakeAudio(slug, {});
    context.commit(SET_AUDIO, data);
    return data;
  }
};

/* eslint no-param-reassign: ["error", { "props": false }] */
export const mutations = {
  [SET_STORY](state, data) {
    state.story = data;
  },
  [SET_STORY_PRIVATE](state, data) {
    state.story.bodyMarkdown = data.bodyMarkdown;
  },
  [SET_AUDIO](state, data) {
    state.storyAudio = data;
  },
  [TAG_CREATE](state, tag) {
    if (state.story.tags.indexOf(tag) === -1) {
      state.story.tags = state.story.tags.concat([tag]);
    }
  },
  [TAG_DELETE](state, tag) {
    state.story.tags = state.story.tags.filter((t) => t !== tag);
  },
  [RESET_STATE](state) {
    for (const f in state) {
      Vue.set(state, f, initialState[f]);
    }
  }
};

export default {
  state,
  actions,
  mutations,
  getters
};

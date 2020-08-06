import Vue from "vue";
import { StoriesApi } from "../client";

import {
  FETCH_STORY,
  FETCH_COMMENTS,
  COMMENT_CREATE,
  COMMENT_DESTROY,
  FAVORITE_ADD,
  FAVORITE_REMOVE,
  STORY_PUBLISH,
  STORY_EDIT,
  STORY_EDIT_ADD_TAG,
  STORY_EDIT_REMOVE_TAG,
  STORY_DELETE,
  STORY_RESET_STATE
} from "./actions.type.js";
import {
  RESET_STATE,
  SET_STORY,
  SET_COMMENTS,
  TAG_ADD,
  TAG_REMOVE,
  UPDATE_STORY_IN_LIST
} from "./mutations.type.js";

const storiesApi = new StoriesApi();
const initialState = {
  story: {
    slug: "",
    author: {},
    title: "",
    description: "",
    image: "",
    body: "",
    language: "",
    favoritesCount: "",
    createdAt: "",
    updatedAt: "",
    bodyMarkdown: "",
    tags: []
  },
  comments: []
};

export const state = { ...initialState };

export const actions = {
  async [FETCH_STORY](context, storySlug, prevStory) {
    // avoid extraneous network call if story exists
    if (prevStory !== undefined) {
      return context.commit(SET_STORY, prevStory);
    }
    const data = await storiesApi.storiesRead(storySlug);
    context.commit(SET_STORY, data);
    return data;
  },
  async [FETCH_COMMENTS](context, storySlug) {
    const data = await storiesApi.storiesCommentsList(storySlug);
    context.commit(SET_COMMENTS, data.results);
    return data;
  },
  async [COMMENT_CREATE](context, payload) {
    await storiesApi.storiesCommentsCreate(payload.slug, {
      body: payload.comment
    });
    context.dispatch(FETCH_COMMENTS, payload.slug);
  },
  async [COMMENT_DESTROY](context, payload) {
    await storiesApi.storiesCommentsDelete(payload.slug, payload.commentId);
    context.dispatch(FETCH_COMMENTS, payload.slug);
  },
  async [FAVORITE_ADD](context, slug) {
    const data = await storiesApi.storiesFavorite(slug, {});
    context.commit(UPDATE_STORY_IN_LIST, data, { root: true });
    context.commit(SET_STORY, data);
  },
  async [FAVORITE_REMOVE](context, slug) {
    const data = await storiesApi.storiesUnfavorite(slug, {});
    // Update list as well. This allows us to favorite an story in the Home view.
    context.commit(UPDATE_STORY_IN_LIST, data, { root: true });
    context.commit(SET_STORY, data);
  },
  [STORY_PUBLISH]({ state }) {
    return storiesApi.storiesCreate(state.story);
  },
  [STORY_DELETE](context, slug) {
    return storiesApi.storiesDelete(slug);
  },
  [STORY_EDIT]({ state }) {
    return storiesApi.storiesPartialUpdate(state.story.slug, state.story);
  },
  [STORY_EDIT_ADD_TAG](context, tag) {
    context.commit(TAG_ADD, tag);
  },
  [STORY_EDIT_REMOVE_TAG](context, tag) {
    context.commit(TAG_REMOVE, tag);
  },
  [STORY_RESET_STATE]({ commit }) {
    commit(RESET_STATE);
  }
};

/* eslint no-param-reassign: ["error", { "props": false }] */
export const mutations = {
  [SET_STORY](state, story) {
    state.story = story;
  },
  [SET_COMMENTS](state, comments) {
    state.comments = comments;
  },
  [TAG_ADD](state, tag) {
    if (state.story.tags.indexOf(tag) === -1) {
      state.story.tags = state.story.tags.concat([tag]);
    }
  },
  [TAG_REMOVE](state, tag) {
    state.story.tags = state.story.tags.filter(t => t !== tag);
  },
  [RESET_STATE]() {
    for (const f in state) {
      Vue.set(state, f, initialState[f]);
    }
  }
};

const getters = {
  story(state) {
    return state.story;
  },
  comments(state) {
    return state.comments;
  }
};

export default {
  state,
  actions,
  mutations,
  getters
};

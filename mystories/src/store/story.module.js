import Vue from "vue";
import { StoriesApi } from "../client";

import {
  FETCH_STORY_PRIVATE,
  FETCH_STORY,
  FETCH_COMMENTS,
  COMMENT_CREATE,
  COMMENT_DELETE,
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
  SET_COMMENTS,
  TAG_CREATE,
  TAG_DELETE,
  UPDATE_STORY_IN_LIST,
  SET_COMMENTS_START,
  SET_AUDIO
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
  storyAudio: null,
  comments: [],
  commentsCount: 0,
  isCommentsLoading: true
};
const getters = {
  story(state) {
    return state.story;
  },
  storyAudio() {
    return state.storyAudio;
  },
  commentsCount(state) {
    return state.commentsCount;
  },
  comments(state) {
    return state.comments;
  },
  isCommentsLoading(state) {
    return state.isCommentsLoading;
  }
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
  async [FETCH_STORY_PRIVATE](context, payload) {
    const data = await storiesApi.storiesGetBodyMarkdown(payload.slug);
    return data;
  },
  async [FETCH_STORY_AUDIO](context, storySlug) {
    const data = await storiesApi.storiesGetAudio(storySlug);
    context.commit(SET_AUDIO, data);
    return data;
  },
  async [FETCH_COMMENTS](context, payload) {
    context.commit(SET_COMMENTS_START);
    const data = await storiesApi.storiesCommentsList(payload);
    context.commit(SET_COMMENTS, data);
    return data;
  },
  async [COMMENT_CREATE](context, payload) {
    await storiesApi.storiesCommentsCreate(payload.slug, {
      body: payload.comment
    });
    context.dispatch(FETCH_COMMENTS, payload.slug);
  },
  async [COMMENT_DELETE](context, payload) {
    await storiesApi.storiesCommentsDelete(payload.commentId, payload.slug);
    context.dispatch(FETCH_COMMENTS, payload.slug);
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
      console.log(generateAudio);
      context.dispatch(STORY_AUDIO_CREATE, newStory.slug);
    }
    const data = await storiesApi.storiesRead(newStory.slug);
    context.dispatch(STORY_RESET_STATE, newStory.slug);
    return data;
  },
  [STORY_DELETE](context, slug) {
    console.log(context);
    return storiesApi.storiesDelete(slug);
  },
  [STORY_EDIT]({ state }) {
    return storiesApi.storiesPartialUpdate(state.story.slug, state.story);
  },
  [TAG_STORY_EDIT_CREATE](context, tag) {
    context.commit(TAG_CREATE, tag);
  },
  [TAG_STORY_EDIT_DELETE](context, tag) {
    context.commit(TAG_DELETE, tag);
  },
  [STORY_RESET_STATE]({ commit }) {
    commit(RESET_STATE);
  },
  async [STORY_AUDIO_CREATE](context, slug) {
    const data = await storiesApi.storiesMakeAudio(slug, {});
    context.commit(SET_AUDIO, data);
    return data;
  }
};

/* eslint no-param-reassign: ["error", { "props": false }] */
export const mutations = {
  [SET_COMMENTS_START](state) {
    state.isCommentsLoading = true;
  },
  [SET_STORY](state, story) {
    state.story = story;
  },
  [SET_COMMENTS](state, data) {
    state.comments = data.results;
    state.commentsCount = data.count;
    state.isCommentsLoading = false;
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
    state.story.tags = state.story.tags.filter(t => t !== tag);
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

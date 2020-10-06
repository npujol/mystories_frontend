import { StoriesApi } from "../client";

import { FETCH_STORY, FETCH_COMMENTS } from "./actions.type.js";
import { SET_STORY, SET_COMMENTS } from "./mutations.type.js";

const storiesApi = new StoriesApi();

export const state = {
  story: {},
  comments: []
};

export const actions = {
  [FETCH_STORY](context, storySlug) {
    return storiesApi
      .storiesRead(storySlug)
      .then(data => {
        context.commit(SET_STORY, data);
      })
      .catch(error => {
        throw new Error(error);
      });
  },
  [FETCH_COMMENTS](context, storySlug) {
    return storiesApi
      .storiesCommentsRead(storySlug)
      .then(data => {
        context.commit(SET_COMMENTS, data);
      })
      .catch(error => {
        throw new Error(error);
      });
  }
};

/* eslint no-param-reassign: ["error", { "props": false }] */
export const mutations = {
  [SET_STORY](state, story) {
    state.story = story;
  },
  [SET_COMMENTS](state, comments) {
    state.comments = comments;
  }
};

export default {
  state,
  actions,
  mutations
};

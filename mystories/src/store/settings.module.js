import { StoriesApi } from "../client";

import { FETCH_HISTORY, FETCH_COMMENTS } from "./actions.type.js";
import { SET_HISTORY, SET_COMMENTS } from "./mutations.type.js";

const storiesApi = new StoriesApi();

export const state = {
  story: {},
  comments: []
};

export const actions = {
  [FETCH_HISTORY](context, storySlug) {
    return storiesApi
      .storiesRead(storySlug)
      .then(data => {
        context.commit(SET_HISTORY, data);
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
  [SET_HISTORY](state, story) {
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

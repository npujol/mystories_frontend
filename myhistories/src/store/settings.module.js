import { HistoriesApi } from "../client";
import JwtService from "@/common/jwt.service";

import { FETCH_HISTORY, FETCH_COMMENTS } from "./actions.type.js";
import { SET_HISTORY, SET_COMMENTS } from "./mutations.type.js";

const historiesApi = new HistoriesApi();

export const state = {
  history: {},
  comments: []
};

export const actions = {
  [FETCH_HISTORY](context, historySlug) {
    JwtService.setHeader();
    return historiesApi
      .historiesRead(historySlug)
      .then(data => {
        context.commit(SET_HISTORY, data);
      })
      .catch(error => {
        throw new Error(error);
      });
  },
  [FETCH_COMMENTS](context, historySlug) {
    JwtService.setHeader();
    return historiesApi
      .historiesCommentsRead(historySlug)
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
  [SET_HISTORY](state, history) {
    state.history = history;
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

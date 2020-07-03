import { HistoriesService, CommentsService } from "@/common/api.service.js";
import { FETCH_HISTORY, FETCH_COMMENTS } from "./actions.type.js";
import { SET_HISTORY, SET_COMMENTS } from "./mutations.type.js";

export const state = {
  history: {},
  comments: []
};

export const actions = {
  [FETCH_HISTORY](context, historySlug) {
    return HistoriesService.get(historySlug)
      .then(({ data }) => {
        context.commit(SET_HISTORY, data.history);
      })
      .catch(error => {
        throw new Error(error);
      });
  },
  [FETCH_COMMENTS](context, historySlug) {
    return CommentsService.get(historySlug)
      .then(({ data }) => {
        context.commit(SET_COMMENTS, data.comments);
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

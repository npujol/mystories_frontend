import Vue from "vue";
import {
  HistoryService,
  CommentsService,
  FavoriteService
} from "@/common/api.service.js";
import {
  FETCH_HISTORY,
  FETCH_COMMENTS,
  COMMENT_CREATE,
  COMMENT_DESTROY,
  FAVORITE_ADD,
  FAVORITE_REMOVE,
  HISTORY_PUBLISH,
  HISTORY_EDIT,
  HISTORY_EDIT_ADD_TAG,
  HISTORY_EDIT_REMOVE_TAG,
  HISTORY_DELETE,
  HISTORY_RESET_STATE
} from "./actions.type.js";
import {
  RESET_STATE,
  SET_HISTORY,
  SET_COMMENTS,
  TAG_ADD,
  TAG_REMOVE,
  UPDATE_HISTORY_IN_LIST
} from "./mutations.type.js";

const initialState = {
  history: {
    author: {},
    title: "",
    description: "",
    body: "",
    tagList: []
  },
  comments: []
};

export const state = { ...initialState };

export const actions = {
  async [FETCH_HISTORY](context, historySlug, prevHistory) {
    // avoid extraneous network call if history exists
    if (prevHistory !== undefined) {
      return context.commit(SET_HISTORY, prevHistory);
    }
    const { data } = await HistoryService.get(historySlug);
    context.commit(SET_HISTORY, data.history);
    return data;
  },
  async [FETCH_COMMENTS](context, historySlug) {
    const { data } = await CommentsService.get(historySlug);
    context.commit(SET_COMMENTS, data.comments);
    return data.comments;
  },
  async [COMMENT_CREATE](context, payload) {
    await CommentsService.post(payload.slug, payload.comment);
    context.dispatch(FETCH_COMMENTS, payload.slug);
  },
  async [COMMENT_DESTROY](context, payload) {
    await CommentsService.destroy(payload.slug, payload.commentId);
    context.dispatch(FETCH_COMMENTS, payload.slug);
  },
  async [FAVORITE_ADD](context, slug) {
    const { data } = await FavoriteService.add(slug);
    context.commit(UPDATE_HISTORY_IN_LIST, data.history, { root: true });
    context.commit(SET_HISTORY, data.history);
  },
  async [FAVORITE_REMOVE](context, slug) {
    const { data } = await FavoriteService.remove(slug);
    // Update list as well. This allows us to favorite an history in the Home view.
    context.commit(UPDATE_HISTORY_IN_LIST, data.history, { root: true });
    context.commit(SET_HISTORY, data.history);
  },
  [HISTORY_PUBLISH]({ state }) {
    return HistoryService.create(state.history);
  },
  [HISTORY_DELETE](context, slug) {
    return HistoryService.destroy(slug);
  },
  [HISTORY_EDIT]({ state }) {
    return HistoryService.update(state.history.slug, state.history);
  },
  [HISTORY_EDIT_ADD_TAG](context, tag) {
    context.commit(TAG_ADD, tag);
  },
  [HISTORY_EDIT_REMOVE_TAG](context, tag) {
    context.commit(TAG_REMOVE, tag);
  },
  [HISTORY_RESET_STATE]({ commit }) {
    commit(RESET_STATE);
  }
};

/* eslint no-param-reassign: ["error", { "props": false }] */
export const mutations = {
  [SET_HISTORY](state, history) {
    state.history = history;
  },
  [SET_COMMENTS](state, comments) {
    state.comments = comments;
  },
  [TAG_ADD](state, tag) {
    state.history.tagList = state.history.tagList.concat([tag]);
  },
  [TAG_REMOVE](state, tag) {
    state.history.tagList = state.history.tagList.filter(t => t !== tag);
  },
  [RESET_STATE]() {
    for (const f in state) {
      Vue.set(state, f, initialState[f]);
    }
  }
};

const getters = {
  history(state) {
    return state.history;
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

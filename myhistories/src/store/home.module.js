import { TagsApi, HistoriesApi } from "../client";
import { FETCH_HISTORIES, FETCH_TAGS } from "./actions.type.js";
import {
  FETCH_START,
  FETCH_END,
  SET_TAGS,
  UPDATE_HISTORY_IN_LIST
} from "./mutations.type.js";

const historiesApi = new HistoriesApi();
const tagsApi = new TagsApi();

const state = {
  tags: [],
  histories: [],
  isLoading: true,
  historiesCount: 0
};

const getters = {
  historiesCount(state) {
    return state.historiesCount;
  },
  histories(state) {
    return state.histories;
  },
  isLoading(state) {
    return state.isLoading;
  },
  tags(state) {
    return state.tags;
  }
};

const actions = {
  [FETCH_HISTORIES]({ commit }) {
    commit(FETCH_START);
    return historiesApi
      .historiesFeedList()
      .then(data => {
        commit(FETCH_END, data);
      })
      .catch(error => {
        throw new Error(error);
      });
  },
  [FETCH_TAGS]({ commit }) {
    return tagsApi
      .tagsList()
      .then(data => {
        commit(SET_TAGS, data);
      })
      .catch(error => {
        throw new Error(error);
      });
  }
};

/* eslint no-param-reassign: ["error", { "props": false }] */
const mutations = {
  [FETCH_START](state) {
    state.isLoading = true;
  },
  [FETCH_END](state, data) {
    state.histories = data.results;
    state.historiesCount = data.count;
    state.isLoading = false;
  },
  [SET_TAGS](state, data) {
    state.tags = data.results;
  },
  [UPDATE_HISTORY_IN_LIST](state, data) {
    state.histories = state.histories.map(history => {
      if (history.slug !== data.slug) {
        return history;
      }
      // We could just return data, but it seems dangerous to
      // mix the results of different api calls, so we
      // protect ourselves by copying the information.
      history.favorited = data.favorited;
      history.favoritesCount = data.favoritesCount;
      return history;
    });
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};

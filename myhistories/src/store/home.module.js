import { TagsService, HistoryService } from "../common/api.service.js";
import { FETCH_HISTORIES, FETCH_TAGS } from "./actions.type.js";
import {
  FETCH_START,
  FETCH_END,
  SET_TAGS,
  UPDATE_HISTORY_IN_LIST
} from "./mutations.type.js";

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
  [FETCH_HISTORIES]({ commit }, params) {
    commit(FETCH_START);
    return HistoryService.query(params.type, params.filters)
      .then(({ data }) => {
        commit(FETCH_END, data);
      })
      .catch(error => {
        throw new Error(error);
      });
  },
  [FETCH_TAGS]({ commit }) {
    return TagsService.get()
      .then(({ data }) => {
        commit(SET_TAGS, data.tags);
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
  [FETCH_END](state, { histories, historiesCount }) {
    state.histories = histories;
    state.historiesCount = historiesCount;
    state.isLoading = false;
  },
  [SET_TAGS](state, tags) {
    state.tags = tags;
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

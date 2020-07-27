import { TagsApi, StoriesApi } from "../client";
import { FETCH_HISTORIES, FETCH_TAGS } from "./actions.type.js";
import {
  FETCH_START,
  FETCH_END,
  SET_TAGS,
  UPDATE_HISTORY_IN_LIST
} from "./mutations.type.js";

const storiesApi = new StoriesApi();
const tagsApi = new TagsApi();

const state = {
  tags: [],
  stories: [],
  isLoading: true,
  storiesCount: 0
};

const getters = {
  storiesCount(state) {
    return state.storiesCount;
  },
  stories(state) {
    return state.stories;
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
    return storiesApi
      .storiesFeedList()
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
    state.stories = data.results;
    state.storiesCount = data.count;
    state.isLoading = false;
  },
  [SET_TAGS](state, data) {
    state.tags = data.results;
  },
  [UPDATE_HISTORY_IN_LIST](state, data) {
    state.stories = state.stories.map(story => {
      if (story.slug !== data.slug) {
        return story;
      }
      // We could just return data, but it seems dangerous to
      // mix the results of different api calls, so we
      // protect ourselves by copying the information.
      story.favorited = data.favorited;
      story.favoritesCount = data.favoritesCount;
      return story;
    });
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};

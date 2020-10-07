import { TagsApi, StoriesApi, NotificationsApi } from "../client";
import {
  FETCH_STORIES,
  FETCH_TAGS,
  FETCH_NEW_MESSAGES_COUNT,
  FETCH_MESSAGES
} from "./actions.type.js";
import {
  FETCH_START,
  FETCH_END,
  SET_TAGS,
  UPDATE_STORY_IN_LIST,
  SET_MESSAGES
} from "./mutations.type.js";

const storiesApi = new StoriesApi();
const tagsApi = new TagsApi();
const notificationApi = new NotificationsApi();

const state = {
  tags: [],
  stories: [],
  isLoading: true,
  storiesCount: 0,
  limit: 10,
  tag: null,
  messages: []
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
  },
  limit(state) {
    return state.limit;
  },
  tag(state) {
    return state.tag;
  },
  messages(state) {
    return state.messages;
  }
};

const actions = {
  async [FETCH_STORIES]({ commit }, params) {
    commit(FETCH_START);
    const data = await storiesApi.storiesList(params.filters);
    commit(FETCH_END, data);
    return data;
  },
  async [FETCH_TAGS]({ commit }) {
    const data = await tagsApi.tagsList();
    commit(SET_TAGS, data);
    return data;
  },
  async [FETCH_TAGS]({ commit }) {
    const data = await tagsApi.tagsList();
    commit(SET_TAGS, data);
    return data;
  },
  async [FETCH_MESSAGES]({ commit }) {
    const data = await notificationApi.notificationsList();
    commit(SET_MESSAGES, data);
    return data;
  },
  async [FETCH_NEW_MESSAGES_COUNT]() {
    var message_count = 0;
    const data = await notificationApi.notificationsList();
    if (state.messages.length === 0) {
      message_count = data.count;
    }
    return message_count;
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
  [SET_MESSAGES](state, data) {
    state.messages = data.results;
  },
  [UPDATE_STORY_IN_LIST](state, data) {
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

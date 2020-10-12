import { TagsApi, StoriesApi } from "../client";
import { FETCH_STORIES, FETCH_TAGS } from "./actions.type.js";
import {
  FETCH_START,
  FETCH_END,
  SET_TAGS,
  UPDATE_STORY_IN_LIST
} from "./mutations.type.js";

const storiesApi = new StoriesApi();
const tagsApi = new TagsApi();

const state = {
  tags: [],
  stories: [],
  isLoading: true,
  storiesCount: 0,
  limit: 10,
  tag: null
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
  }
};

const actions = {
  async [FETCH_STORIES](context, payload) {
    context.commit(FETCH_START);
    const data = await storiesApi.storiesList(payload.filters);
    context.commit(FETCH_END, data);
    return data;
  },
  async [FETCH_TAGS](context) {
    const data = await tagsApi.tagsList();
    context.commit(SET_TAGS, data);
    return data;
  },
  async [FETCH_TAGS](context) {
    const data = await tagsApi.tagsList();
    context.commit(SET_TAGS, data);
    return data;
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

import { StoriesApi } from "../client";

import {
  FETCH_COMMENTS,
  COMMENT_CREATE,
  COMMENT_DELETE
} from "./actions.type.js";
import { SET_COMMENTS, SET_COMMENTS_START } from "./mutations.type.js";

const storiesApi = new StoriesApi();
export const state = {
  comments: [],
  commentsCount: 0,
  isCommentsLoading: true
};
const getters = {
  commentsCount(state) {
    return state.commentsCount;
  },
  comments(state) {
    return state.comments;
  },
  isCommentsLoading(state) {
    return state.isCommentsLoading;
  }
};

export const actions = {
  async [FETCH_COMMENTS](context, payload) {
    context.commit(SET_COMMENTS_START);
    const data = await storiesApi.storiesCommentsList(payload.slugStory);
    context.commit(SET_COMMENTS, data);
    return data;
  },
  async [COMMENT_CREATE](context, payload) {
    const data = await storiesApi.storiesCommentsCreate(payload.slugStory, {
      body: payload.comment
    });
    context.dispatch(FETCH_COMMENTS, { slugStory: payload.slugStory });
    return data;
  },
  async [COMMENT_DELETE](context, payload) {
    await storiesApi.storiesCommentsDelete(
      payload.commentId,
      payload.slugStory
    );
    context.dispatch(FETCH_COMMENTS, { slugStory: payload.slugStory });
  }
};

export const mutations = {
  [SET_COMMENTS_START](state) {
    state.isCommentsLoading = true;
  },
  [SET_COMMENTS](state, data) {
    state.comments = data.results;
    state.commentsCount = data.count;
    state.isCommentsLoading = false;
  }
};

export default {
  state,
  actions,
  mutations,
  getters
};

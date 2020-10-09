import { NotificationsApi } from "../client";

import {
  FETCH_NEW_MESSAGES_COUNT,
  FETCH_MESSAGE,
  FETCH_MESSAGES,
  OPEN_MESSAGE,
  MESSAGE_DESTROY
} from "./actions.type.js";
import { SET_MESSAGES, SET_MESSAGE, SET_ERROR } from "./mutations.type.js";

const notificationsApi = new NotificationsApi();
const state = {
  errors: [],
  messages: []
};

const getters = {
  messages(state) {
    return state.messages;
  },
  errors(state) {
    return state.errors;
  }
};

const actions = {
  async [FETCH_MESSAGE](context, pk) {
    const data = await notificationsApi.notificationsRead(pk);
    context.commit(SET_MESSAGE, data);
    return data;
  },
  async [FETCH_MESSAGES]({ commit }) {
    const data = await notificationsApi.notificationsList();
    commit(SET_MESSAGES, data);
    return data;
  },
  async [FETCH_NEW_MESSAGES_COUNT]() {
    var message_count = 0;
    const data = await notificationsApi.notificationsList();
    if (state.messages.length === 0) {
      message_count = data.count;
    }
    return message_count;
  },
  async [OPEN_MESSAGE](context, payload) {
    try {
      const data = await notificationsApi.notificationsOpenedStatus(
        payload.pk,
        payload.opened
      );
      context.commit(SET_MESSAGE, data);
      return data;
    } catch (e) {
      // #todo SET_ERROR cannot work in multiple states
      context.commit(SET_ERROR, "e");
    }
  },
  async [MESSAGE_DESTROY](context, payload) {
    try {
      await notificationsApi.notificationsDelete(payload.pk);
      context.commit(FETCH_MESSAGES);
      return;
    } catch (e) {
      // #todo SET_ERROR cannot work in multiple states
      console.log(e);
      context.commit(SET_ERROR, JSON.parse(e.response.text).errors);
    }
  }
};

const mutations = {
  [SET_ERROR](state, error) {
    state.errors = error;
  },
  [SET_MESSAGE](state, data) {
    state.currentMessage = data;
  },
  [SET_MESSAGES](state, data) {
    state.messages = data.results;
  }
};

export default {
  state,
  actions,
  mutations,
  getters
};

import { NotificationsApi } from "../client";

import {
  FETCH_NEW_MESSAGES_COUNT,
  FETCH_MESSAGE,
  FETCH_MESSAGES,
  MESSAGE_OPEN,
  MESSAGE_DELETE
} from "./actions.type.js";
import { SET_MESSAGES, SET_MESSAGE_COUNT } from "./mutations.type.js";

const notificationsApi = new NotificationsApi();
const state = {
  messages: [],
  countNewMessages: 0
};

const getters = {
  messages(state) {
    return state.messages;
  },
  countNewMessages(state) {
    return state.countNewMessages;
  }
};

const actions = {
  async [FETCH_MESSAGE](context, payload) {
    const data = await notificationsApi.notificationsRead(payload);
    context.commit(SET_MESSAGE, data);
    return data;
  },
  async [FETCH_MESSAGES](context) {
    const data = await notificationsApi.notificationsList();
    context.commit(SET_MESSAGES, data);
    context.dispatch(FETCH_NEW_MESSAGES_COUNT);
    return data;
  },
  async [FETCH_NEW_MESSAGES_COUNT](context) {
    var message_count = 0;
    const data = await notificationsApi.notificationsList();
    if (state.messages.length === 0) {
      message_count = data.count;
    }
    context.commit(SET_MESSAGE_COUNT, message_count);
    return message_count;
  },
  async [MESSAGE_OPEN](context, payload) {
    const data = await notificationsApi.notificationsOpenedStatus(
      payload.pk,
      payload.opened
    );
    context.commit(SET_MESSAGE, data);
    return data;
  },
  async [MESSAGE_DELETE](context, payload) {
    await notificationsApi.notificationsDelete(payload.pk);
    context.dispatch(FETCH_MESSAGES);
    return;
  }
};

const mutations = {
  [SET_MESSAGE_COUNT](state, data) {
    state.countNewMessages = data;
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

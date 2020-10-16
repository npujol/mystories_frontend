import { NotificationsApi } from "../client";

import {
  FETCH_NEW_MESSAGES_COUNT,
  FETCH_MESSAGE,
  FETCH_MESSAGES,
  MESSAGE_OPEN,
  MESSAGE_DELETE,
  FETCH_OPENED_MESSAGES
} from "./actions.type.js";
import {
  SET_MESSAGES,
  SET_MESSAGE,
  SET_MESSAGE_COUNT
} from "./mutations.type.js";

const notificationsApi = new NotificationsApi();
const state = {
  messages: [],
  countNewMessages: 0,
  countMessages: 0,
  isMessagesLoading: true,
  message: null
};

const getters = {
  messages(state) {
    return state.messages;
  },
  message(state) {
    return state.message;
  },
  countNewMessages(state) {
    return state.countNewMessages;
  },
  isMessagesLoading(state) {
    return state.isMessagesLoading;
  },
  countMessages(state) {
    return state.countMessages;
  }
};

const actions = {
  async [FETCH_MESSAGE](context, payload) {
    const data = await notificationsApi.notificationsRead(payload);
    context.commit(SET_MESSAGE, data);
    return data;
  },
  async [FETCH_MESSAGES](context, payload) {
    const data = await notificationsApi.notificationsList(payload);
    context.commit(SET_MESSAGES, data);
    return data;
  },
  async [FETCH_OPENED_MESSAGES](context) {
    const data = await notificationsApi.notificationsList(true);
    context.dispatch(FETCH_NEW_MESSAGES_COUNT);
    return data;
  },
  [FETCH_NEW_MESSAGES_COUNT](context, data) {
    var message_count = 0;
    if (state.messages.length !== 0 && data) {
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
    state.countMessages = data.count;
    state.isMessagesLoading = false;
  },
  [SET_MESSAGE](state, data) {
    state.message = data.results;
  }
};

export default {
  state,
  actions,
  mutations,
  getters
};

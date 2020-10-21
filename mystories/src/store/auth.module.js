import { AuthApi, UsersApi } from "../client";
import JwtService from "@/common/jwt.service";

import { LOGIN, LOGOUT, REGISTER, CHECK_AUTH } from "./actions.type.js";
import {
  SET_AUTH,
  PURGE_AUTH,
  SET_ERROR,
  SET_USER,
  RESET_PROFILE
} from "./mutations.type.js";

const authApi = new AuthApi();
const usersApi = new UsersApi();

const state = {
  errors: null,
  user: {},
  isAuthenticated: !!JwtService.getToken()
};

const getters = {
  currentUser(state) {
    return state.user;
  },
  isAuthenticated(state) {
    return state.isAuthenticated;
  },
  errors(state) {
    return state.errors;
  }
};

const actions = {
  [LOGIN](context, payload) {
    return new Promise(resolve => {
      authApi
        .authLoginCreate(payload)
        .then(data => {
          context.commit(SET_AUTH, data);
          resolve(data);
        })
        .catch(response => {
          if (response.response.text) {
            var errors = JSON.parse(response.response.text).errors;
          } else {
            var errors = { error: { 0: "There is a connection problem" } };
          }
          context.commit(SET_ERROR, errors);
        });
    });
  },
  [LOGOUT](context) {
    context.commit(PURGE_AUTH);
    context.commit(RESET_PROFILE);
  },
  [REGISTER](context, payload) {
    return new Promise((resolve, reject) => {
      authApi
        .authRegistrationCreate(payload)
        .then(data => {
          context.commit(SET_AUTH, data);
          resolve(data);
        })
        .catch(response => {
          if (response.response.text) {
            var errors = JSON.parse(response.response.text).errors;
          } else {
            var errors = { error: { 0: "There is a connection problem" } };
          }
          context.commit(SET_ERROR, errors);
          reject(response);
        });
    });
  },
  async [CHECK_AUTH](context) {
    if (JwtService.getToken()) {
      try {
        JwtService.setHeader();
        const data = await usersApi.usersRead(JwtService.getUsername());
        context.commit(SET_USER, data);
      } catch (error) {
        console.log(error);
        context.commit(SET_ERROR, error);
      }
    } else {
      context.commit(PURGE_AUTH);
    }
  }
};

const mutations = {
  [SET_ERROR](state, errors) {
    state.errors = errors;
  },
  [SET_AUTH](state, user) {
    state.isAuthenticated = true;
    state.user = user;
    state.errors = null;
    JwtService.saveCredentials(user.username, user.token);
  },
  [SET_USER](state, user) {
    state.isAuthenticated = true;
    state.user = user;
    state.errors = null;
  },
  [PURGE_AUTH](state) {
    state.isAuthenticated = false;
    state.user = {};
    state.errors = null;
    JwtService.destroyCredentials();
  }
};

export default {
  state,
  actions,
  mutations,
  getters
};

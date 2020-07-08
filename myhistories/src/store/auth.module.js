import { AuthApi, UsersApi, ProfilesApi } from "../client";
import JwtService from "@/common/jwt.service";

import {
  LOGIN,
  LOGOUT,
  REGISTER,
  CHECK_AUTH,
  UPDATE_USER
} from "./actions.type.js";
import { SET_AUTH, PURGE_AUTH, SET_ERROR } from "./mutations.type.js";

const authApi = new AuthApi();
const usersApi = new UsersApi();
const profilesApi = new ProfilesApi();

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
  }
};

const actions = {
  [LOGIN](context, credentials) {
    return new Promise(resolve => {
      authApi
        .authLoginCreate(credentials)
        .then(data => {
          context.commit(SET_AUTH, data);
          resolve(data);
        })
        .catch(response => {
          context.commit(SET_ERROR, response.errors);
        });
    });
  },
  [LOGOUT](context) {
    context.commit(PURGE_AUTH);
  },
  [REGISTER](context, credentials) {
    return new Promise((resolve, reject) => {
      authApi
        .authRegistrationCreate(credentials)
        .then(data => {
          context.commit(SET_AUTH, data);
          resolve(data);
        })
        .catch(response => {
          context.commit(SET_ERROR, response.errors);
          reject(response);
        });
    });
  },
  [CHECK_AUTH](context) {
    if (JwtService.getToken()) {
      JwtService.setHeader();
      usersApi
        .usersRead(JwtService.getUsername())
        .then(data => {
          context.commit(SET_AUTH, data);
        })
        .catch(response => {
          context.commit(SET_ERROR, response.errors);
        });
    } else {
      context.commit(PURGE_AUTH);
    }
  },
  [UPDATE_USER](context, payload) {
    const { email, username, password, image, bio } = payload;
    const user = {
      email,
      username,
      bio,
      image
    };
    if (password) {
      user.password = password;
    }
    JwtService.setHeader();
    return usersApi.usersPartialUpdate(user.username, user).then(data => {
      context.commit(SET_AUTH, data);
      return data;
    });
  }
};

const mutations = {
  [SET_ERROR](state, error) {
    state.errors = error;
  },
  [SET_AUTH](state, user) {
    state.isAuthenticated = true;
    state.user = user;
    state.errors = {};
    JwtService.saveCredentials(state.user.username, state.user.token);
  },
  [PURGE_AUTH](state) {
    state.isAuthenticated = false;
    state.user = {};
    state.errors = {};
    JwtService.destroyCredentials();
  }
};

export default {
  state,
  actions,
  mutations,
  getters
};

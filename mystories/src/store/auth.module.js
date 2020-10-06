import { AuthApi, UsersApi, ProfilesApi } from "../client";
import JwtService from "@/common/jwt.service";

import {
  LOGIN,
  LOGOUT,
  REGISTER,
  CHECK_AUTH,
  UPDATE_USER
} from "./actions.type.js";
import {
  SET_AUTH,
  PURGE_AUTH,
  SET_ERROR,
  SET_USER,
  SET_PROFILE
} from "./mutations.type.js";

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
          context.commit(SET_PROFILE, data.profile);
          resolve(data);
        })
        .catch(response => {
          context.commit(SET_ERROR, JSON.parse(response.response.text).errors);
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
          context.commit(SET_PROFILE, data.profile);
          resolve(data);
        })
        .catch(response => {
          context.commit(SET_ERROR, JSON.parse(response.response.text).errors);
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
          context.commit(SET_USER, data);
          context.commit(SET_PROFILE, data.profile);
        })
        .catch(response => {
          context.commit(SET_ERROR, response.errors);
        });
    } else {
      context.commit(PURGE_AUTH);
    }
  },
  async [UPDATE_USER](context, payload) {
    const { bio, image } = payload.profile;
    const username = payload.username;
    await profilesApi.profilesPartialUpdate(username, { bio });
    if (image && typeof image !== "string") {
      await profilesApi.profilesChangeImage(username, image);
    }
    const data = await usersApi.usersRead(username);
    context.commit(SET_USER, data);
    return data;
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
    JwtService.saveCredentials(user.username, user.token);
  },
  [SET_USER](state, user) {
    state.isAuthenticated = true;
    state.user = user;
    state.errors = {};
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

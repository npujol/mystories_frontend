import { ProfilesApi } from "../client";

import {
  FETCH_PROFILE,
  FETCH_PROFILE_FOLLOW,
  FETCH_PROFILE_UNFOLLOW
} from "./actions.type.js";
import { SET_PROFILE, SET_ERROR } from "./mutations.type.js";

const profilesApi = new ProfilesApi();
const state = {
  errors: {},
  profile: {}
};

const getters = {
  profile(state) {
    return state.profile;
  }
};

const actions = {
  [FETCH_PROFILE](context, payload) {
    const { username } = payload;
    return profilesApi
      .profilesRead(username)
      .then(data => {
        context.commit(SET_PROFILE, data);
        return data;
      })
      .catch(() => {
        // #todo SET_ERROR cannot work in multiple states
        context.commit(SET_ERROR, JSON.parse(response.response.text).errors);
      });
  },
  [FETCH_PROFILE_FOLLOW](context, payload) {
    const { username } = payload;
    return profilesApi
      .profilesFollowCreate(username, "")
      .then(data => {
        context.commit(SET_PROFILE, data);
        return data;
      })
      .catch(() => {
        // #todo SET_ERROR cannot work in multiple states
        context.commit(SET_ERROR, JSON.parse(response.response.text).errors);
      });
  },
  [FETCH_PROFILE_UNFOLLOW](context, payload) {
    const { username } = payload;
    return profilesApi
      .profilesFollowDelete(username, "")
      .then(data => {
        context.commit(SET_PROFILE, data);
        return data;
      })
      .catch(() => {
        // #todo SET_ERROR cannot work in multiple states
        context.commit(SET_ERROR, JSON.parse(response.response.text).errors);
      });
  }
};

const mutations = {
  [SET_ERROR](state, error) {
    state.errors = error;
  },
  [SET_PROFILE](state, profile) {
    state.profile = profile;
    state.errors = {};
  }
};

export default {
  state,
  actions,
  mutations,
  getters
};

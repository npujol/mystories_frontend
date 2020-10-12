import { ProfilesApi } from "../client";

import {
  FETCH_PROFILE,
  PROFILE_FOLLOW,
  PROFILE_UNFOLLOW
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
  async [FETCH_PROFILE](context, payload) {
    const { username } = payload;
    try {
      const data = await profilesApi.profilesRead(username);
      context.commit(SET_PROFILE, data);
      return data;
    } catch (e) {
      // #todo SET_ERROR cannot work in multiple states
      context.commit(SET_ERROR, JSON.parse(e.response.text).errors);
    }
  },
  async [PROFILE_FOLLOW](context, payload) {
    const { username } = payload;
    try {
      const data = await profilesApi.profilesFollowProfile(username, "");
      context.commit(SET_PROFILE, data);
      return data;
    } catch (e) {
      // #todo SET_ERROR cannot work in multiple states
      context.commit(SET_ERROR, "e");
    }
  },
  async [PROFILE_UNFOLLOW](context, payload) {
    const { username } = payload;
    try {
      const data = await profilesApi.profilesUnfollowProfile(username, "");
      context.commit(SET_PROFILE, data);
      return data;
    } catch (e) {
      // #todo SET_ERROR cannot work in multiple states
      context.commit(SET_ERROR, JSON.parse(e.response.text).errors);
    }
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

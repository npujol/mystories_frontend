import { ProfilesApi, UsersApi } from "../client";

import {
  FETCH_PROFILE,
  PROFILE_UPDATE,
  PROFILE_FOLLOW,
  PROFILE_UNFOLLOW
} from "./actions.type.js";
import {
  SET_PROFILE,
  SET_ERROR,
  RESET_PROFILE,
  SET_USER
} from "./mutations.type.js";

const profilesApi = new ProfilesApi();
const usersApi = new UsersApi();

const state = {
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
  async [PROFILE_UPDATE](context, payload) {
    const { bio } = payload.currentUser.profile;
    const image = payload.image;
    const username = payload.currentUser.username;
    await profilesApi.profilesPartialUpdate(username, { bio });
    if (image && typeof image !== "string") {
      await profilesApi.profilesChangeImage(username, image);
    }
    const data = await usersApi.usersRead(username);
    context.commit(SET_USER, data);
    return data;
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
  [SET_PROFILE](state, profile) {
    state.profile = profile;
    state.errors = {};
  },
  [RESET_PROFILE](state) {
    state.profile = {};
    state.errors = {};
  }
};

export default {
  state,
  actions,
  mutations,
  getters
};

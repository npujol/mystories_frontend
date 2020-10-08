import Vue from "vue";
import Vuex from "vuex";

import home from "./home.module.js";
import auth from "./auth.module.js";
import story from "./story.module.js";
import profile from "./profile.module.js";
import notifications from "./notifications.module.js"

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    home,
    auth,
    story,
    profile,
    notifications
  }
});

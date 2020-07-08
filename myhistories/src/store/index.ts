import Vue from "vue";
import Vuex from "vuex";

import home from "./home.module.js";
import auth from "./auth.module.js";
import history from "./history.module.js";
import profile from "./profile.module.js";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    home,
    auth,
    history,
    profile
  }
});

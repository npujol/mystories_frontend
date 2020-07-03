import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";

import { CHECK_AUTH } from "./store/actions.type.js";
import ApiService from "./common/api.service.js";
import DateFilter from "./common/date.filter.js";
import ErrorFilter from "./common/error.filter.js";

Vue.config.productionTip = false;
Vue.filter("date", DateFilter);
Vue.filter("error", ErrorFilter);

ApiService.init();

// Ensure we checked auth before each page load.
// router.beforeEach((to, from, next) => {
//   store.dispatch(CHECK_AUTH).then(next);
// });

router.beforeEach((to, from, next) =>
  Promise.all([store.dispatch(CHECK_AUTH)]).then(next));

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

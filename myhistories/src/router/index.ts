/** @format */

import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    component: () => import("../views/Home.vue"),
    children: [
      {
        path: "",
        name: "home",
        component: () => import("../views/HomeGlobal.vue")
      },
      {
        path: "/about",
        name: "About",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/About.vue")
      },
      {
        path: "my-feed",
        name: "home-my-feed",
        component: () => import("../views/HomeMyFeed.vue")
      },
      {
        path: "tag/:tag",
        name: "home-tag",
        component: () => import("../views/HomeTag.vue")
      }
    ]
  },
  {
    name: "login",
    path: "/login",
    component: () => import("../views/Login.vue")
  },
  {
    name: "register",
    path: "/register",
    component: () => import("../views/Register.vue")
  },
  {
    name: "settings",
    path: "/settings",
    component: () => import("../views/Settings.vue")
  },
  // Handle child routes with a default, by giving the name to the
  // child.
  // SO: https://github.com/vuejs/vue-router/issues/777
  {
    path: "/@:username",
    component: () => import("../views/Profile.vue"),
    children: [
      {
        path: "",
        name: "profile",
        component: () => import("../views/ProfileHistories.vue")
      },
      {
        name: "profile-favorites",
        path: "favorites",
        component: () => import("../views/ProfileFavorited.vue")
      }
    ]
  },
  {
    name: "history",
    path: "/histories/:slug",
    component: () => import("../views/History.vue"),
    props: true
  },
  {
    name: "history-edit",
    path: "/editor/:slug?",
    props: true,
    component: () => import("../views/HistoryEdit.vue")
  }
];

const router = new VueRouter({
  routes
});

export default router;

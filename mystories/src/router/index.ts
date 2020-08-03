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
        path: "my-feed/:author",
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
        component: () => import("../views/ProfileStories.vue")
      },
      {
        name: "profile-favorites",
        path: "favorites",
        component: () => import("../views/ProfileFavorited.vue")
      }
    ]
  },
  {
    name: "story",
    path: "/stories/:slug",
    component: () => import("../views/Story.vue"),
    props: true
  },
  {
    name: "story-edit",
    path: "/editor/:slug?",
    props: true,
    component: () => import("../views/StoryEdit.vue")
  }
];

const router = new VueRouter({
  routes
});

export default router;

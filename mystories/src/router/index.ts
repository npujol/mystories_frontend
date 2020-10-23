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
        path: "my-feed/:username",
        name: "home-my-feed",
        component: () => import("../views/HomeMyFeed.vue")
      },
      {
        path: "favorites/:username",
        name: "home-favorites",
        component: () => import("../views/HomeFavorites.vue")
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
    component: () => import("../views/AuthLoginView.vue")
  },
  {
    name: "register",
    path: "/register",
    component: () => import("../views/AuthRegisterView.vue")
  },
  {
    name: "settings",
    path: "/settings/:username",
    component: () => import("../views/ProfileEdit.vue")
  },
  {
    name: "notifications",
    path: "/notifications/:username",
    component: () => import("../views/NotificationsView.vue")
  },
  // Handle child routes with a default, by giving the name to the
  // child.
  // SO: https://github.com/vuejs/vue-router/issues/777
  {
    path: "/:username",
    component: () => import("../views/ProfileView.vue"),
    children: [
      {
        name: "profile",
        path: "",
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
    component: () => import("../views/StoryView.vue"),
    props: true
  },
  {
    name: "story-new",
    path: "/new/",
    props: true,
    component: () => import("../views/StoryNew.vue")
  },
  {
    name: "story-edit",
    path: "/editor/:slug",
    props: true,
    component: () => import("../views/StoryEdit.vue")
  }
];

const router = new VueRouter({
  routes
});

export default router;

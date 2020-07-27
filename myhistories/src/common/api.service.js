/** @format */

import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
import JwtService from "@/common/jwt.service.js";
import { API_URL } from "@/common/config.js";

const ApiService = {
  init() {
    Vue.use(VueAxios, axios);
    Vue.axios.defaults.baseURL = API_URL;
  },

  setHeader() {
    Vue.axios.defaults.headers.common[
      "Authorization"
    ] = `Token ${JwtService.getToken()}`;
  },

  query(resource, params) {
    return Vue.axios.get(resource, params).catch(error => {
      throw new Error(`[RWV] ApiService ${error}`);
    });
  },

  get(resource, slug = "") {
    return Vue.axios.get(`${resource}/${slug}`).catch(error => {
      throw new Error(`[RWV] ApiService ${error}`);
    });
  },

  post(resource, params) {
    return Vue.axios.post(`${resource}`, params);
  },

  update(resource, slug, params) {
    return Vue.axios.put(`${resource}/${slug}`, params);
  },

  put(resource, params) {
    return Vue.axios.put(`${resource}`, params);
  },

  delete(resource) {
    return Vue.axios.delete(resource).catch(error => {
      throw new Error(`[RWV] ApiService ${error}`);
    });
  }
};

export default ApiService;

export const TagsService = {
  get() {
    return ApiService.get("tags");
  }
};

export const HistoriesService = {
  query(type, params) {
    return ApiService.query("histories" + (type === "feed" ? "/feed/" : ""), {
      params: params
    });
  },
  get(slug) {
    return ApiService.get("histories", slug);
  },
  create(params) {
    return ApiService.post("histories", { histories: params });
  },
  update(slug, params) {
    return ApiService.update("histories", slug, { histories: params });
  },
  destroy(slug) {
    return ApiService.delete(`histories/${slug}`);
  }
};

export const CommentsService = {
  get(slug) {
    if (typeof slug !== "string") {
      throw new Error(
        "[RWV] CommentsService.get() history slug required to fetch comments"
      );
    }
    return ApiService.get("histories", `${slug}/comments`);
  },

  post(slug, payload) {
    return ApiService.post(`histories/${slug}/comments`, {
      comment: { body: payload }
    });
  },

  destroy(slug, commentId) {
    return ApiService.delete(`histories/${slug}/comments/${commentId}`);
  }
};

export const FavoriteService = {
  add(slug) {
    return ApiService.post(`histories/${slug}/favorite/`);
  },
  remove(slug) {
    return ApiService.delete(`histories/${slug}/favorite/`);
  }
};

<!-- @format -->

<template>
  <b-navbar spaced="true">
    <template v-if="isAuthenticated">
      <template slot="start">
        <b-navbar-item append-to-body>
          <router-link exact :to="{ name: 'home' }">
            <a><b-icon icon="home"></b-icon></a>
          </router-link>
        </b-navbar-item>
      </template>
      <template slot="end">
        <b-navbar-dropdown label="Menu" append-to-body aria-role="menu">
          <b-navbar-item
            append-to-body
            aria-role="menu"
            v-if="currentUser.username"
          >
            <router-link
              exact
              :to="{
                name: 'profile',
                params: { username: currentUser.username }
              }"
            >
              <a><b-icon icon="home"></b-icon> {{ currentUser.username }} </a>
            </router-link>
          </b-navbar-item>
          <hr class="dropdown-divider" />
          <b-navbar-item append-to-body aria-role="menu">
            <router-link exact :to="{ name: 'home' }">
              <a><b-icon icon="home"></b-icon> &nbsp;Home</a>
            </router-link>
          </b-navbar-item>
          <b-navbar-item append-to-body aria-role="menu">
            <router-link :to="{ name: 'history-edit' }">
              <a><b-icon icon="home"></b-icon> &nbsp;New History</a>
            </router-link>
          </b-navbar-item>
          <b-navbar-item append-to-body aria-role="menu">
            <router-link exact :to="{ name: 'settings' }">
              <a><b-icon icon="home"></b-icon> &nbsp;Settings</a>
            </router-link>
          </b-navbar-item>
        </b-navbar-dropdown>
      </template>
    </template>
    <template v-else>
      <template slot="start">
        <b-navbar-item append-to-body>
          <router-link exact :to="{ name: 'home' }">
            <a><b-icon icon="home"></b-icon></a>
          </router-link>
        </b-navbar-item>
      </template>
      <template slot="end">
        <b-navbar-item tag="div">
          <div class="buttons">
            <router-link exact :to="{ name: 'register' }">
              <a class="button is-primary">
                <strong>Sign up</strong>
              </a>
            </router-link>
            <router-link exact :to="{ name: 'login' }">
              <a class="button is-light">
                <strong>Log in</strong>
              </a>
            </router-link>
          </div>
        </b-navbar-item>
      </template>
    </template>
  </b-navbar>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "RwvHeader",
  computed: {
    ...mapGetters(["currentUser", "isAuthenticated"])
  }
};
</script>

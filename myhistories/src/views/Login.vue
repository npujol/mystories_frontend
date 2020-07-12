<template>
  <div>
    <ul v-if="errors" class="error-messages">
      <li v-for="(v, k) in errors" :key="k">{{ k }} {{ v | error }}</li>
    </ul>
    <form @submit.prevent="onSubmit(email, password)">
      <div class="modal-card" style="width:300px;">
        <section class="modal-card-body">
          <b-field label="Email">
            <b-input
              type="email"
              v-model="email"
              placeholder="Email"
              maxlength="30"
            />
          </b-field>
          <b-field label="Password">
            <b-input
              type="password"
              v-model="password"
              placeholder="Password"
              password-reveal
            >
            </b-input>
          </b-field>
          <b-button native-type="submit" class="button is-primary">
            Sign in
          </b-button>
          <p class="text-xs-center">
            <router-link :to="{ name: 'register' }">
              Need an account?
            </router-link>
          </p>
        </section>
      </div>
    </form>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { LOGIN } from "../store/actions.type.js";

export default {
  name: "RwvLogin",
  data() {
    return {
      email: null,
      password: null
    };
  },
  methods: {
    onSubmit(email, password) {
      this.$store
        .dispatch(LOGIN, { email, password })
        .then(() => this.$router.push({ name: "home" }));
    }
  },
  computed: {
    ...mapState({
      errors: state => state.auth.errors
    })
  }
};
</script>

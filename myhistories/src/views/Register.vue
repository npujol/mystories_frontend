<template>
  <div>
    <ul v-if="errors" class="error-messages">
      <li v-for="(v, k) in errors" :key="k">{{ k }} {{ v | error }}</li>
    </ul>

    <form @submit.prevent="onSubmit">
      <div class="modal-card" style="width:300px;">
        <section class="modal-card-body">
          <b-field label="Email">
            <b-input
              type="email"
              v-model="email"
              placeholder="Email"
              maxlength="30"
            >
            </b-input>
          </b-field>

          <b-field label="Username">
            <b-input
              v-model="username"
              placeholder="Username"
              maxlength="30"
            ></b-input>
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
            Sign up
          </b-button>
          <p class="text-xs-center">
            <router-link :to="{ name: 'login' }">
              Have an account?
            </router-link>
          </p>
        </section>
      </div>
    </form>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { REGISTER } from "@/store/actions.type.js";

export default {
  name: "RwvRegister",
  data() {
    return {
      username: "",
      email: "",
      password: ""
    };
  },
  computed: {
    ...mapState({
      errors: state => state.auth.errors
    })
  },
  methods: {
    onSubmit() {
      this.$store
        .dispatch(REGISTER, {
          email: this.email,
          password: this.password,
          username: this.username
        })
        .then(() => this.$router.push({ name: "home" }));
    }
  }
};
</script>

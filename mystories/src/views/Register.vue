<template>
  <v-card class="elevation mx-auto ">
    <v-card-title class="d-flex text-center justify-center">
      <h3 class="d-flex font-weight-bold basil--text">
        Register
      </h3>
    </v-card-title>
    <v-spacer></v-spacer>
    <v-card-text>
      <RwvListErrors :errors="errors" />
      <v-form>
        <v-text-field
          label="Username"
          name="username"
          prepend-icon="mdi-account"
          :rules="[rules.length(3), rules.required]"
          type="text"
          v-model="username"
        ></v-text-field>
        <v-text-field
          label="Email"
          name="Email"
          prepend-icon="mdi-mail"
          :rules="[rules.email, rules.length(6)]"
          type="text"
          required
          filled
          v-model="email"
        ></v-text-field>
        <v-text-field
          id="password"
          label="Password"
          name="password"
          prepend-icon="mdi-lock"
          type="password"
          :rules="[rules.password, rules.length(6)]"
          required
          filled
          v-model="password"
        ></v-text-field>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="primary" @click="onSubmit()">Sign up</v-btn>
    </v-card-actions>
    <v-spacer></v-spacer>
    <v-card-text>
      <p>
        <router-link :to="{ name: 'login' }">
          Have an account?
        </router-link>
      </p>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapState } from "vuex";
import { REGISTER } from "@/store/actions.type.js";
import RwvListErrors from "../components/ListErrors.vue";

export default {
  name: "RwvRegister",
  components: { RwvListErrors },
  data() {
    return {
      username: "",
      email: "",
      password: "",
      valid: false,
      rules: {
        email: v =>
          !!(v || "").match(
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          ) || "Please enter a valid email",
        length: len => v =>
          (v || "").length >= len ||
          `Invalid character length, required ${len}`,
        password: v =>
          !!(v || "").match(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(_|[^\w])).+$/
          ) ||
          "Password must contain an upper case letter, a numeric character, and a special character",
        required: v => !!v || "This field is required"
      }
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

<template>
  <v-row align="center" justify="center">
    <v-col cols="12" md="12">
      <v-card class="elevation-12">
        <v-card-title class="headline" dark>Register</v-card-title>
        <v-card-text>
          <v-form>
            <v-text-field
              label="Username"
              name="username"
              prepend-icon="mdi-account"
              :rules="rules.length(10)"
              type="text"
              required
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
          <v-btn class="mr-4" @click="onSubmit()">Sign up</v-btn>
        </v-card-actions>
        <v-spacer></v-spacer>
        <v-card-text>
          <p class="text-xs-center">
            <router-link :to="{ name: 'register' }">
              Have an account?
            </router-link>
          </p></v-card-text
        >
      </v-card>
    </v-col>
  </v-row>
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
      password: "",
      valid: false,
      rules: {
        email: v => (v || "").match(/@/) || "Please enter a valid email",
        length: len => v =>
          (v || "").length >= len ||
          `Invalid character length, required ${len}`,
        password: v =>
          (v || "").match(
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

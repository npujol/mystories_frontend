<template>
  <div>
    <!-- <ul v-if="errors" class="error-messages">
      <li v-for="(v, k) in errors" :key="k">{{ k }} {{ v | error }}</li>
    </ul> -->

    <v-row align="center" justify="center">
      <v-col cols="12">
        <v-card class="elevation-12">
          <v-card-title class="headline" dark>Login</v-card-title>
          <v-card-text>
            <v-form>
              <v-text-field
                label="Email"
                name="Email"
                prepend-icon="mdi-account"
                type="text"
                v-model="email"
              ></v-text-field>

              <v-text-field
                id="password"
                label="Password"
                name="password"
                prepend-icon="mdi-lock"
                type="password"
                v-model="password"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn class="mr-4" @click="onSubmit(email, password)"
              >Sign in</v-btn
            >
          </v-card-actions>
        </v-card>
        <p class="text-xs-center">
          <router-link :to="{ name: 'register' }">
            Need an account?
          </router-link>
        </p>
      </v-col>
    </v-row>
    <!-- <v-form>
      <div class="modal-card" style="width:300px;">
        <section class="modal-card-body">
          <field label="Email">
            <input
              type="email"
              v-model="email"
              placeholder="Email"
              maxlength="30"
            />
          </field>
          <field label="Password">
            <input
              type="password"
              v-model="password"
              placeholder="Password"
              password-reveal
            />
          </field>
          <button native-type="submit" class="button is-primary">
            Sign in
          </button>
        </section>
      </div>
    </v-form> -->
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
      console.log(email, password);
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

<template>
  <ValidationObserver ref="obs">
    <v-card slot-scope="{ invalid, validated }">
      <v-card-title class="d-flex text-center justify-center">
        <h3 class="d-flex font-weight-bold basil--text">
          Register
        </h3>
      </v-card-title>
      <v-alert v-if="errors && errors.error" dismissible type="error">
        {{ errors.error | error }}
      </v-alert>
      <v-card-text>
        <v-form>
          <ValidationProvider name="username" rules="required|alpha">
            <v-text-field
              slot-scope="{ errors, valid }"
              v-model="username"
              :counter="20"
              :error-messages="errors"
              :success="valid"
              label="Username"
              prepend-icon="mdi-account"
              filled
              required
            ></v-text-field>
          </ValidationProvider>
          <ValidationProvider name="email" rules="required|email">
            <v-text-field
              slot-scope="{ errors, valid }"
              v-model="email"
              :error-messages="errors"
              :success="valid"
              label="E-mail"
              prepend-icon="mdi-mail"
              filled
              required
            ></v-text-field>
          </ValidationProvider>
          <ValidationProvider
            name="password"
            :rules="{
              required: true,
              regex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/
            }"
          >
            <v-text-field
              slot-scope="{ errors, valid }"
              v-model="password"
              :error-messages="errors"
              :success="valid"
              label="Password"
              prepend-icon="mdi-lock"
              type="password"
              filled
              required
            ></v-text-field>
          </ValidationProvider>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <router-link :to="{ name: 'login' }">
          Have an account?
        </router-link>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="clear">Clear</v-btn>
        <v-btn color="primary" @click="submit" :disabled="invalid || !validated"
          >OK</v-btn
        >
      </v-card-actions>
    </v-card>
  </ValidationObserver>
</template>

<script>
import { mapState } from "vuex";
import { REGISTER } from "../store/actions.type.js";
import { ValidationObserver, ValidationProvider } from "vee-validate";

export default {
  name: "RegisterView",
  components: { ValidationProvider, ValidationObserver },
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
    async clear() {
      this.username = this.email = this.password = "";
      this.$nextTick(() => {
        this.$refs.obs.reset();
      });
    },
    async submit() {
      const validated = await this.$refs.obs.validate();
      if (validated) {
        try {
          const data = await this.$store.dispatch(REGISTER, {
            email: this.email,
            password: this.password,
            username: this.username
          });
          this.$router.push({ name: "home" });
        } catch (response) {
          const errors = JSON.parse(response.response.text).errors;
          this.$refs.obs.setErrors({
            username: errors.username,
            email: errors.email,
            password: errors.password
          });
        }
      }
    }
  }
};
</script>

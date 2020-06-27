<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />

    <label>
      Usename
      <input v-model="username" />
    </label>

    <label>
      Email
      <input v-model="email" />
    </label>

    <label>
      Password
      <input v-model="password" type="password" />
      <button @click="register">Ok!</button>
    </label>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import { AuthApi } from "@/client";
const authClient = new AuthApi();

export default {
  name: "Home",
  components: {
    HelloWorld
  },
  data: () => {
    return {
      password: "",
      email: "",
      username: ""
    };
  },
  methods: {
    async register() {
      const resp = await authClient.authRegistrationCreate(this.$data);
      alert(resp);
    }
  }
};
</script>

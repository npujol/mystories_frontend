<template>
  <v-footer padless>
    <v-card class="flex" flat tile>
      <v-card-title class="teal">
        <strong class="subheading">Get connected with us!</strong>
        <v-spacer></v-spacer>
        <v-btn v-for="icon in icons" :key="icon" class="mx-4" icon>
          <v-icon size="24px">{{ icon }}</v-icon>
        </v-btn>
      </v-card-title>

      <v-card-text class="py-2 white--text text-center" aling="center">
        <span
          >&copy; {{ new Date().getFullYear() }}
          <router-link class="logo-font" :to="{ name: 'home', params: {} }"
            >Stories</router-link
          >
          by <a href="https://github.com/npujol">Naivy Pujol Méndez</a></span
        >
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>
export default {
  name: "RwvFooter",
  data: () => ({
    icons: ["mdi-twitter", "mdi-linkedin", "mdi-github"]
  })
};
</script>

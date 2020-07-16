<template>
  <v-footer class="footer">
    <span>&copy; {{ new Date().getFullYear() }}</span>
    <hr />
    <p>
      <router-link class="logo-font" :to="{ name: 'home', params: {} }"
        >Histories</router-link
      >
      by <a href="https://github.com/npujol">Naivy Pujol Méndez</a>
    </p>
  </v-footer>
</template>

<script>
export default {
  name: "RwvFooter"
};
</script>

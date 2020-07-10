<template>
  <footer class="footer">
    <div class="content has-text-centered">
      <p>
        <router-link class="logo-font" :to="{ name: 'home', params: {} }"
          >Histories</router-link
        >
        by <a href="https://github.com/npujol">Naivy Pujol Méndez</a>
      </p>
    </div>
  </footer>
</template>

<script>
export default {
  name: "RwvFooter"
};
</script>

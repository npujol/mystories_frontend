<template>
  <div id="app">
    <RwvHeader />
    <!-- <div id="nav">
      <router-link to="/">Home</router-link>|
      <router-link to="/about">About</router-link>
    </div> -->
    <router-view></router-view>
    <RwvFooter />
  </div>
</template>

<script>
import RwvHeader from "./components/TheHeader.vue";
import RwvFooter from "./components/TheFooter.vue";

export default {
  name: "App",
  components: {
    RwvHeader,
    RwvFooter
  }
};
</script>

<style></style>

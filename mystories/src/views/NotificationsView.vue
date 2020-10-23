<template>
  <v-card color="basil" aling="center" class="mx-auto">
    <v-card-title class="d-flex text-center justify-center">
      <h3 class=" font-weight-bold basil--text">
        Notifications
      </h3>
    </v-card-title>
    <v-alert v-if="errors && errors.error" dismissible type="error">
      {{ errors.error | error }}
    </v-alert>
    <v-spacer></v-spacer>
    <v-card-text>
      <NotificationsList></NotificationsList>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapState } from "vuex";
import NotificationsList from "../components/NotificationsList.vue";

export default {
  name: "NotificationsView",
  components: {
    NotificationsList
  },
  computed: {
    ...mapState({
      errors: state => state.auth.errors
    })
  }
};
</script>

<template>
  <v-card class="mx-auto" aling="center">
    <div v-for="(value, key) in errors" :key="key">
      <v-alert
        dismissible
        close-icon="mdi-delete"
        color="error"
        border="left"
        colored-border
        type="error"
      >
        {{ value[0] }}
      </v-alert>
    </div>
  </v-card>
</template>

<script>
export default {
  name: "RwvListErorrs",
  props: {
    errors: { type: Object, required: true }
  }
};
</script>

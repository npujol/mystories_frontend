<template>
  <v-card class="mx-auto">
    <div v-for="(value, key) in errors" :key="key">
      <v-alert
        dismissible
        close-icon="mdi-delete"
        color="error"
        border="left"
        colored-border
        type="error"
      >
        <span v-for="err in value" :key="err" v-text="err" />
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

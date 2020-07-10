<template>
  <b-taglist>
    <b-tag type="is-primary" attached v-for="(tag, index) of tags" :key="index">
      {{ tag }}
    </b-tag>
  </b-taglist>
</template>

<script>
export default {
  name: "TagList",
  props: {
    tags: Array
  }
};
</script>

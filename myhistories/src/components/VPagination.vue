<template>
  <div class="text-center">
    <!-- <v-pagination v-model="pages" :length="pages.length"></v-pagination> -->
    <nav>
      <v-chip-group column active-class="primary--text">
        <v-chip
          label
          small
          draggable
          v-for="page in pages"
          :data-test="`page-link-${page}`"
          :key="page"
          :class="paginationClass(page)"
          @click.prevent="changePage(page)"
        >
          <a class="page-link" href v-text="page" />
        </v-chip>
      </v-chip-group>
    </nav>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  data() {
    return {};
  },
  props: {
    pages: {
      type: Array,
      required: true
    },
    currentPage: {
      type: Number,
      required: true
    }
  },
  methods: {
    changePage(goToPage) {
      console.log("current page", this.currentPage, "all page", this.pages);
      if (goToPage === this.currentPage) return;
      this.$emit("update:currentPage", goToPage);
    },
    paginationClass(page) {
      return {
        "page-item": true,
        active: this.currentPage === page
      };
    }
  }
};
</script>

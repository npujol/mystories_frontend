export const pagination = {
  data() {
    return {
      currentPage: 1,
      limit: 10
    };
  },
  computed: {
    listConfig() {
      const filters = {
        offset: (this.currentPage - 1) * this.limit,
        limit: this.limit
      };
      return { filters };
    }
  },
  methods: {
    resetPagination() {
      this.listConfig.offset = 0;
      this.currentPage = 1;
    }
  }
};

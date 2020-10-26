import { mapGetters } from "vuex";

export const pagination = {
  data() {
    return {
      currentPage: 1
    };
  },
  computed: {
    ...mapGetters(["limit"]),
    filters() {
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

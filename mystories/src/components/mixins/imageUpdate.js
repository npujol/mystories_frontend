export const imageUpdate = {
  data() {
    return {
      preview: "https://picsum.photos/510/300?random",
      imageFile: null,
      rules: {
        photo: v =>
          !v || v.size < 2000000 || "Avatar size should be less than 2 MB!"
      }
    };
  },
  methods: {
    previewImage(file) {
      var reader = new FileReader();
      this.imageFile = file;
      reader.onload = e => {
        this.preview = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }
};

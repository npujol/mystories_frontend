export const imageUpdate = {
  data() {
    return {
      preview: "https://picsum.photos/510/300?random",
      imageFile: null
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

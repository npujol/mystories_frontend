<template>
  <section class="hero has-background-white-ter">
    <div class="hero-body">
      <div class="content-wrapper">
        <div
          class="columns is-vcentered has-padding-top-50 has-padding-bottom-50 "
        >
          <div
            class="column is-10 is-offset-1 columns has-background-white features-box is-hidden-mobile"
          >
            <div class="column is-5 is-offset-1">
              <figure class="image is-128x128">
                <router-link
                  :to="{
                    name: 'profile',
                    params: { username: history.author.username }
                  }"
                >
                  <img class="is-rounded" :src="history.author.image" />
                </router-link>
              </figure>
              <TagList :tags="history.tags" />
            </div>
            <RwvHistoryMeta isPreview :history="history" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import RwvHistoryMeta from "./HistoryMeta.vue";
import TagList from "./TagList.vue";

export default {
  name: "RwvHistoryPreview",
  components: {
    RwvHistoryMeta,
    TagList
  },
  props: {
    history: { type: Object, required: true }
  }
};
</script>

<template>
  <v-card outlined>
    <div>
      <v-row class="pa-2" justify="center">
        <v-alert prominent text type="info">
          <v-row class="flex mb-2" align="center">
            <v-col class="flex mb-2">
              {{ message.title }}
            </v-col>
            <v-col class="shrink">
              <v-btn color="primary" class="ma-2" dark @click="dialog = true">
                Show
              </v-btn>
            </v-col>
          </v-row>
        </v-alert>

        <v-dialog v-model="dialog" max-width="500px">
          <v-card class="mx-auto" color="primary" dark max-width="400">
            <v-card-title>
              <v-icon large left>
                mdi-bell
              </v-icon>
              <span class="title font-weight-light">Notification</span>
            </v-card-title>

            <v-card-text class="headline font-weight-bold">
              {{ message.body }}
            </v-card-text>

            <v-card-actions>
              <v-list-item class="grow">
                <v-list-item-avatar color="grey darken-3">
                  <v-img
                    class="elevation-6"
                    alt=""
                    :src="message.author.image"
                  ></v-img>
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title>{{
                    message.author.username
                  }}</v-list-item-title>
                </v-list-item-content>

                <v-row align="center" justify="end">
                  <v-btn
                    class="subheading mr-1"
                    small
                    text
                    @click="dialog = false"
                  >
                    <v-icon>
                      mdi-email-open
                    </v-icon>
                  </v-btn>
                  <v-btn
                    class="subheading mr-1"
                    text
                    small
                    @click="dialog = false"
                  >
                    <v-icon>
                      mdi-close
                    </v-icon>
                  </v-btn>
                </v-row>
              </v-list-item>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
    </div>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      dialog: false
    };
  },
  props: {
    message: {
      type: Object,
      required: true,
      default: null
    }
  },
  computed: {
    openMessage() {
      return this.message.status === "opened" ? "mdi-email-open" : "mdi-email";
    },
    color() {
      return this.message.status === "opened" ? "secondary" : "info";
    }
  }
};
</script>

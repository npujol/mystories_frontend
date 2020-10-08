<template>
  <v-card outlined grow class="pa-2">
    <div>
      <v-row justify="center">
        <v-alert
          :icon="isOpenIcon"
          :color="isOpenColor"
          grow
          prominent
          text
          style="min-width: 100px; max-width: 95%;"
          class="flex-grow-1 flex-shrink-0 pa-2"
        >
          <v-row align="center">
            <v-col>
              {{ message.title }}
            </v-col>
            <v-row class="shrink pa-4">
              <v-btn color="sucess" icon @click="dialog = true">
                <v-icon> mdi-eye </v-icon>
              </v-btn>
              <v-btn
                color="error"
                :disabled="inProgress"
                icon
                @click="destroy(message.pk)"
              >
                <v-icon> mdi-delete</v-icon>
              </v-btn>
            </v-row>
          </v-row>
        </v-alert>

        <v-dialog v-model="dialog" max-width="500px">
          <v-card class="mx-auto" color="primary" dark max-width="500">
            <v-card-title>
              <v-icon medium left>
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
                    icon
                    @click="toggleMessage(opened)"
                  >
                    <v-icon>
                      {{ isOpenIcon }}
                    </v-icon>
                  </v-btn>
                  <v-btn
                    class="subheading mr-1"
                    text
                    icon
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
import { OPEN_MESSAGE, MESSAGE_DESTROY } from "../store/actions.type.js";

export default {
  data() {
    return {
      dialog: false,
      opened: false,
      inProgress: false
    };
  },
  props: {
    message: {
      type: Object,
      required: true,
      default: null
    }
  },
  mounted() {
    if (this.message) {
      this.opened = this.message.opened;
    }
  },
  computed: {
    isOpenIcon() {
      return this.opened === true ? "mdi-email-open" : "mdi-email";
    },
    isOpenColor() {
      return this.opened === true ? "secondary" : "info";
    }
  },
  methods: {
    async toggleMessage(value) {
      this.opened = await this.$store.dispatch(OPEN_MESSAGE, { value });
    },
    async destroy(pk) {
      try {
        this.inProgress = true;
        await this.$store.dispatch(MESSAGE_DESTROY, { pk });
        this.inProgress = false;
        this.$router.go();
      } catch (err) {
        console.error(err);
      }
    }
  }
};
</script>

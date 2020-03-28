<template>
  <v-container>
    <v-row>
      <v-col cols="10" style="margin: auto;">
        <v-card
          class="mx-auto"
          :style="'background-color:' + getColor.cardColor"
          outlined
        >
          <v-skeleton-loader
            ref="skeleton"
            type="article"
            class="mx-auto my-2"
            :style="'background-color=' + getColor.navColor"
          ></v-skeleton-loader>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Loader",
  computed: {
    ...mapGetters(["getColor"])
  }
};
</script>
<style lang="scss" scoped>
::v-deep .v-skeleton-loader__article {
  background-color: transparent !important;
}
</style>

<template>
  <v-app>
    <v-content
      style="width:100vw;overflow: hidden;"
      :style="'background-color:' + getColor.backColor"
    >
      <v-snackbar
        v-model="$store.getters.getSnack.state"
        :color="$store.getters.getSnack.color"
        top
        :timeout="2200"
      >
        {{ $store.getters.getSnack.content }}
      </v-snackbar>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "App",
  data: () => ({
    snackbar: true
  }),
  computed: {
    ...mapGetters(["getColor"])
  }
};
</script>

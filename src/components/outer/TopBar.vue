<template>
  <v-app-bar app :style="'background-color:' + getColor.toolbarColor">
    <v-toolbar-title class="ml-0 px-3">Speech App</v-toolbar-title>
    <v-spacer />
    <v-btn text small @click="signup">
      <v-icon>Sign Up</v-icon>
    </v-btn>
    <v-btn text small @click="login">
      <v-icon>Login</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "TopBar",
  computed: {
    ...mapGetters(["getColor"])
  },
  methods: {
    signup: function() {
      this.$router.replace("/signup");
    },
    login: function() {
      this.$router.replace("/login");
    }
  },
  watch: {
    searchText: function() {
      let text = this.searchText || "";
      this.SET_SEARCH(text);
    }
  }
};
</script>

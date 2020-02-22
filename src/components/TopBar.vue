<template>
  <v-app-bar :clipped-left="true" style="background-color:#36393f" app dark>
    <v-app-bar-nav-icon
      class="d-flex d-md-none"
      @click="toggleDrawer"
    ></v-app-bar-nav-icon>

    <v-toolbar-title class="ml-0 px-3">Speech App</v-toolbar-title>
    <template v-if="!isSearch">
      <v-spacer />
      <v-btn icon @click="toggleSearch">
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
    </template>
    <template v-else>
      <v-spacer style="flex-grow: 0.25!important;" />
      <v-text-field
        v-model="searchText"
        label="Search in author"
        append-icon="mdi-clear"
        :append-icon-cb="() => (isSearch = !isSearch)"
        hide-details
        dark
      ></v-text-field>
      <v-btn icon @click="toggleSearch">
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
    </template>
  </v-app-bar>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  name: "TopBar",
  props: {
    drawer: {
      type: Boolean,
      default: true
    },
    toggleDrawer: {
      type: Function
    }
  },
  data: () => ({
    isSearch: false,
    searchText: ""
  }),
  methods: {
    toggleSearch: function() {
      this.isSearch = !this.isSearch;
    },
    ...mapMutations(["SET_SEARCH"])
  },
  watch: {
    searchText: function() {
      let text = this.searchText || "";
      this.SET_SEARCH(text);
    }
  }
};
</script>

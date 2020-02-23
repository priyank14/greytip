<template>
  <v-app-bar
    :clipped-left="true"
    app
    :style="'background-color:' + getColor.toolbarColor"
  >
    <v-app-bar-nav-icon
      class="d-flex d-md-none"
      @click="toggleDrawer"
    ></v-app-bar-nav-icon>

    <v-toolbar-title class="ml-0 px-3">Speech App</v-toolbar-title>
    <div>
      <v-select
        :value="selectedTheme"
        @change="themeChanged"
        :items="getThemes"
        hide-details
        style="width:100px;"
      ></v-select>
    </div>
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
        :dark="$vuetify.theme.dark"
      ></v-text-field>
      <v-btn icon @click="toggleSearch">
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
    </template>
  </v-app-bar>
</template>

<script>
import { mapState, mapMutations, mapGetters } from "vuex";

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
  computed: {
    ...mapState(["selectedTheme"]),
    ...mapGetters(["getThemes", "getColor"])
  },
  created() {
    let theme = window.localStorage.getItem("theme");
    if (!theme) {
      theme = "Dark";
      window.localStorage.setItem("theme", theme);
    } else {
      this.SET_THEME(theme);
    }
    if (theme == "Light") {
      this.$vuetify.theme.dark = false;
    } else {
      this.$vuetify.theme.dark = true;
    }
  },
  methods: {
    toggleSearch: function() {
      this.isSearch = !this.isSearch;
    },
    themeChanged(event) {
      console.log("theme changed ");
      if (event == "Light") {
        this.$vuetify.theme.dark = false;
      } else {
        this.$vuetify.theme.dark = true;
      }
      this.SET_THEME(event);
    },
    ...mapMutations(["SET_SEARCH", "SET_THEME"])
  },
  watch: {
    searchText: function() {
      let text = this.searchText || "";
      this.SET_SEARCH(text);
    }
  }
};
</script>

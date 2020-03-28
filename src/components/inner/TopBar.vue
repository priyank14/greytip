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
    <v-spacer />
    <v-btn color="primary" @click="logout">
      Logout
    </v-btn>
  </v-app-bar>
</template>

<script>
import { mapState, mapMutations, mapGetters } from "vuex";
import firebase from "firebase";

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
  data: () => ({}),
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
    themeChanged(event) {
      console.log("theme changed ");
      if (event == "Light") {
        this.$vuetify.theme.dark = false;
      } else {
        this.$vuetify.theme.dark = true;
      }
      this.SET_THEME(event);
    },
    logout: function() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.go({ path: this.$router.path });
        });
    },
    ...mapMutations(["SET_THEME"])
  }
};
</script>

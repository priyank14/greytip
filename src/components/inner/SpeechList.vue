<template>
  <v-navigation-drawer
    v-model="drawer"
    :app="true"
    :clipped="true"
    :permanent="drawer"
    style="height:calc(100vh - 56px)"
    :style="'background-color:' + getColor.navColor"
    :disable-resize-watcher="true"
    :disable-route-watcher="true"
    :hide-overlay="true"
  >
    <v-list nav dense :dark="$vuetify.theme.dark" :flat="true">
      <v-list-item-group>
        <v-list-item @click="createSpeech()">
          <v-list-item-icon>
            <v-icon>mdi-plus</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Create Speech</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-icon>
            <v-icon class="mt-4">mdi-magnify</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>
              <v-text-field
                v-model="searchText"
                label="Search in author"
                class="mt-2"
                :dense="true"
                :hide-details="true"
                append-icon="mdi-clear"
                :dark="$vuetify.theme.dark"
              ></v-text-field>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
    <v-list nav dense :dark="$vuetify.theme.dark">
      <v-list-item-group active-class="text--accent-4" v-model="selected">
        <template v-if="loader">
          <v-skeleton-loader
            v-for="i in 3"
            :key="i"
            ref="skeleton"
            type="list-item-avatar"
            class="mx-auto my-2"
            :style="'background-color=' + getColor.navColor"
          ></v-skeleton-loader>
        </template>
        <template v-else>
          <v-list-item
            v-for="(speech, index) in filterSpeeches"
            :key="speech.id"
            @click="changeSpeechId(speech.id)"
          >
            <v-list-item-icon>
              <v-avatar :color="getColorAvatar(index)" size="25">
                <span class="headline"> {{ speech.author.charAt(0) }}</span>
              </v-avatar>
            </v-list-item-icon>
            <v-list-item-title>
              {{ speech.name }}
            </v-list-item-title>
          </v-list-item>
        </template>
      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";

export default {
  name: "SpeechList",
  props: {
    drawer: {
      type: Boolean,
      default: true
    }
  },
  data: () => ({
    selected: null,
    colorText: ["red", "teal", "indigo", "blue", "orange"],
    isSearch: false,
    searchText: ""
  }),
  computed: {
    filterSpeeches: function() {
      let searchText = this.search.toLowerCase() || "";
      function stringMatch(word) {
        return word.author.toLowerCase().includes(searchText);
      }
      let filtered = this.speeches.filter(stringMatch);
      return filtered;
    },
    ...mapState(["speeches", "selectedSpeechId", "search", "loader"]),
    ...mapGetters(["getColor"])
  },
  methods: {
    ...mapMutations([
      "CHANGE_SELECTED_SPEECH",
      "SET_CREATE_MODE",
      "SET_SEARCH"
    ]),
    changeSpeechId: function(id) {
      this.CHANGE_SELECTED_SPEECH(id);
      this.SET_CREATE_MODE(false);
    },
    getColorAvatar: function(index) {
      return this.colorText[index % this.colorText.length];
    },
    createSpeech() {
      this.SET_CREATE_MODE(true);
    }
  },
  watch: {
    selectedSpeechId: function() {
      const index = element => element.id == this.selectedSpeechId;
      this.selected = this.speeches.findIndex(index);
    },
    searchText: function() {
      let text = this.searchText || "";
      this.SET_SEARCH(text);
    }
  }
};
</script>
<style lang="scss" scoped>
::v-deep .v-skeleton-loader__list-item-avatar {
  background-color: transparent !important;
}
</style>

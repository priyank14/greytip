<template>
  <v-navigation-drawer
    v-model="drawer"
    :app="true"
    :clipped="true"
    :permanent="drawer"
    style="background-color:#2f3136;height:calc(100vh - 56px)"
    :disable-resize-watcher="true"
    :disable-route-watcher="true"
    :hide-overlay="true"
    dark
  >
    <v-list nav dense>
      <v-list-item-group active-class="text--accent-4" v-model="selected">
        <v-list-item @click="createSpeech()">
          <v-list-item-icon>
            <v-icon>mdi-plus</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Create Speech</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          v-for="speech in filterSpeeches"
          :key="speech.id"
          @click="changeSpeechId(speech.id)"
        >
          <v-list-item-icon>
            <v-avatar :color="getColor(speech.id)" size="25">
              <span class="white--text headline">{{
                speech.author.charAt(0)
              }}</span>
            </v-avatar>
          </v-list-item-icon>
          <v-list-item-title>
            {{ speech.name }}
          </v-list-item-title>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  name: "SpeechList",
  props: {
    drawer: {
      type: Boolean,
      default: true
    }
  },
  created() {
    if (this.speeches.length > 0) {
      this.changeSpeechId(this.speeches[0].id);
    }
  },
  data: () => ({
    selected: null,
    colorText: ["red", "teal", "indigo", "blue", "orange"]
  }),
  computed: {
    filterSpeeches: function() {
      let searchText = this.search.toLowerCase() || "";
      function stringMatch(word) {
        console.log(word);
        return word.author.toLowerCase().includes(searchText);
      }
      let filtered = this.speeches.filter(stringMatch);
      return filtered;
    },
    ...mapState(["speeches", "selectedSpeechId", "search"])
  },
  methods: {
    ...mapMutations(["CHANGE_SELECTED_SPEECH", "SET_CREATE_MODE"]),
    changeSpeechId: function(id) {
      this.CHANGE_SELECTED_SPEECH(id);
      this.SET_CREATE_MODE(false);
    },
    getColor: function(index) {
      return this.colorText[index % this.colorText.length];
    },
    createSpeech() {
      this.SET_CREATE_MODE(true);
    }
  },
  watch: {
    selectedSpeechId: function() {
      const index = element => element.id == this.selectedSpeechId;
      this.selected = this.speeches.findIndex(index) + 1;
    }
  }
};
</script>

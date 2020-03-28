<template>
  <div>
    <SpeechList :drawer="drawer" />
    <TopBar :drawer="drawer" :toggleDrawer="toggleDrawer" />
    <v-content
      style="height:calc(100vh - 56px);padding-left:0;min-width:350px;overflow: auto;"
    >
      <template v-if="!loader">
        <Speech v-if="!createMode" />
        <NewSpeech v-else />
      </template>
      <template v-else>
        <Loader />
      </template>
    </v-content>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import db from "../firebaseInit";

import SpeechList from "@/components/inner/SpeechList.vue";
import Speech from "@/components/inner/Speech.vue";
import NewSpeech from "@/components/inner/NewSpeech.vue";
import TopBar from "@/components/inner/TopBar.vue";
import Loader from "@/components/inner/Loader.vue";

export default {
  name: "SpeechHome",
  components: {
    SpeechList,
    TopBar,
    Speech,
    NewSpeech,
    Loader
  },
  data: () => ({
    drawer: true,
    // loader: false
  }),
  computed: {
    ...mapState(["createMode", "loader"])
  },
  methods: {
    toggleDrawer: function() {
      this.drawer = !this.drawer;
    },
    ...mapMutations([
      "SET_SPEECHES",
      "CHANGE_SELECTED_SPEECH",
      "SET_CREATE_MODE",
      "SET_LOADER"
    ])
  },
  created() {
    this.SET_LOADER(true);
    db.collection("speech")
      .get()
      .then(querySnapShot => {
        let speeches = [];
        querySnapShot.forEach(doc => {
          let speech = doc.data();
          speech.id = doc.id;
          speeches.push(speech);
        });
        this.SET_SPEECHES(speeches);
        this.SET_LOADER(false);
        if (speeches.length > 0) {
          this.CHANGE_SELECTED_SPEECH(speeches[0].id);
        } else {
          this.SET_CREATE_MODE(true);
        }
      });
  }
};
</script>

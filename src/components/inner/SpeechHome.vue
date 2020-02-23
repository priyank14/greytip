<template>
  <div>
    <SpeechList :drawer="drawer" />
    <TopBar :drawer="drawer" :toggleDrawer="toggleDrawer" />
    <v-content
      v-if="!loader"
      style="height:calc(100vh - 56px);padding-left:0;min-width:350px;overflow: auto;"
    >
      <Speech v-if="!createMode" />
      <NewSpeech v-else />
    </v-content>
  </div>
  <!-- <div v-else>
    <SpeechList :key="2" :drawer="drawer" />
    <TopBar :drawer="drawer" :toggleDrawer="toggleDrawer" />
  </div> -->
</template>

<script>
import { mapState, mapMutations } from "vuex";
import db from "../firebaseInit";

import SpeechList from "@/components/inner/SpeechList.vue";
import Speech from "@/components/inner/Speech.vue";
import NewSpeech from "@/components/inner/NewSpeech.vue";
import TopBar from "@/components/inner/TopBar.vue";

export default {
  name: "SpeechHome",
  components: {
    SpeechList,
    TopBar,
    Speech,
    NewSpeech
  },
  data: () => ({
    drawer: true,
    loader: false
  }),
  computed: {
    ...mapState(["createMode"])
  },
  methods: {
    toggleDrawer: function() {
      this.drawer = !this.drawer;
    },
    ...mapMutations([
      "SET_SPEECHES",
      "CHANGE_SELECTED_SPEECH",
      "SET_CREATE_MODE"
    ])
  },
  created() {
    this.loader = true;
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
        this.loader = false;
        if (speeches.length > 0) {
          this.CHANGE_SELECTED_SPEECH(speeches[0].id);
        } else {
          this.SET_CREATE_MODE(true);
        }
      });
  }
};
</script>

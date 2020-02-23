<template>
  <div>
    <SpeechList :drawer="drawer" />
    <TopBar :drawer="drawer" :toggleDrawer="toggleDrawer" />
    <v-content
      style="height:calc(100vh - 56px);padding-left:0;min-width:350px;overflow: hidden;"
    >
      <Speech v-if="!createMode" />
      <NewSpeech v-else />
    </v-content>
  </div>
</template>

<script>
import { mapState } from "vuex";

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
    drawer: true
  }),
  computed: {
    ...mapState(["createMode"])
  },
  methods: {
    toggleDrawer: function() {
      this.drawer = !this.drawer;
    }
  }
};
</script>

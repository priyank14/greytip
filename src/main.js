import Vue from "vue";
import firebase from "firebase";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";

Vue.config.productionTip = false;

const firebaseConfig = {
  apiKey: "AIzaSyD02_ZD3odeAA41szzqQdPwQKiegu6NMUE",
  authDomain: "vue-speech-repo.firebaseapp.com",
  databaseURL: "https://vue-speech-repo.firebaseio.com",
  projectId: "vue-speech-repo",
  storageBucket: "vue-speech-repo.appspot.com",
  messagingSenderId: "42498960833",
  appId: "1:42498960833:web:62a0939ea2977be1009340",
  measurementId: "G-44VRQ0QPPJ"
};
firebase.initializeApp(firebaseConfig);

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");

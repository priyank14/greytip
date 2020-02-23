import Vue from "vue";
// import firebase from "firebase";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";

Vue.config.productionTip = false;

// import firebaseConfig from "../firebaseConfig.js";
// firebase.initializeApp(firebaseConfig);

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");

import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";

import firebase from "firebase";
import "./components/firebaseInit";

Vue.config.productionTip = false;

let app;
firebase.auth().onAuthStateChanged(function() {
  if (!app) {
    /* eslint-disable no-new */
    new Vue({
      router,
      store,
      vuetify,
      render: h => h(App)
    }).$mount("#app");
  }
});

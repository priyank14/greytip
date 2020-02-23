import Vue from "vue";
import VueRouter from "vue-router";
// import firebase from "firebase";

import Home from "../views/Home.vue";

import Login from "@/components/outer/Login.vue";
import Signup from "@/components/outer/Signup.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
    // meta: {
    //   requiresAuth: true
    // }
  },
  {
    path: "/login",
    name: "Login",
    component: Login
  },
  {
    path: "/signup",
    name: "Signup",
    component: Signup
  }
];

const router = new VueRouter({
  routes
});

// router.beforeEach((to, from, next) => {
//   if (to.matched.some(record => record.meta.requiresAuth)) {
//     if (!firebase.auth().currentUser) {
//       next({
//         path: "/login",
//         query: {
//           redirect: to.fullPath
//         }
//       });
//     } else {
//       next();
//     }
//   }
// });

export default router;

import Vue from "vue";
import VueRouter from "vue-router";
import firebase from "firebase";

import Home from "../views/Home.vue";

import Login from "@/components/outer/Login.vue";
import Signup from "@/components/outer/Signup.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
      requiresGuest: true
    }
  },
  {
    path: "/signup",
    name: "Signup",
    component: Signup,
    meta: {
      requiresGuest: true
    }
  }
];

let router = new VueRouter({
  routes
});

// Nav Guard
router.beforeEach((to, from, next) => {
  // Check for requiresAuth guard
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // Check if NO logged user
    if (!firebase.auth().currentUser) {
      // Go to login
      next({
        path: "/login"
        // query: {
        //   redirect: to.fullPath
        // }
      });
    } else {
      // Proceed to route
      next();
    }
  } else if (to.matched.some(record => record.meta.requiresGuest)) {
    // Check if NO logged user
    if (firebase.auth().currentUser) {
      // Go to login
      next({
        path: "/"
        // query: {
        //   redirect: to.fullPath
        // }
      });
    } else {
      // Proceed to route
      next();
    }
  } else {
    // Proceed to route
    next();
  }
});

export default router;

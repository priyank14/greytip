<template>
  <v-container fluid class="ma-0 pa-0">
    <TopBar />
    <v-row style="height: calc(100vh - 64px);">
      <v-col cols="col-md-8 col-sm-10 col-xs-11 ma-auto">
        <v-card
          align="center"
          justify="center"
          outlined
          :style="'background-color:' + getColor.cardColor"
        >
          <v-card-title class="headline">Login</v-card-title>
          <v-card-text>
            <v-form v-model="valid">
              <v-text-field
                v-model="email"
                :rules="emailRules"
                label="E-mail"
                required
              ></v-text-field>
              <v-text-field
                v-model="password"
                :rules="passRules"
                label="Password"
                counter="25"
                required
              ></v-text-field>
              <v-btn
                :disabled="!valid"
                color="success"
                class="ma-4"
                @click="login"
              >
                Sign up
              </v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import firebase from "firebase";
import TopBar from "@/components/outer/TopBar.vue";
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "Login",
  components: {
    TopBar
  },
  data: () => ({
    valid: false,
    email: "",
    password: "",
    emailRules: [
      v => !!v || "E-mail is required",
      v => /.+@.+/.test(v) || "E-mail must be valid"
    ],
    passRules: [
      v => !!v || "Password  is required",
      v => v.length <= 25 || "Password must be less than 25 characters",
      v => v.length > 5 || "Password must be more than 5 characters"
    ]
  }),
  computed: {
    ...mapGetters(["getColor"])
  },
  methods: {
    login: function() {
      console.log("logging in");
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(user => {
          console.log(user);
          this.CREATE_SNACKBAR({
            state: true,
            color: "success",
            content: "Logged in"
          });
          this.$router.replace("/");
        })
        .catch(err => {
          this.CREATE_SNACKBAR({
            state: true,
            color: "error",
            content: err.message
          });
        });
    },
    ...mapMutations(["CREATE_SNACKBAR"])
  }
};
</script>

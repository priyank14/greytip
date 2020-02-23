<template>
  <v-container>
    <v-row>
      <v-col cols="10" style="margin: auto;">
        <v-card
          class="mx-auto"
          :style="'background-color:' + getColor.cardColor"
          :dark="$vuetify.theme.dark"
          outlined
        >
          <v-list-item three-line>
            <v-list-item-content>
              <v-list-item-subtitle class="title pt-1">
                Create Speech
              </v-list-item-subtitle>
              <v-list-item-subtitle class="title pt-1">
                <v-form v-model="valid">
                  <v-row>
                    <v-col cols="12" sm="11" md="10" style="margin:auto">
                      <v-text-field
                        label="Speech Name"
                        outlined
                        v-model="name"
                        :counter="10"
                        :rules="nameRules"
                      ></v-text-field>
                      <v-textarea
                        outlined
                        name="input-7-4"
                        label="Speech text"
                        v-model="text"
                        :rules="notEmptyRule"
                      ></v-textarea>
                      <v-text-field
                        label="Author"
                        outlined
                        v-model="author"
                        :counter="20"
                        :rules="authorrules"
                      ></v-text-field>
                      <v-combobox
                        v-model="keywords"
                        :items="[]"
                        label="Add key words(Press Enter to save keywords)"
                        multiple
                        chips
                      ></v-combobox>
                    </v-col>
                  </v-row>
                </v-form>
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-card-actions>
            <v-btn
              color="primary"
              style="margin: auto;"
              :disabled="!valid"
              @click="submitSpeech()"
            >
              Submit
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";

export default {
  name: "NewSpeech",
  data: () => ({
    valid: false,
    name: "",
    text: "",
    author: "",
    keywords: [],
    date: Math.floor(Date.now() / 1000),
    menu: false,
    nameRules: [
      v => !!v || "Name is required",
      v => v.length <= 10 || "Name must be less than 10 characters"
    ],
    notEmptyRule: [v => !!v || "Speech text is required"],
    authorrules: [
      v => !!v || "Author name is required",
      v => v.length <= 20 || "Author name must be less than 20 characters"
    ]
    // speech: null
  }),
  computed: {
    ...mapGetters(["getColor"])
  },
  methods: {
    submitSpeech: function() {
      let obj = {
        name: this.name,
        text: this.text,
        author: this.author,
        keywords: this.keywords,
        date: new Date()
      };
      this.CREATE_SPEECH(obj);
    },
    ...mapMutations(["CREATE_SPEECH"])
  }
};
</script>

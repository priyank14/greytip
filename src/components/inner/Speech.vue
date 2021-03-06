<template>
  <v-container v-if="selectedSpeechId">
    <v-row>
      <v-col cols="10" style="margin: auto;">
        <v-card
          class="mx-auto"
          :style="'background-color:' + getColor.cardColor"
          outlined
        >
          <v-list-item three-line :dark="$vuetify.theme.dark">
            <v-list-item-content>
              <div class="overline mb-4">
                <template v-if="!editMode">
                  {{ speech.name }}
                </template>
                <template v-else>
                  <v-text-field
                    label="Speech Name"
                    outlined
                    v-model="editData.name"
                    :counter="10"
                    :rules="nameRules"
                  ></v-text-field>
                </template>
              </div>
              <v-list-item-subtitle class="title mb-1">
                <template v-if="!editMode">
                  {{ speech.text }}
                </template>
                <template v-else>
                  <div class="pt-1">
                    <v-textarea
                      outlined
                      name="input-7-4"
                      label="Speech text"
                      v-model="editData.text"
                      :rules="notEmptyRule"
                    ></v-textarea>
                  </div>
                </template>
              </v-list-item-subtitle>
              <v-list-item-subtitle>
                <template v-if="!editMode">
                  <v-chip-group>
                    <v-chip
                      v-for="(keyword, index) in speech.keywords"
                      :key="index"
                    >
                      {{ keyword }}
                    </v-chip>
                  </v-chip-group>
                </template>
                <template v-else>
                  <v-combobox
                    v-model="editData.keywords"
                    :items="[]"
                    label="Add key words(Press Enter to save keywords)"
                    multiple
                    chips
                  ></v-combobox>
                </template>
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-card-actions>
            <template v-if="!editMode">
              <v-list-item class="grow">
                <v-list-item-content>
                  <v-list-item-title>
                    {{ speech.author }}
                    <div class="caption">- {{ getDate(speech.date) }}</div>
                  </v-list-item-title>
                </v-list-item-content>

                <v-row align="center" justify="end">
                  <v-btn text icon @click="editSpeech">
                    <v-icon class="mr-1">mdi-pencil</v-icon>
                  </v-btn>
                  <v-btn text icon @click="deleteSpeech">
                    <v-icon class="mr-1">mdi-delete</v-icon>
                  </v-btn>
                  <v-btn text icon>
                    <v-icon class="mr-1">mdi-share-variant</v-icon>
                  </v-btn>
                </v-row>
              </v-list-item>
            </template>
            <template v-else>
              <v-row>
                <v-col>
                  <v-text-field
                    label="Author"
                    outlined
                    v-model="editData.author"
                    :counter="20"
                    :rules="authorrules"
                  ></v-text-field>
                </v-col>
                <v-col cols="6" md="6" sm="12">
                  <v-row align="center" justify="center">
                    <v-btn
                      color="primary"
                      :loading="loading"
                      @click="saveEditAction"
                    >
                      Submit
                    </v-btn>
                    <v-btn color="error" class="mx-2" @click="cancelEditAction">
                      Cancel
                    </v-btn>
                  </v-row>
                </v-col>
              </v-row>
              <div class="pt-1"></div>
            </template>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
  <NewSpeech v-else />
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";
var moment = require("moment");
import db from "../firebaseInit";

import NewSpeech from "@/components/inner/NewSpeech.vue";

export default {
  name: "Speech",
  components: {
    NewSpeech
  },
  data: () => ({
    valid: true,
    loading: false,
    editMode: false,
    editData: {},
    nameRules: [
      v => !!v || "Name is required",
      v => v.length <= 10 || "Name must be less than 10 characters"
    ],
    notEmptyRule: [v => !!v || "Speech text is required"],
    authorrules: [
      v => !!v || "Author name is required",
      v => v.length <= 20 || "Author name must be less than 20 characters"
    ]
  }),
  computed: {
    speech: function() {
      const index = element => element.id == this.selectedSpeechId;
      return this.speeches[this.speeches.findIndex(index)];
    },
    ...mapState(["speeches", "selectedSpeechId"]),
    ...mapGetters(["getColor"])
  },
  methods: {
    getDate: function(date) {
      return moment(date, "X").fromNow();
    },
    deleteSpeech: function() {
      db.collection("speech")
        .doc(this.speech.id)
        .delete()
        .then(() => {
          this.DELETE_SELECTED_SPEECH();
          this.CREATE_SNACKBAR({
            state: true,
            color: "error",
            content: "Speech deleted"
          });
        });
    },
    editSpeech: function() {
      this.editData = { ...this.speech };
      this.editMode = true;
    },
    saveEditAction: function() {
      this.loading = true;
      db.collection("speech")
        .doc(this.speech.id)
        .set(this.editData)
        .then(() => {
          this.EDIT_SPEECH(this.editData);
          this.CREATE_SNACKBAR({
            state: true,
            color: "success",
            content: "Speech edited"
          });
          this.loading = false;
          this.editMode = false;
        });
    },
    cancelEditAction: function() {
      this.editMode = false;
    },
    ...mapMutations([
      "DELETE_SELECTED_SPEECH",
      "EDIT_SPEECH",
      "CREATE_SNACKBAR"
    ])
  }
};
</script>


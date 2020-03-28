import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loader: false,
    snackbar: {
      state: false,
      color: "",
      content: ""
    },
    speeches: [],
    search: "",
    selectedSpeechId: null,
    createMode: false,
    selectedTheme: "Dark",
    themes: {
      Light: {
        navColor: "#f7f7f7",
        toolbarColor: "#f7f7f7",
        backColor: "#e0e4eb",
        cardColor: "#F5F5F5"
      },
      Dark: {
        navColor: "#2f3136",
        toolbarColor: "#36393f",
        backColor: "#36393f",
        cardColor: "#2f3136"
      },
      Cosmic: {
        navColor: "#323159",
        toolbarColor: "#323159",
        backColor: "#1b1d36",
        cardColor: "#323159"
      }
    }
  },
  getters: {
    getSnack: state => state.snackbar,
    getThemes: state => Object.keys(state.themes),
    getColor: state => {
      return state.themes[state.selectedTheme];
    }
  },
  mutations: {
    CHANGE_SELECTED_SPEECH: (state, payload) => {
      state.selectedSpeechId = payload;
    },
    DELETE_SELECTED_SPEECH: state => {
      //const indexFunc = element => element.id == state.selectedSpeechId;
      const index = state.speeches.findIndex(
        element => element.id == state.selectedSpeechId
      );
      state.speeches.splice(index, 1);
      if (state.speeches.length > 0) {
        state.selectedSpeechId = state.speeches[0].id;
      } else {
        state.selectedSpeechId = null;
      }
    },
    SET_SPEECHES: (state, payload) => {
      state.speeches = payload;
    },
    CREATE_SPEECH: (state, payload) => {
      state.speeches.push(payload);
      state.selectedSpeechId = payload.id;
      state.createMode = false;
    },
    SET_CREATE_MODE: (state, payload) => {
      state.createMode = payload;
    },
    SET_SEARCH: (state, payload) => {
      state.search = payload;
    },
    EDIT_SPEECH: (state, payload) => {
      const index = state.speeches.findIndex(
        element => element.id == state.selectedSpeechId
      );
      state.speeches.splice(index, 1, payload);
    },
    SET_LOADER: (state, payload) => {
      state.loader = payload;
    },
    CREATE_SNACKBAR(state, payload) {
      state.snackbar.state = true;
      state.snackbar.color = payload.color;
      state.snackbar.content = payload.content;
    },
    SET_THEME(state, payload) {
      window.localStorage.setItem("theme", payload);
      state.selectedTheme = payload;
    }
  },
  actions: {},
  modules: {}
});

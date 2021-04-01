import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
// import router from "./router";
import UserService from "../services/UserService";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    host: "http://localhost:8081",
    token: "",
    role: "",
  },
  mutations: {
    SET_USER_DATA(state, userData) {
      state.user = userData;
      localStorage.setItem("user", JSON.stringify(userData));
      axios.defaults.headers.common["Authorization"] = `Bearer ${userData.token}`;
    },
    LOGOUT() {
      localStorage.removeItem("user");
      location.reload();
    },
  },
  actions: {
    login({ commit }, credentials) {
      return UserService.getAuthLogin(credentials)
        .then((res) => {
          commit("SET_USER_DATA", res);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    logout({ commit }) {
      commit("LOGOUT");
    },
  },
  getters: {
    loggedIn(state) {
      return !!state.user;
    },
  },
});

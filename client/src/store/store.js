import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
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
    UPDATE_USER_DATA(state, user) {
      state.user.data.email = user.email;
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
    // updateUserData({ commit }, user) {
    //   commit("UPDATE_USER_DATA", user);
    // },
  },
  getters: {
    loggedIn(state) {
      return !!state.user;
    },
    loggedUserInfo(state) {
      return {
        id: state.user.data.id,
        account: state.user.data.account,
        email: state.user.data.email,
      };
    },
  },
});

import axios from "axios";
import UserService from "../../services/UserService";

const getDefaultState = () => {
  return {
    host: "http://localhost:8081",
    token: "",
    role: "",
    user: "",
  };
};

export default {
  namespaced: true,
  state: getDefaultState(),
  mutations: {
    SET_USER_STATE(state, userData) {
      state.user = userData;
      axios.defaults.headers.common["Authorization"] = `Bearer ${userData.token}`;
    },
    UPDATE_USER_STATE(state, user) {
      state.user.data.email = user.email;
    },
    LOGOUT() {},
    RESET_STATE(state) {
      Object.assign(state, getDefaultState());
      location.reload();
    },
  },
  actions: {
    login({ commit }, credentials) {
      return UserService.getAuthLogin(credentials).then((res) => {
        commit("SET_USER_STATE", res);
      });
    },
    updateUserState({ commit }, user) {
      commit("UPDATE_USER_STATE", user);
    },
    logout({ commit }) {
      commit("RESET_STATE");
    },
    // resetState({ commit }) {
    //   commit("RESET_STATE");
    // },
  },
  // getters: {
  //   loggedIn(state) {
  //     return !!state.user;
  //   },
  //   loggedUserInfo(state) {
  //     return {
  //       id: state.user.data.id,
  //       account: state.user.data.account,
  //       email: state.user.data.email,
  //     };
  //   },
  // },
};

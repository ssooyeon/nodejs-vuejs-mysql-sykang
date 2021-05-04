import axios from "axios";
import UserService from "../../services/UserService";

const getDefaultState = () => {
  return {
    host: "http://localhost:8081",
    token: "",
    role: "",
    user: "",
    errorMessage: "",
  };
};

export default {
  namespaced: true,
  state: getDefaultState(),
  mutations: {
    // 로그인한 사용자 정보를 저장
    SET_USER_STATE(state, userData) {
      state.errorMessage = "";
      state.user = userData;
      axios.defaults.headers.common["Authorization"] = `Bearer ${userData.token}`;
    },
    // 비밀번호를 제외한 사용자 정보 업데이트 (내 정보 수정)
    UPDATE_USER_STATE(state, user) {
      state.user.data.email = user.email;
    },
    // 로그아웃
    LOGOUT() {},
    // 로그인/회원정보 수정 시 메세지 알림
    SET_ERROR_MESSAGE(state, message) {
      state.errorMessage = message;
    },
    // 사용자 정보 초기화
    RESET_STATE(state) {
      Object.assign(state, getDefaultState());
      location.reload();
    },
  },
  actions: {
    // 로그인
    login({ commit }, credentials) {
      return UserService.getAuthLogin(credentials).then((res) => {
        console.log(res);
        if (res.data !== null) {
          commit("SET_USER_STATE", res);
        } else {
          const message = "Incorrect account and/or password.";
          commit("SET_ERROR_MESSAGE", message);
        }
      });
    },
    // 사용자 정보 수정
    updateUserState({ commit }, user) {
      commit("UPDATE_USER_STATE", user);
    },
    // 로그아웃
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

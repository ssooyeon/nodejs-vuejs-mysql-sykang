import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import userStore from "./module/user";

Vue.use(Vuex);

export const store = new Vuex.Store({
  modules: { userStore: userStore },
  plugins: [
    createPersistedState({
      paths: ["userStore"], // modules 중에 여기에 적은 module만 저장
    }),
  ],
});

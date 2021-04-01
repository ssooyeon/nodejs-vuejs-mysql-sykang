import Vue from "vue";
import VueRouter from "vue-router";
import VueSimpleAlert from "vue-simple-alert";
import App from "./App";
import routes from "./router";
import { store } from "./store/store";
import vuetify from "./plugins/vuetify";
import GlobalComponents from "./globalComponents";
import GlobalDirectives from "./globalDirectives";
import MaterialDashboard from "./material-dashboard";
import Chartist from "chartist";
import axios from "axios";

const router = new VueRouter({
  routes,
  linkExactActiveClass: "nav-item active",
});

Vue.prototype.$Chartist = Chartist;

Vue.use(VueRouter);
Vue.use(VueSimpleAlert);
Vue.use(MaterialDashboard);
Vue.use(GlobalComponents);
Vue.use(GlobalDirectives);

new Vue({
  el: "#app",
  render: (h) => h(App),
  router,
  store,
  vuetify,
  data: {
    Chartist: Chartist,
  },
  created() {
    const userString = localStorage.getItem("user");
    if (userString) {
      const userData = JSON.parse(userString);
      this.$store.commit("SET_USER_DATA", userData);
    }
    axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response.state === 401) {
          this.$store.dispatch("logout");
        }
        return Promise.reject(error);
      }
    );
  },
});

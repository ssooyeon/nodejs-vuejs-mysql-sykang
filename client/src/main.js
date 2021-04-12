import Vue from "vue";
import VueRouter from "vue-router";
import VueSimpleAlert from "vue-simple-alert";
import App from "./App";
import routes from "./router";
import { store } from "./store/index";
import vuetify from "./plugins/vuetify";
import GlobalComponents from "./globalComponents";
import GlobalDirectives from "./globalDirectives";
import MaterialDashboard from "./material-dashboard";
import Chartist from "chartist";
import axios from "axios";
import VueMoment from "vue-moment";

const router = new VueRouter({
  mode: "history",
  routes,
  // linkExactActiveClass: "nav-item active",
  linkActiveClass: "nav-item active",
});

Vue.prototype.$Chartist = Chartist;

Vue.use(VueRouter);
Vue.use(VueSimpleAlert);
Vue.use(MaterialDashboard);
Vue.use(GlobalComponents);
Vue.use(GlobalDirectives);
Vue.use(VueMoment);

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

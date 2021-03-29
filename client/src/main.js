import Vue from "vue";
import VueRouter from "vue-router";
import VueSimpleAlert from "vue-simple-alert";
import App from "./App";
import routes from "./router";
import vuetify from "./plugins/vuetify";
import GlobalComponents from "./globalComponents";
import GlobalDirectives from "./globalDirectives";
import MaterialDashboard from "./material-dashboard";

import Chartist from "chartist";

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
  vuetify,
  data: {
    Chartist: Chartist,
  },
});

<template>
  <div class="wrapper" :class="{ 'nav-open': $sidebar.showSidebar }">
    <side-bar :sidebar-item-color="sidebarBackground" :sidebar-background-image="sidebarBackgroundImage">
      <sidebar-link to="/dashboard">
        <md-icon>dashboard</md-icon>
        <p>Dashboard</p>
      </sidebar-link>
      <sidebar-link to="/board">
        <md-icon>content_paste</md-icon>
        <p>Board</p>
      </sidebar-link>
      <sidebar-link to="/table">
        <md-icon>list</md-icon>
        <p>Table list</p>
      </sidebar-link>
      <sidebar-link v-if="user" to="/myProfile">
        <md-icon>person</md-icon>
        <p>My Profile</p>
      </sidebar-link>
    </side-bar>

    <div class="main-panel">
      <top-navbar></top-navbar>
      <dashboard-content> </dashboard-content>
      <content-footer v-if="!$route.meta.hideFooter"></content-footer>
    </div>
  </div>
</template>

<script>
  import { mapState } from "vuex";

  import TopNavbar from "./TopNavbar.vue";
  import ContentFooter from "./ContentFooter.vue";
  import DashboardContent from "./Content.vue";

  export default {
    components: {
      TopNavbar,
      DashboardContent,
      ContentFooter,
    },
    computed: {
      ...mapState("userStore", ["user"]),
    },
    data() {
      return {
        sidebarBackground: "green",
        sidebarBackgroundImage: require("@/assets/img/sidebar-1.jpg"),
      };
    },
  };
</script>

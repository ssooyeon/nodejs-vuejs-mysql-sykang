<template>
  <md-toolbar md-elevation="0" class="md-transparent">
    <div class="md-toolbar-row">
      <div class="md-toolbar-section-start">
        <h3 class="md-title">{{ $route.name }}</h3>
      </div>
      <div class="md-toolbar-section-end">
        <md-button class="md-just-icon md-simple md-toolbar-toggle" :class="{ toggled: $sidebar.showSidebar }" @click="toggleSidebar">
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </md-button>

        <div class="md-collapse">
          <div class="md-autocomplete">
            <md-autocomplete class="search" v-model="selectedEmployee" :md-options="employees">
              <label>Search...</label>
            </md-autocomplete>
          </div>
          <md-list>
            <md-list-item href="/">
              <i class="material-icons">dashboard</i>
              <p class="hidden-lg hidden-md">Dashboard</p>
            </md-list-item>
            <li class="md-list-item">
              <a class="md-list-item-router md-list-item-container md-button-clean dropdown">
                <div class="md-list-item-content">
                  <drop-down>
                    <md-button slot="title" class="md-button md-just-icon md-simple" data-toggle="dropdown">
                      <md-icon>notifications</md-icon>
                      <span class="notification">5</span>
                      <p class="hidden-lg hidden-md">Notifications</p>
                    </md-button>
                    <ul class="dropdown-menu dropdown-menu-right">
                      <li><a href="#">notification 1</a></li>
                      <li><a href="#">notification 2</a></li>
                      <li><a href="#">notification 3</a></li>
                      <li><a href="#">notification 4</a></li>
                      <li><a href="#">notification 5</a></li>
                    </ul>
                  </drop-down>
                </div>
              </a>
            </li>

            <md-list-item v-if="!user" href="/login">
              <div>LOGIN</div>
            </md-list-item>
            <md-list-item v-else href="/myProfile">
              <i class="material-icons">person</i>
              <div>{{ user.data.account }}</div>
            </md-list-item>
            <md-list-item v-if="user" href="#" @click="logout">
              <div>LOGOUT</div>
            </md-list-item>
          </md-list>
        </div>
      </div>
    </div>
  </md-toolbar>
</template>

<script>
  import { mapState, mapActions } from "vuex";

  export default {
    computed: {
      ...mapState("userStore", ["user"]), // store에 저장된 현재 사용자 정보를 가져옴
    },
    data() {
      return {
        selectedEmployee: null,
        employees: ["Option1", "Option2", "Option3", "Option4", "Option5", "Option6", "Option7", "Option8"],
      };
    },
    methods: {
      ...mapActions({ logout: "userStore/logout" }), // store에 저장된 액션을 가져옴
      toggleSidebar() {
        this.$sidebar.displaySidebar(!this.$sidebar.showSidebar);
      },
    },
  };
</script>

<style lang="css"></style>

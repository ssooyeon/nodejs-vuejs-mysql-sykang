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
            <md-list-item href="#/">
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

            <md-list-item v-if="!loggedIn" href="#/login">
              <div>LOGIN</div>
            </md-list-item>
            <md-list-item v-else href="#/user" @click="logout">
              <i class="material-icons">person</i>
              <div>{{ loggedUserName }}</div>
            </md-list-item>
            <md-list-item v-if="!loggedIn" href="#/register">
              <div>REGISTER</div>
            </md-list-item>
            <md-list-item v-else href="#" @click="logout">
              <div>LOGOUT</div>
            </md-list-item>
          </md-list>
        </div>
      </div>
    </div>
  </md-toolbar>
</template>

<script>
  import { authComputed } from "../../store/helpers";
  export default {
    computed: {
      ...authComputed,
    },
    data() {
      return {
        selectedEmployee: null,
        employees: ["Option1", "Option2", "Option3", "Option4", "Option5", "Option6", "Option7", "Option8"],
      };
    },
    methods: {
      toggleSidebar() {
        this.$sidebar.displaySidebar(!this.$sidebar.showSidebar);
      },
      logout() {
        this.$store.dispatch("logout");
      },
    },
  };
</script>

<style lang="css"></style>

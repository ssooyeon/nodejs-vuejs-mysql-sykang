<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100">
        <md-button class="md-raised md-info" @click="viewEdit"><v-icon small class="mr-1">mdi-pencil</v-icon>Edit</md-button>
        <md-button class="md-raised md-info" @click="deleteBoard"><v-icon small class="mr-1">mdi-delete</v-icon>Delete</md-button>
      </div>
      <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100">
        <stats-card class="none-header">
          <template slot="content">
            <p class="category">by <strong>sykang</strong></p>
            <h3 class="title">How Changes Are Tracked</h3>
            <hr />
            <br />
            <h5 class="content">
              When you pass a plain JavaScript object to a Vue instance as its data option, Vue will walk through all of its properties and convert
              them to getter/setters using Object.defineProperty. This is an ES5-only and un-shimmable feature, which is why Vue doesn’t support IE8
              and below. The getter/setters are invisible to the user, but under the hood they enable Vue to perform dependency-tracking and
              change-notification when properties are accessed or modified. One caveat is that browser consoles format getter/setters differently when
              converted data objects are logged, so you may want to install vue-devtools for a more inspection-friendly interface. Every component
              instance has a corresponding watcher instance, which records any properties “touched” during the component’s render as dependencies.
              Later on when a dependency’s setter is triggered, it notifies the watcher, which in turn causes the component to re-render.
            </h5>
          </template>
          <template slot="footer">
            <div class="stats">
              <md-icon>update</md-icon>
              2021.04.12 12:43:11 updated
            </div>
          </template>
        </stats-card>
      </div>
      <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100">
        <md-button class="md-raised md-default" @click="back"><v-icon small class="mr-1">mdi-back</v-icon>Back</md-button>
      </div>
    </div>
  </div>
</template>

<script>
  import { StatsCard } from "@/components";
  export default {
    name: "board-detail",
    components: {
      StatsCard,
    },
    data() {
      return {};
    },
    created() {
      this.initialize();
    },
    methods: {
      initialize() {},
      viewEdit() {
        this.$router.push("/board/edit");
      },
      deleteBoard() {},
      back() {
        this.$router.push("/board");
      },
    },
  };
</script>

<style scoped>
  .title,
  .content {
    text-align: left;
  }
</style>

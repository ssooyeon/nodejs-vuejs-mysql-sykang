<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100">
        <md-button class="md-raised md-success" @click="goToAddTutorialView">Add</md-button>
        <md-card class="md-card-plain">
          <md-card-header data-background-color="green">
            <h4 class="title">Tutorials</h4>
            <p class="category">Sample tutorial list</p>
          </md-card-header>
          <md-card-content>
            <tutorial-table table-header-color="green"></tutorial-table>
          </md-card-content>
        </md-card>
      </div>
    </div>
  </div>
</template>

<script>
  import { TutorialTable } from "@/components";

  export default {
    name: "table-list",
    components: {
      TutorialTable,
    },
    data() {
      return {};
    },
    methods: {
      goToAddTutorialView() {
        this.$router.push("/table/add-tutorial");
      },
    },
  };
</script>

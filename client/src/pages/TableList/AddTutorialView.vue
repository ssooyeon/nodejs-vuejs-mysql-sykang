<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100">
        <p class="headline">Add Tutorial</p>
        <div>
          <v-form ref="form" lazy-validation>
            <v-text-field v-model="tutorial.title" :rules="[(v) => !!v || 'Title is required']" label="Title" required></v-text-field>
            <v-text-field
              v-model="tutorial.description"
              :rules="[(v) => !!v || 'Description is reuired']"
              label="Description"
              required
            ></v-text-field>
          </v-form>
          <md-button class="md-raised md-success" @click="goToTutorialListView">Back</md-button>
          <md-button type="submit" class="md-raised md-success" @click="saveTutorial">Submit</md-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import TutorialDataService from "../../services/TutorialDataService";

  export default {
    name: "add-tutorial-form",
    data() {
      return {
        tutorial: {
          id: null,
          title: "",
          description: "",
          published: false,
        },
      };
    },
    methods: {
      goToTutorialListView() {
        this.$router.push("/table");
      },

      saveTutorial() {
        var data = {
          title: this.tutorial.title,
          description: this.tutorial.description,
        };
        TutorialDataService.create(data)
          .then((res) => {
            this.tutorial.id = res.data.id;
            this.$fire({
              title: "",
              text: "Tutorial was created successfully.",
              type: "success",
              timer: 3000,
            }).then(() => {
              this.newTutorial();
              this.goToTutorialListView();
            });
          })
          .catch((err) => {
            console.log(err);
          });
      },

      newTutorial() {
        this.tutorial = {};
      },
    },
  };
</script>

<style scoped>
  .submit-form {
    max-width: 300px;
  }
</style>

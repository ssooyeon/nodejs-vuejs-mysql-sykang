<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100">
        <p class="headline">Edit Tutorial</p>
        <v-form ref="form" lazy-validation>
          <v-text-field v-model="currentTutorial.title" :rules="[(v) => !!v || 'Title is required.']" label="Title" required></v-text-field>
          <v-text-field
            v-model="currentTutorial.description"
            :rules="[(v) => !!v || 'Description is required.']"
            label="Description"
            required
          ></v-text-field>
          <label><strong>Status: </strong></label>
          {{ currentTutorial.published ? "Published" : "Pending" }}
          <v-divider class="my-5"></v-divider>
          <md-button v-if="currentTutorial.published" class="md-raised md-success" @click="updatePublished(false)">UnPublish</md-button>
          <md-button v-else class="md-raised md-success" @click="updatePublished(true)">Publish</md-button>
          <md-button class="md-raised md-success" @click="updateTutorial">Update</md-button>
          <md-button class="md-raised md-success" @click="deleteTutorial">Delete</md-button>
        </v-form>
      </div>
    </div>
  </div>
</template>

<script>
  import TutorialDataService from "../../services/TutorialDataService";
  export default {
    name: "tutorial",
    data() {
      return {
        currentTutorial: {
          id: "",
          title: "",
          description: "",
          published: false,
        },
      };
    },
    methods: {
      getTutorial(id) {
        TutorialDataService.get(id)
          .then((res) => {
            this.currentTutorial = res.data;
            console.log(res.data);
          })
          .catch((e) => {
            console.log(e);
          });
      },

      updatePublished(status) {
        var data = {
          id: this.currentTutorial.id,
          title: this.currentTutorial.title,
          description: this.currentTutorial.description,
          published: status,
        };
        TutorialDataService.update(this.currentTutorial.id, data)
          .then((res) => {
            this.currentTutorial.published = status;
            console.log(res.data);
          })
          .catch((e) => {
            console.log(e);
          });
      },

      updateTutorial() {
        TutorialDataService.update(this.currentTutorial.id, this.currentTutorial)
          .then(() => {
            this.$fire({
              title: "",
              text: "The tutorial was updated successfully.",
              type: "success",
              timer: 3000,
            }).then(() => {
              this.$router.push("/table");
            });
          })
          .catch((e) => {
            console.log(e);
          });
      },

      deleteTutorial() {
        this.$confirm("Are you sure delete this tutorlal?").then(() => {
          TutorialDataService.delete(this.currentTutorial.id)
            .then(() => {
              this.$fire({
                title: "",
                text: "The tutorial was deleted successfully.",
                type: "success",
                timer: 3000,
              }).then(() => {
                this.$router.push("/table");
              });
            })
            .catch((e) => {
              console.log(e);
            });
        });
      },
    },

    mounted() {
      this.getTutorial(this.$route.params.id);
    },
  };
</script>

<style scoped>
  .edit-form {
    max-width: 300px;
    margin: auto;
  }
</style>

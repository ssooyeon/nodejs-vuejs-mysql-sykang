<template>
  <div>
    <md-table v-model="tutorials" :table-header-color="tableHeaderColor">
      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="Title">{{ item.title }}</md-table-cell>
        <md-table-cell md-label="Description">{{ item.description }}</md-table-cell>
        <md-table-cell md-label="Status">{{ item.status }}</md-table-cell>
        <md-table-cell md-label="Actions">
          <md-button class="md-just-icon md-simple md-info" @click="editTutorial(item.id)">
            <md-icon>edit</md-icon>
          </md-button>
          <md-button class="md-just-icon md-simple md-danger" @click="deleteTutorial(item.id)">
            <md-icon>delete</md-icon>
          </md-button>
        </md-table-cell>
      </md-table-row>
    </md-table>
  </div>
</template>

<script>
  import TutorialDataService from "../../services/TutorialDataService";
  export default {
    name: "tutorial-table",
    props: {
      tableHeaderColor: {
        type: String,
        default: "",
      },
    },
    data() {
      return {
        selected: [],
        tutorials: [],
      };
    },
    methods: {
      retrieveTutorials() {
        TutorialDataService.getAll()
          .then((response) => {
            this.tutorials = response.data.map(this.getDisplayTutorial);
            console.log(response.data);
          })
          .catch((e) => {
            console.log(e);
          });
      },

      refreshList() {
        this.retrieveTutorials();
      },

      removeAllTutorials() {
        TutorialDataService.deleteAll()
          .then((response) => {
            console.log(response.data);
            this.refreshList();
          })
          .catch((e) => {
            console.log(e);
          });
      },

      searchTitle() {
        TutorialDataService.findByTitle(this.title)
          .then((response) => {
            this.tutorials = response.data.map(this.getDisplayTutorial);
            console.log(response.data);
          })
          .catch((e) => {
            console.log(e);
          });
      },

      editTutorial(id) {
        this.$router.push({ name: "tutorial-details", params: { id: id } });
      },

      deleteTutorial(id) {
        this.$confirm("Are you sure delete this tutorlal?").then(() => {
          TutorialDataService.delete(id)
            .then(() => {
              this.$fire({
                title: "",
                text: "The tutorial was deleted successfully.",
                type: "success",
                timer: 3000,
              }).then(() => {
                this.refreshList();
              });
            })
            .catch((e) => {
              console.log(e);
            });
        });
      },

      getDisplayTutorial(tutorial) {
        return {
          id: tutorial.id,
          title: tutorial.title.length > 30 ? tutorial.title.substr(0, 30) + "..." : tutorial.title,
          description: tutorial.description.length > 30 ? tutorial.description.substr(0, 30) + "..." : tutorial.description,
          status: tutorial.published ? "Published" : "Pending",
        };
      },
    },
    mounted() {
      this.retrieveTutorials();
    },
  };
</script>

<style scoped>
  .md-button {
    height: auto !important;
    margin: 0;
  }
</style>

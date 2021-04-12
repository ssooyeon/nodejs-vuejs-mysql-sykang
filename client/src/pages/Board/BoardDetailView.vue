<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100">
        <md-button class="md-raised md-info" @click="viewEdit(currentBoard.id)"><v-icon small class="mr-1">mdi-pencil</v-icon>Edit</md-button>
        <md-button class="md-raised md-info" @click="deleteBoard(currentBoard.id)"><v-icon small class="mr-1">mdi-delete</v-icon>Delete</md-button>
      </div>
      <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100">
        <stats-card class="none-header" v-model="currentBoard">
          <template slot="content">
            <p class="category">
              by <strong>{{ currentBoard.writer }}</strong>
            </p>
            <h3 class="title">{{ currentBoard.title }}</h3>
            <hr />
            <br />
            <h5 class="content">
              {{ currentBoard.content }}
            </h5>
          </template>
          <template slot="footer">
            <div class="stats">
              <md-icon>update</md-icon>
              {{ $moment(currentBoard.createdAt, "YYYY-MM-DD HH:mm:ss") }} updated
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
  import BoardService from "../../services/BoardService";
  import { StatsCard } from "@/components";
  export default {
    name: "board-detail",
    components: {
      StatsCard,
    },
    created() {
      this.initialize(this.$route.params.id);
    },
    data() {
      return {
        currentBoard: {
          id: "",
          title: "",
          content: "",
          createdAt: "",
          writer: "",
        },
      };
    },
    methods: {
      initialize(id) {
        BoardService.get(id)
          .then((res) => {
            this.currentBoard = {
              id: res.data.id,
              title: res.data.title,
              content: res.data.content,
              createdAt: res.data.createdAt,
              writer: res.data.user.account,
            };
          })
          .catch((e) => {
            console.log(e);
          });
      },
      viewEdit(id) {
        this.$router.push(`/board/edit/${id}`);
      },
      deleteBoard(id) {
        this.$fire({
          title: "",
          text: "Are you sure delete this board?",
          type: "warning",
          showCancelButton: true,
        })
          .then((res) => {
            if (res.value) {
              BoardService.delete(id)
                .then(() => {
                  this.$fire({
                    title: "",
                    text: "Delete successfully.",
                    type: "success",
                  }).then(() => {
                    this.back();
                  });
                })
                .catch((e) => {
                  console.log(e);
                });
            }
          })
          .catch((e) => {
            console.log(e);
          });
      },
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

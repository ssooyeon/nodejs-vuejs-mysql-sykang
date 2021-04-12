<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100">
        <md-button class="md-raised md-info" @click="viewAdd"><v-icon small class="mr-1">mdi-plus</v-icon>Add</md-button>
      </div>
      <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-33" v-for="(item, index) in boards" :key="index">
        <stats-card class="none-header">
          <template slot="content">
            <p class="category">
              by <strong>{{ item.writer }}</strong>
            </p>
            <a class="board-title-link" @click="viewDetail(item.id)"
              ><h3 class="title">{{ item.title }}</h3></a
            >
            <h5 class="content">
              {{ item.content }}
            </h5>
          </template>
          <template slot="footer">
            <div class="stats">
              <md-icon>update</md-icon>
              {{ item.createdAt }}
            </div>
          </template>
        </stats-card>
      </div>
    </div>
  </div>
</template>

<script>
  import { StatsCard } from "@/components";
  import BoardService from "../../services/BoardService";
  export default {
    name: "board",
    components: {
      StatsCard,
    },
    data() {
      return {
        boards: [],
      };
    },
    created() {
      this.initialize();
    },
    methods: {
      initialize() {
        BoardService.getAll()
          .then((res) => {
            this.boards = res.data.map(this.getDisplayBoard);
          })
          .catch((e) => {
            console.log(e);
          });
      },
      getDisplayBoard(board) {
        return {
          id: board.id,
          title: board.title.length > 30 ? board.title.substr(0, 30) + "..." : board.title,
          content: board.content.length > 200 ? board.content.substr(0, 200) + "..." : board.content,
          createdAt: this.$moment(board.createdAt, "YYYY-MM-DD HH:mm:ss"),
          writer: board.user.account,
        };
      },
      viewAdd() {
        this.$router.push("/board/add");
      },
      viewDetail(id) {
        this.$router.push(`/board/${id}`);
      },
    },
  };
</script>

<style scoped>
  a.board-title-link {
    color: inherit !important;
  }
  a.board-title-link:hover {
    color: #e04f62 !important;
  }
  h5.content {
    height: 150px;
  }
</style>

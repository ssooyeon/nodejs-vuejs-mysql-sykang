<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100">
        <md-button class="md-raised md-info" @click="viewAdd"><v-icon small class="mr-1">mdi-plus</v-icon>Add</md-button>
      </div>
      <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100">
        <v-text-field v-model="search" label="Search (title)" class="mx-4" autocomplete="off" @keypress.enter="searchByTitle">
          <template v-slot:append>
            <md-button class="md-simple" @click="searchByTitle">
              <v-icon small class="mr-1">search</v-icon>
              Search
            </md-button>
          </template>
        </v-text-field>
      </div>
      <div v-if="isEmpty" class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100 text-center">
        <div>
          <h4>empty.</h4>
        </div>
      </div>
      <div v-else class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-33" v-for="(item, index) in boards" :key="index">
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

    <!-- <div class="text-center">
      <v-pagination v-model="currentPage" :length="totalPages"></v-pagination>
    </div> -->
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
        // currentPage: 1,
        // totalPages: 0,
        // pageSize: 3,
        search: "",
        isEmpty: false,
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
            if (this.boards.length === 0) {
              this.isEmpty = true;
            } else {
              this.isEmpty = false;
            }
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
      searchByTitle() {
        if (this.search === "") {
          this.initialize();
        } else {
          BoardService.findAllByTitle(this.search)
            .then((res) => {
              this.boards = res.data.map(this.getDisplayBoard);
              if (this.boards.length === 0) {
                this.isEmpty = true;
              } else {
                this.isEmpty = false;
              }
            })
            .catch((e) => {
              console.log(e);
            });
        }
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

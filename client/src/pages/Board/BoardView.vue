<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100">
        <md-button class="md-raised md-info" @click="viewAdd"><v-icon small class="mr-1">mdi-plus</v-icon>Add</md-button>
      </div>
      <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100">
        <v-text-field v-model="search" label="Search (title)" class="mx-4" autocomplete="off" @keypress.enter="initialize">
          <template v-slot:append>
            <md-button class="md-simple" @click="initialize">
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

    <div class="text-center">
      <v-pagination v-model="currentPage" :length="totalPages" @input="handlePageChange"></v-pagination>
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
        currentPage: 1,
        totalPages: 0,
        pageSize: 6,
        search: "",
        isEmpty: false,
      };
    },
    created() {
      this.initialize();
    },
    methods: {
      // 게시판 목록 설정
      initialize() {
        // 페이징을 위한 파라미터
        const params = this.getReqParams(this.search, this.currentPage, this.pageSize);
        BoardService.getAll(params)
          .then((res) => {
            this.totalPages = Math.ceil(res.data.count / this.pageSize);
            this.boards = res.data.rows.map(this.getDisplayBoard);
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
      // 게시판 목록을 표출할 때 custom하여 표출
      getDisplayBoard(board) {
        return {
          id: board.id,
          title: board.title.length > 30 ? board.title.substr(0, 30) + "..." : board.title,
          content: board.content.length > 200 ? board.content.substr(0, 200) + "..." : board.content,
          createdAt: this.$moment(board.createdAt).format("YYYY-MM-DD HH:mm:ss"),
          writer: board.user.account,
        };
      },
      // 게시판 생성 페이지로 이동
      viewAdd() {
        this.$router.push("/board/add");
      },
      // 게시판 상세보기 페이지로 이동
      viewDetail(id) {
        this.$router.push(`/board/${id}`);
      },
      // 페이징 번호가 변경될 때 현재 페이지를 업데이트하고, 게시판 목록을 업데이트
      handlePageChange(value) {
        this.currentPage = value;
        this.initialize();
      },
      // 페이징을 위한 파리미터 가져오기
      getReqParams(searchTitle, page, pageSize) {
        let params = {};
        if (searchTitle) {
          params["title"] = searchTitle;
        }
        if (page) {
          params["page"] = page - 1;
        }
        if (pageSize) {
          params["size"] = pageSize;
        }
        return params;
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

<style>
  .theme--light.v-pagination .v-pagination__item--active {
    background: #1867c0 !important;
    border-color: #1867c0 !important;
  }
</style>

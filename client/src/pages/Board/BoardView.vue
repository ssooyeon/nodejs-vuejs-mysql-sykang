<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100">
        <md-button class="md-raised md-info" @click="viewAdd"><v-icon small class="mr-1">mdi-plus</v-icon>Add</md-button>
      </div>
      <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-33">
        <stats-card class="none-header">
          <template slot="content">
            <p class="category">by <strong>sykang</strong></p>
            <a class="board-title-link" href="/board/detail/"><h3 class="title">10 Best Things to Do in Korea</h3></a>
            <h5 class="content">
              The Korean capital and the nation’s largest city, cosmopolitan Seoul is a fascinating blend of old and new Korea. From quaint laneway
              communities to neon-lit bar streets to serene temples...
            </h5>
          </template>
          <template slot="footer">
            <div class="stats">
              <md-icon>update</md-icon>
              Just Updated
            </div>
          </template>
        </stats-card>
      </div>
    </div>
  </div>
</template>

<script>
  import { StatsCard } from "@/components";
  export default {
    name: "board",
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
      viewAdd() {
        this.$router.push("/board/add");
      },
      viewDetail() {},
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
    height: 120px;
  }
</style>

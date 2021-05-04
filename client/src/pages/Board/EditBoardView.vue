<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100">
        <v-layout align-center="align-center" justify-center="justify-center">
          <v-flex class="board-form text-xs-center">
            <div class="display-4 mb-3"><v-icon class="mr-2" large="large">mdi-pencil</v-icon> Edit</div>
            <v-card light="light">
              <v-card-text>
                <div class="subheading">
                  <template>Edit board</template>
                </div>
                <v-form ref="form" class="board-form" autocomplete="off" @submit.prevent lazy-validation>
                  <v-col cols="12" sm="12">
                    <v-text-field v-model="boardForm.title" :rules="[(v) => !!v || 'title is required']" label="Title" required></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12">
                    <v-textarea
                      v-model="boardForm.content"
                      :rules="[(v) => !!v || 'content is required']"
                      label="Content"
                      auto-grow
                      outlined
                      rows="10"
                      row-height="25"
                      shaped
                      required
                    ></v-textarea>
                  </v-col>
                  <md-button class="md-raised md-default float-left" @click="back">Back</md-button>
                  <md-button type="submit" class="md-raised md-success" @click="save">Save</md-button>
                </v-form>
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </div>
    </div>
  </div>
</template>

<script>
  import BoardService from "../../services/BoardService";
  export default {
    name: "edit-board",
    components: {},
    data() {
      return {
        boardForm: {
          id: "",
          title: "",
          content: "",
        },
      };
    },
    created() {
      this.initialize(this.$route.params.id);
    },
    methods: {
      // 게시판 수정 설정
      initialize(id) {
        BoardService.get(id)
          .then((res) => {
            this.boardForm = {
              id: res.data.id,
              title: res.data.title,
              content: res.data.content,
            };
          })
          .catch((e) => {
            console.log(e);
          });
      },
      validate() {
        return this.$refs.form.validate();
      },
      // 게시판 수정
      save() {
        const validForm = this.validate();
        if (validForm) {
          BoardService.update(this.boardForm.id, this.boardForm)
            .then(() => {
              this.$fire({
                title: "",
                text: "Update successfully.",
                type: "success",
              }).then(() => {
                this.$router.push("/board");
              });
            })
            .catch((e) => {
              console.log(e);
            });
        }
      },
      back() {
        this.$router.push(`/board/${this.boardForm.id}`);
      },
    },
  };
</script>

<style scoped></style>

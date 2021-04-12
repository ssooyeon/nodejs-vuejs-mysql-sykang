<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100">
        <v-layout align-center="align-center" justify-center="justify-center">
          <v-flex class="board-form text-xs-center">
            <div class="display-4 mb-3"><v-icon class="mr-2" large="large">content_paste</v-icon> Add</div>
            <v-card light="light">
              <v-card-text>
                <div class="subheading">
                  <template>Add new board</template>
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
                  <md-button class="md-raised md-default float-left" outlined @click="back">Back</md-button>
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
  import { mapState } from "vuex";
  export default {
    name: "add-board",
    computed: {
      ...mapState("userStore", ["user"]),
    },
    data() {
      return {
        boardForm: {
          title: "",
          content: "",
        },
      };
    },
    methods: {
      validate() {
        return this.$refs.form.validate();
      },
      save() {
        const validForm = this.validate();
        if (validForm) {
          var data = {
            title: this.boardForm.title,
            content: this.boardForm.content,
            userId: this.user.data.id,
          };
          BoardService.create(data)
            .then(() => {
              this.$fire({
                title: "",
                text: "Create successfully.",
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
        this.$router.push("/board");
      },
    },
  };
</script>

<style>
  form.board-form .error--text {
    color: #ff5252 !important;
    caret-color: #ff5252 !important;
    font-weight: 500;
  }
</style>

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
                    <v-text-field v-model="boardForm.title" label="Title" required></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12">
                    <v-textarea label="Content" auto-grow outlined rows="10" row-height="25" shaped required></v-textarea>
                  </v-col>
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
  export default {
    name: "edit-board",
    components: {},
    data() {
      return {
        boardForm: {
          id: "",
          title: "",
          content: "",
          writer: "",
        },
      };
    },
    created() {
      this.initialize();
    },
    methods: {
      initialize() {},
      validate() {
        return this.$refs.form.validate();
      },
      save() {
        // const validForm = this.validate();
        // if (validForm) {
        // }
      },
    },
  };
</script>

<style scoped></style>

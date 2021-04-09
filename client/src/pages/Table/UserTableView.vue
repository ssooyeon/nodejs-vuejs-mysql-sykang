<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100">
        <v-data-table :headers="headers" :items="users" sort-by="createAt" class="v-data-table-user" data-app>
          <template v-slot:top>
            <v-dialog v-model="addDialog" max-width="500px" persistent>
              <template v-slot:activator="{ on, attrs }">
                <md-button class="md-raised md-info ml-3" v-bind="attrs" v-on="on"><v-icon small class="mr-1">mdi-plus</v-icon>Add</md-button>
              </template>
              <v-card>
                <v-card-text>
                  <div class="subheading text-center mt-3 mb-4">
                    <template>Create new user information</template>
                  </div>
                  <add-user-form :closeFunction="addDialogClose" @clicked-add-submit="addItemDone"></add-user-form>
                </v-card-text>
              </v-card>
            </v-dialog>
            <v-dialog v-model="editDialog" max-width="500px" persistent>
              <v-card>
                <v-card-text>
                  <div class="subheading text-center mt-3 mb-4">
                    <template>Edit user information</template>
                  </div>
                  <edit-user-form
                    :editDialog="editDialog"
                    :editId="editId"
                    :closeFunction="editDialogClose"
                    @clicked-edit-submit="editItemDone"
                  ></edit-user-form>
                </v-card-text>
              </v-card>
            </v-dialog>
          </template>

          <template v-slot:item.actions="{ item }">
            <v-icon small class="mr-2" @click="editItem(item.id)">
              mdi-pencil
            </v-icon>
            <v-icon small @click="deleteItem(item.id)">
              mdi-delete
            </v-icon>
          </template>

          <template v-slot:no-data>
            <v-btn color="primary" @click="initialize">
              Reset
            </v-btn>
          </template>
        </v-data-table>
      </div>
    </div>
  </div>
</template>

<script>
  import { AddUserForm, EditUserForm } from "@/pages";
  import UserService from "../../services/UserService";

  export default {
    name: "user-table",
    components: {
      AddUserForm,
      EditUserForm,
    },
    data() {
      return {
        addDialog: false,
        editDialog: false,
        headers: [
          {
            text: "Id",
            align: "start",
            value: "id",
            sortable: false,
            class: "font-14",
          },
          { text: "Account", value: "account", class: "font-14" },
          { text: "E-mail", value: "email", class: "font-14" },
          { text: "Create date", value: "createdAt", class: "font-14" },
          { text: "Actions", value: "actions", sortable: false, class: "font-14" },
        ],
        users: [],
        editId: null,
      };
    },
    created() {
      this.initialize();
    },
    methods: {
      initialize() {
        UserService.getAll()
          .then((res) => {
            this.users = res.data;
          })
          .catch((e) => {
            console.log(e);
          });
      },
      addItemDone(result) {
        if (result) {
          this.initialize();
          this.addDialogClose();
        }
      },
      editItem(id) {
        this.editDialog = true;
        this.editId = id;
      },
      editItemDone(result) {
        if (result) {
          this.initialize();
          this.editDialogClose();
        }
      },
      deleteItem(id) {
        this.$fire({
          title: "",
          text: "Are you sure delete this user?",
          type: "warning",
          showCancelButton: true,
        })
          .then((res) => {
            if (res.value) {
              console.log(id);
              UserService.delete(id)
                .then(() => {
                  this.$fire({
                    title: "",
                    text: "Delete successfully.",
                    type: "success",
                  }).then(() => {
                    this.initialize();
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
      addDialogClose() {
        this.addDialog = false;
      },
      editDialogClose() {
        this.editDialog = false;
      },
    },
  };
</script>

<style scoped>
  .v-data-table-user {
    padding: 20px 20px 40px 20px !important;
  }
  .font-14 {
    font-size: 14px !important;
  }
  .v-dialog .v-card {
    padding: 20px 40px 20px 40px;
  }
</style>

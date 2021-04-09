<template>
  <v-form ref="form" class="add-user-form" autocomplete="off" @submit.prevent lazy-validation>
    <v-row class="pl-3 pr-3">
      <v-text-field
        v-model="userForm.account"
        :rules="[(v) => !!v || 'account is required']"
        label="Account"
        prepend-icon="person"
        required
      ></v-text-field>
      <md-button v-if="!isValidAccount" class="md-info md-sm md-small" @click="checkAccount">Check</md-button>
      <md-icon class="md-info" v-else>check</md-icon>
    </v-row>
    <v-text-field
      v-model="userForm.email"
      :rules="[(v) => !!v || 'E-mail is required', (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid']"
      light="light"
      label="Email"
      type="email"
      prepend-icon="email"
      required
    ></v-text-field>
    <v-text-field
      type="password"
      class="mb-3"
      v-model="userForm.password"
      :rules="[(v) => !!v || 'Password is required']"
      label="Password"
      prepend-icon="lock"
      required
    ></v-text-field>
    <md-button type="submit" class="md-raised md-success" @click="save">Save</md-button>
    <md-button class="md-raised md-default float-right" @click="[closeFunction(), resetForm()]">Cancel</md-button>
  </v-form>
</template>

<script>
  import UserService from "../../services/UserService";

  export default {
    name: "add-user-form",
    data() {
      return {
        userForm: {
          account: "",
          email: "",
          password: "",
        },
        checkDoneAccount: "",
        isValidAccount: false,
      };
    },
    props: {
      closeFunction: {
        type: Function,
        default: null,
      },
      doneFunction: {
        type: Function,
        default: null,
      },
    },
    methods: {
      checkAccount() {
        const account = this.userForm.account;
        if (account !== "") {
          UserService.findByAccount(account)
            .then((res) => {
              const result = res.data;
              if (result !== "") {
                this.$fire({
                  title: "",
                  text: "This account already exist.",
                  type: "error",
                });
              } else {
                this.$fire({
                  title: "",
                  text: "This account is available.",
                  type: "success",
                });
                this.isValidAccount = true;
                this.checkDoneAccount = this.userForm.account;
              }
            })
            .catch((e) => {
              console.log(e);
            });
        }
      },
      validate() {
        return this.$refs.form.validate();
      },
      save() {
        const validForm = this.validate();
        if (validForm) {
          if (this.checkDoneAccount === this.userForm.account) {
            var data = {
              account: this.userForm.account,
              email: this.userForm.email,
              password: this.userForm.password,
            };
            UserService.create(data)
              .then(() => {
                this.$fire({
                  title: "",
                  text: "Create successfully.",
                  type: "success",
                }).then(() => {
                  this.$emit("clicked-add-submit", true);
                  this.resetForm();
                });
              })
              .catch((e) => {
                console.log(e);
              });
          } else {
            this.$fire({
              title: "",
              text: "Please duplicate check an account.",
              type: "error",
            });
            this.isValidAccount = false;
          }
        }
      },
      resetForm() {
        this.userForm = [];
        this.isValidAccount = false;
        this.$refs.form.reset();
        this.$refs.form.resetValidation();
      },
    },
  };
</script>

<style>
  form.add-user-form .error--text {
    color: #ff5252 !important;
    caret-color: #ff5252 !important;
    font-weight: 500;
  }
</style>

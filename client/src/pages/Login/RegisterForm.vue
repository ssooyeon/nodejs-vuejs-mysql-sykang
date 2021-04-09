<template>
  <v-form ref="form" class="login-form" autocomplete="off" @submit.prevent lazy-validation>
    <v-row class="pl-3 pr-3">
      <v-text-field
        v-model="user.account"
        :rules="[(v) => !!v || 'account is required']"
        label="Account"
        prepend-icon="person"
        required
      ></v-text-field>
      <md-button v-if="!isValidAccount" class="md-info md-sm md-small" @click="checkAccount">Check</md-button>
      <md-icon class="md-info" v-else>check</md-icon>
    </v-row>
    <v-text-field
      v-model="user.email"
      :rules="[(v) => !!v || 'E-mail is required', (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid']"
      light="light"
      label="Email"
      type="email"
      prepend-icon="email"
      required
    ></v-text-field>
    <v-text-field
      type="password"
      v-model="user.password"
      :rules="[(v) => !!v || 'Password is required']"
      label="Password"
      prepend-icon="lock"
      required
    ></v-text-field>
    <v-text-field
      type="password"
      v-model="user.passwordCheck"
      :rules="[(v) => !!v || 'Password is required', (v) => v === this.user.password || 'Passwords mush match.']"
      label="Repeat Password"
      prepend-icon="lock"
      required
    ></v-text-field>
    <md-button type="submit" class="md-raised md-success" @click="register">Sign up</md-button>
  </v-form>
</template>

<script>
  import UserService from "../../services/UserService";

  export default {
    name: "register-form",
    data() {
      return {
        user: {
          account: "",
          email: "",
          password: "",
          passwordCheck: "",
        },
        checkDoneAccount: "",
        isValidAccount: false,
      };
    },
    methods: {
      validate() {
        return this.$refs.form.validate();
      },
      checkAccount() {
        const account = this.user.account;
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
                this.checkDoneAccount = this.user.account;
              }
            })
            .catch((e) => {
              console.log(e);
            });
        }
      },
      register() {
        const validForm = this.validate();
        if (validForm) {
          if (this.checkDoneAccount === this.user.account) {
            var data = {
              account: this.user.account,
              email: this.user.email,
              password: this.user.password,
            };
            UserService.create(data)
              .then(() => {
                this.$fire({
                  title: "",
                  text: "Register successfully. Go to the login page.",
                  type: "success",
                  timer: 3000,
                }).then(() => {
                  this.$emit("registerDone", true);
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
    },
  };
</script>

<style>
  form.register-form .error--text {
    color: #ff5252 !important;
    caret-color: #ff5252 !important;
    font-weight: 500;
  }
  .md-button.md-small {
    width: 20px;
    height: 100%;
    line-height: 100%;
    min-height: 100%;
    vertical-align: top;
    padding: 7px;
  }
  .md-icon.md-info {
    color: #00bcd4 !important;
  }
</style>

<template>
  <v-form ref="form" class="login-form" @submit.prevent lazy-validation>
    <v-text-field v-model="user.account" :rules="[(v) => !!v || 'account is required']" label="Account" prepend-icon="person" required></v-text-field>
    <v-text-field
      type="password"
      v-model="user.password"
      :rules="[(v) => !!v || 'Password is required']"
      label="Password"
      prepend-icon="lock"
      required
    ></v-text-field>
    <md-button type="submit" class="md-raised md-success" @click="login">Login</md-button>
  </v-form>
</template>

<script>
  import { mapState, mapActions } from "vuex";
  export default {
    name: "login-form",
    computed: {
      ...mapState("userStore", ["errorMessage"]), // store에 저장된 현재 에러 메세지를 가져옴
    },
    data() {
      return {
        user: {
          account: "",
          password: "",
        },
      };
    },
    methods: {
      ...mapActions({ authLogin: "userStore/login" }), // store에 저장된 로그인 액션을 가져옴
      validate() {
        return this.$refs.form.validate();
      },
      // 로그인 수행
      login() {
        const valid = this.validate();
        if (valid) {
          const data = {
            account: this.user.account,
            password: this.user.password,
          };
          this.authLogin(data)
            .then(() => {
              // 로그인 성공
              if (this.errorMessage === "") {
                console.log("Welcome to my project!");
                this.$router.push("/");
                location.reload();
              } else {
                this.$fire({
                  title: "",
                  text: this.errorMessage,
                  type: "error",
                });
              }
            })
            .catch((e) => {
              console.log(e);
              this.$fire({
                title: "",
                text: "Incorrect account and/or password.",
                type: "error",
              });
            });
        }
      },
    },
  };
</script>

<style>
  form.login-form .error--text {
    color: #ff5252 !important;
    caret-color: #ff5252 !important;
    font-weight: 500;
  }
</style>

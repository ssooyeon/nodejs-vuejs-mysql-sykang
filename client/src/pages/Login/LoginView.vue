<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100">
        <p class="headline">Login</p>
        <div>
          <v-form ref="form" class="login-form" lazy-validation>
            <v-text-field v-model="loginForm.account" :rules="[(v) => !!v || 'account is required']" label="Account" required></v-text-field>
            <v-text-field
              type="password"
              v-model="loginForm.password"
              :rules="[(v) => !!v || 'Password is reuired']"
              label="Password"
              required
            ></v-text-field>
          </v-form>
          <md-button type="submit" class="md-raised md-success" @click="login">Submit</md-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "login",
    data() {
      return {
        loginForm: {
          account: "",
          password: "",
        },
      };
    },
    methods: {
      validate() {
        this.$refs.form.validate();
      },
      login() {
        const valid = this.$refs.form.validate();
        if (valid) {
          this.$store
            .dispatch("login", {
              account: this.loginForm.account,
              password: this.loginForm.password,
            })
            .then(() => {
              this.$router.push("/");
              location.reload();
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

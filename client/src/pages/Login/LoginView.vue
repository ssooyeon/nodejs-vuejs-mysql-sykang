<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100">
        <p class="headline">Login</p>
        <div>
          <v-form ref="form" lazy-validation>
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
      login() {
        this.$store
          .dispatch("login", {
            account: this.loginForm.account,
            password: this.loginForm.password,
          })
          .then(() => {
            this.$router.push({ name: "Dashboard" });
          });
      },
    },
  };
</script>

<style scoped></style>

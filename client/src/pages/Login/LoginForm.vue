<template>
  <v-form ref="form" class="login-form" lazy-validation>
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
  export default {
    name: "login-form",
    data() {
      return {
        user: {
          account: "",
          password: "",
        },
      };
    },
    methods: {
      validate() {
        return this.$refs.form.validate();
      },
      login() {
        const valid = this.validate();
        if (valid) {
          this.$store
            .dispatch("login", {
              account: this.user.account,
              password: this.user.password,
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

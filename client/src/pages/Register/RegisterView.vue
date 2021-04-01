<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100">
        <p class="headline">Register</p>
        <div>
          <v-form ref="form" lazy-validation>
            <v-text-field v-model="registerForm.account" :rules="[(v) => !!v || 'account is required']" label="Account" required></v-text-field>
            <v-text-field
              type="password"
              v-model="registerForm.password"
              :rules="[(v) => !!v || 'Password is reuired']"
              label="Password"
              required
            ></v-text-field>
          </v-form>
          <md-button type="submit" class="md-raised md-success" @click="register">Submit</md-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import UserService from "../../services/UserService";

  export default {
    name: "register",
    data() {
      return {
        registerForm: {
          account: "",
          password: "",
        },
      };
    },
    methods: {
      register() {
        var data = {
          account: this.registerForm.account,
          password: this.registerForm.password,
        };
        UserService.create(data)
          .then((res) => {
            console.log(res);
            this.$fire({
              title: "",
              text: "Register successfully. Go to the login page.",
              type: "success",
              timer: 3000,
            }).then(() => {
              this.$router.push("/login");
            });
          })
          .catch((e) => {
            console.log(e);
          });
      },
    },
  };
</script>

<style scoped></style>

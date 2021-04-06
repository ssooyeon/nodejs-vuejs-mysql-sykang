<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100">
        <v-layout align-center="align-center" justify-center="justify-center">
          <v-flex class="login-form text-xs-center">
            <div v-if="isLoginView" class="display-4 mb-3"><v-icon class="mr-2" large="large">work</v-icon> Login</div>
            <div v-else class="display-4 mb-3"><v-icon class="mr-2" large="large">work</v-icon> Register</div>
            <v-card light="light">
              <v-card-text>
                <div class="subheading">
                  <template v-if="isLoginView">Log in to your customer portal</template>
                  <template v-else>Crate a new account</template>
                </div>
                <login-form v-if="isLoginView"></login-form>
                <register-form v-else @registerDone="setLoginView"></register-form>
              </v-card-text>
            </v-card>
            <div v-if="isLoginView" class="mt-3">
              Don't have an account?
              <v-btn light="light" class="ml-2" @click="isLogin">Sign up</v-btn>
            </div>
            <div v-else class="mt-3">
              Do already have an account?
              <v-btn light="light" class="ml-2" @click="isLogin">Sign in</v-btn>
            </div>
          </v-flex>
        </v-layout>
      </div>
    </div>
  </div>
</template>

<script>
  import { LoginForm, RegisterForm } from "@/pages";

  export default {
    name: "login",
    components: {
      LoginForm,
      RegisterForm,
    },
    data() {
      return {
        isLoginView: true,
      };
    },
    methods: {
      isLogin: function() {
        this.isLoginView = !this.isLoginView;
      },
      setLoginView: function(isLoginView) {
        this.isLoginView = isLoginView;
      },
    },
  };
</script>

<style>
  .text-xs-center {
    text-align: center;
  }
  form.login-form .error--text,
  form.register-form .error--text {
    color: #ff5252 !important;
    caret-color: #ff5252 !important;
    font-weight: 500;
  }
</style>

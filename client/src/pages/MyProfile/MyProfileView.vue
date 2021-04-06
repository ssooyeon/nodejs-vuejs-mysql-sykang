<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100">
        <v-layout align-center="align-center" justify-center="justify-center">
          <v-flex class="my-profile-form text-xs-center">
            <div class="display-4 mb-3"><v-icon class="mr-2" large="large">work</v-icon> Edit</div>
            <v-card light="light">
              <v-card-text>
                <div class="subheading">
                  <template>Edit my account information</template>
                </div>
                <v-form ref="form" class="my-profile-form" lazy-validation>
                  <v-text-field v-model="user.account" label="Account" prepend-icon="person" disabled></v-text-field>
                  <v-text-field
                    v-model="user.email"
                    :rules="[(v) => !!v || 'E-mail is required', (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid']"
                    light="light"
                    label="Email"
                    prepend-icon="email"
                    required
                  ></v-text-field>
                  <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100 text-left mt-3">
                    <a v-if="isPasswordChange" class="md-list-item-container" @click="togglePasswordDiv"
                      ><md-icon>expand_more</md-icon> password change</a
                    >
                    <a v-else class="md-list-item-container" @click="togglePasswordDiv"><md-icon>expand_less</md-icon> password change</a>
                  </div>
                  <v-text-field
                    type="password"
                    v-model="user.currentPassword"
                    v-if="isPasswordChange"
                    :rules="[(v) => !!v || 'Password is required']"
                    label="Current password"
                    prepend-icon="lock"
                    required
                  ></v-text-field>
                  <v-text-field
                    type="password"
                    v-model="user.newPassword"
                    v-if="isPasswordChange"
                    :rules="[(v) => !!v || 'Password is required', this.user.currentPassword !== '' || 'Enter current password.']"
                    label="New password"
                    prepend-icon="lock"
                    required
                  ></v-text-field>
                  <v-text-field
                    type="password"
                    v-model="user.newPasswordCheck"
                    v-if="isPasswordChange"
                    :rules="[(v) => !!v || 'Password is required', (v) => v === this.user.newPassword || 'Passwords mush match.']"
                    label="Repeat New password"
                    prepend-icon="lock"
                    required
                  ></v-text-field>
                  <md-button type="submit" class="md-raised md-success" @click="comparePassword">Update</md-button>
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
  import UserService from "../../services/UserService";
  import { authComputed } from "../../store/helpers";
  export default {
    name: "my-profile",
    computed: {
      ...authComputed,
    },
    mounted() {
      console.log(this.count);
      this.user.id = this.loggedUserInfo.id;
      this.user.account = this.loggedUserInfo.account;
      this.user.email = this.loggedUserInfo.email;
    },
    data() {
      return {
        user: {
          id: "",
          account: "",
          email: "",
          currentPassword: "",
          newPassword: "",
          newPasswordCheck: "",
        },
        isPasswordChange: false,
      };
    },
    methods: {
      togglePasswordDiv: function() {
        this.isPasswordChange = !this.isPasswordChange;
      },
      validate() {
        return this.$refs.form.validate();
      },
      comparePassword() {
        const validForm = this.validate();
        if (validForm) {
          if (this.isPasswordChange) {
            const comparePassword = {
              id: this.user.id,
              password: this.user.currentPassword,
            };
            UserService.compareCurrentPassword(comparePassword)
              .then((compare) => {
                if (compare.data) {
                  const data = {
                    id: this.user.id,
                    account: this.user.account,
                    email: this.user.email,
                    password: this.user.newPassword,
                  };
                  this.edit(data);
                } else {
                  this.$fire({
                    title: "",
                    text: "The current password does not match.",
                    type: "error",
                  });
                }
              })
              .catch((e) => {
                console.log(e);
              });
          } else {
            const data = {
              id: this.user.id,
              account: this.user.account,
              email: this.user.email,
            };
            this.edit(data);
          }
        }
      },
      edit(data) {
        UserService.update(data.id, data)
          .then(() => {
            this.$fire({
              title: "",
              text: "Update successfully. Go to the main page.",
              type: "success",
              timer: 3000,
            }).then(() => {
              // this.$store.dispatch("updateUserData", data);
              this.$router.push("/");
            });
          })
          .catch((e) => {
            console.log(e);
          });
      },
    },
  };
</script>

<style>
  .text-xs-center {
    text-align: center;
  }
  form.my-profile-form .error--text {
    color: #ff5252 !important;
    caret-color: #ff5252 !important;
    font-weight: 500;
  }
  .md-list-item-container {
    color: #000 !important;
  }
  .md-list-item-container:hover {
    cursor: pointer;
  }
</style>

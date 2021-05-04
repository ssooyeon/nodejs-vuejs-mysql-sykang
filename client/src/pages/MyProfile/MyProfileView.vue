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
                <v-form ref="form" class="my-profile-form" autocomplete="off" @submit.prevent lazy-validation>
                  <v-text-field v-model="userForm.account" label="Account" prepend-icon="person" disabled></v-text-field>
                  <v-text-field
                    v-model="userForm.email"
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
                    v-model="userForm.currentPassword"
                    v-if="isPasswordChange"
                    :rules="[(v) => !!v || 'Password is required']"
                    label="Current password"
                    prepend-icon="lock"
                    required
                  ></v-text-field>
                  <v-text-field
                    type="password"
                    v-model="userForm.newPassword"
                    v-if="isPasswordChange"
                    :rules="[(v) => !!v || 'Password is required', this.userForm.currentPassword !== '' || 'Enter current password.']"
                    label="New password"
                    prepend-icon="lock"
                    required
                  ></v-text-field>
                  <v-text-field
                    type="password"
                    v-model="userForm.newPasswordCheck"
                    v-if="isPasswordChange"
                    :rules="[(v) => !!v || 'Password is required', (v) => v === this.userForm.newPassword || 'Passwords mush match.']"
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
  import { mapState, mapActions } from "vuex";
  export default {
    name: "my-profile",
    computed: {
      ...mapState("userStore", ["user"]), // store에 저장된 현재 사용자 정보를 가져옴
    },
    mounted() {
      this.userForm.id = this.user.data.id;
      this.userForm.account = this.user.data.account;
      this.userForm.email = this.user.data.email;
    },
    data() {
      return {
        userForm: {
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
      ...mapActions({ updateUserState: "userStore/updateUserState" }),
      // 비밀번호를 변경할지 말지
      togglePasswordDiv() {
        this.isPasswordChange = !this.isPasswordChange;
      },
      validate() {
        return this.$refs.form.validate();
      },
      // 현재 비밀번호 일치 여부 확인
      comparePassword() {
        const validForm = this.validate();
        if (validForm) {
          // 비밀번호 변경 화면이 표출되어 있을 때
          if (this.isPasswordChange) {
            const comparePassword = {
              id: this.userForm.id,
              password: this.userForm.currentPassword,
            };
            UserService.compareCurrentPassword(comparePassword)
              .then((compare) => {
                // 현재 비밀번호와 input 값이 일치하면 업데이트 수행
                if (compare.data) {
                  const data = {
                    id: this.userForm.id,
                    account: this.userForm.account,
                    email: this.userForm.email,
                    password: this.userForm.newPassword,
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
            // 비밀번호 변경 화면이 표출되어 있지 않으면 email만 업데이트
            const data = {
              id: this.userForm.id,
              account: this.userForm.account,
              email: this.userForm.email,
            };
            this.edit(data);
          }
        }
      },
      // 회원정보 수정 수행
      edit(data) {
        UserService.update(data.id, data)
          .then(() => {
            this.$fire({
              title: "",
              text: "Update successfully. Go to the main page.",
              type: "success",
              timer: 3000,
            }).then(() => {
              // store에 있는 currentUser의 정보를 업데이트
              this.updateUserState(data);
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

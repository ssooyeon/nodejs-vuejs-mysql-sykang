<template>
  <v-form ref="form" class="edit-user-form" autocomplete="off" @submit.prevent lazy-validation>
    <v-text-field
      v-model="userForm.account"
      :rules="[(v) => !!v || 'account is required']"
      label="Account"
      prepend-icon="person"
      disabled
    ></v-text-field>
    <v-text-field
      v-model="userForm.email"
      :rules="[(v) => !!v || 'E-mail is required', (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid']"
      light="light"
      label="Email"
      type="email"
      prepend-icon="email"
      required
    ></v-text-field>
    <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100 text-left mb-3">
      <a v-if="isPasswordChange" class="md-list-item-container" @click="togglePasswordDiv"><md-icon>expand_more</md-icon> password change</a>
      <a v-else class="md-list-item-container" @click="togglePasswordDiv"><md-icon>expand_less</md-icon> password change</a>
    </div>
    <v-text-field
      type="password"
      v-model="userForm.newPassword"
      v-if="isPasswordChange"
      :rules="[(v) => !!v || 'Password is required']"
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
    <md-button type="submit" class="md-raised md-success" @click="save">Save</md-button>
    <md-button class="md-raised md-default float-right" @click="[closeFunction(), resetForm()]">Cancel</md-button>
  </v-form>
</template>

<script>
  import UserService from "../../services/UserService";

  export default {
    name: "edit-user-form",
    created() {
      this.initialize();
    },
    watch: {
      editDialog(val) {
        if (val) {
          this.initialize();
        }
      },
    },
    data() {
      return {
        userForm: {
          id: "",
          account: "",
          email: "",
          newPassword: "",
          newPasswordCheck: "",
        },
        isPasswordChange: false,
      };
    },
    props: {
      editDialog: {
        type: Boolean,
        default: false,
      },
      editId: {
        type: Number,
        default: null,
      },
      closeFunction: {
        type: Function,
        default: null,
      },
    },
    methods: {
      // 비밀번호 변경 화면 show/hide
      togglePasswordDiv() {
        this.isPasswordChange = !this.isPasswordChange;
      },
      // 사용자 정보 조회
      initialize() {
        UserService.get(this.editId)
          .then((res) => {
            this.userForm.id = res.data.id;
            this.userForm.account = res.data.account;
            this.userForm.email = res.data.email;
          })
          .catch((e) => {
            console.log(e);
          });
      },
      validate() {
        return this.$refs.form.validate();
      },
      // 사용자 수정
      save() {
        const valid = this.validate();
        if (valid) {
          let data = [];
          // 비밀번호 변경 화면이 표출되어 있으면 파라미터에 비밀번호를 함께 전송
          if (this.isPasswordChange) {
            data = {
              id: this.userForm.id,
              account: this.userForm.account,
              email: this.userForm.email,
              password: this.userForm.newPassword,
            };
          } else {
            // 비밀번호 변경 화면이 표출되어 있지 않으면 파라미터에 이메일만 전송
            data = {
              id: this.userForm.id,
              account: this.userForm.account,
              email: this.userForm.email,
            };
          }
          UserService.update(data.id, data)
            .then(() => {
              this.$fire({
                title: "",
                text: "Update successfully.",
                type: "success",
              }).then(() => {
                this.$emit("clicked-edit-submit", true);
                this.resetForm();
              });
            })
            .catch((e) => {
              console.log(e);
            });
        }
      },
      resetForm() {
        this.userForm = [];
        this.$refs.form.reset();
        this.$refs.form.resetValidation();
      },
    },
  };
</script>

<style>
  form.edit-user-form .error--text {
    color: #ff5252 !important;
    caret-color: #ff5252 !important;
    font-weight: 500;
  }
</style>

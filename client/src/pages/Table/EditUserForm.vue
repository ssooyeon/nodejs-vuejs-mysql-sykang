<template>
  <v-form ref="form" class="edit-user-form" @submit.prevent lazy-validation>
    <v-text-field v-model="user.account" :rules="[(v) => !!v || 'account is required']" label="Account" prepend-icon="person" desabled></v-text-field>
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
      class="mb-3"
      v-model="user.password"
      :rules="[(v) => !!v || 'Password is required']"
      label="Password"
      prepend-icon="lock"
      required
    ></v-text-field>
    <md-button class="md-raised md-default" @click="closeFunction">Cancel</md-button>
    <md-button type="submit" class="md-raised md-success float-right" @click="save">Save</md-button>
  </v-form>
</template>

<script>
  export default {
    name: "edit-user-form",
    data() {
      return {
        user: {
          account: "",
          email: "",
          password: "",
        },
      };
    },
    props: {
      closeFunction: {
        type: Function,
        default: null,
      },
    },
    methods: {
      validate() {
        return this.$refs.form.validate();
      },
      save() {
        // const valid = this.validate();
        // if (valid) {
        // }
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

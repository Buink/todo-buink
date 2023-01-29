<template>
  <div class="sign-page">
    <v-container>
      <v-row>
        <v-col>
          <VForm
              form-name="Sign In From"
              btn-text="Sign In"
              :schema="SignInSchema"
          />
        </v-col>
        <v-col>
          <VForm
              form-name="Register From"
              btn-text="Register"
              :schema="RegisterSchema"
          />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup>
import VForm from '../components/Form'
import * as Yup from 'yup';

const SignInSchema = {
  fields: [
    {
      label: 'Your Email',
      name: 'email',
      type: 'email',
      rules: Yup.string().email().required(),
    },
    {
      label: 'Your Password',
      name: 'password',
      type: 'password',
      rules: Yup.string().min(6).required(),
    },
  ],
};

const RegisterSchema = {
  fields: [
    {
      label: 'Your Nickname',
      name: 'nickname',
      type: 'text',
      rules: Yup.string().min(6).required(),
    },
    {
      label: 'Your Position',
      name: 'position',
      type: 'text',
      rules: Yup.string().min(6).required(),
    },
    {
      label: 'Your Email',
      name: 'email',
      type: 'email',
      rules: Yup.string().email().required(),
    },
    {
      label: 'Your Password',
      name: 'password',
      type: 'password',
      rules: Yup.string().min(6).required(),
    },
  ],
};

</script>

<style scoped>

</style>
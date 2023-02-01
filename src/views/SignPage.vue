<template>
  <div class="sign-page">
    <h1 class="text-center text-h5 text-secondary">Sign in</h1>

    <v-container v-if="projectsStore.uid" class="text-center mt-5">
      <v-btn variant="text" color="secondary" @click="SignOut">
        <span>Click to quit</span>
      </v-btn>
    </v-container>

    <v-container v-else>
      <v-row>
        <v-col>
          <VForm
              form-name="Sign In From"
              btn-text="Sign In"
              :schema="SignInSchema"
              @form-emit="SignIn"
          />
        </v-col>
        <v-col>
          <VForm
              form-name="Register From"
              btn-text="Register"
              :schema="RegisterSchema"
              @form-emit="Register"
          />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup>
import VForm from '../components/Form'
import * as Yup from 'yup';
import signInFunction from "@/functions/authFunctions/signIn/signInFunction";
import registerFunction from "@/functions/authFunctions/register/registerFunction";
import signOutFunction from "@/functions/authFunctions/signOut/signOutFunction";
import {useProjectsStore} from '@/stores/projects'

const projectsStore = useProjectsStore()

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
      rules: Yup.string().min(3).required(),
    },
    {
      label: 'Your Position',
      name: 'position',
      type: 'text',
      rules: Yup.string().min(3).required(),
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

const SignIn = async (values) => {
  await signInFunction(values)
}

const Register = async (values) => {
  await registerFunction(values)
}

const SignOut = async () => {
  await signOutFunction()
}

</script>
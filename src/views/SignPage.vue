<template>
  <div class="sign-page">
    <v-container>
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
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword  } from "firebase/auth";
import db from '@/fb'
import * as Yup from 'yup';
import {setDoc , doc} from "firebase/firestore";
import {useProjectsStore} from '@/stores/projects'

const projectsStore = useProjectsStore()
const auth = getAuth();

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
  try {
    console.log(values)
    const res = await signInWithEmailAndPassword(auth, values.email, values.password)
    const user = res.user
    console.log(user)
    projectsStore.setUid(user.uid)
  }
  catch (e) {
    console.log(e)
    throw e
  }
}

const Register = async (values) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, values.email, values.password)
    const user = res.user
    console.log(user)
    await setDoc (doc(db, 'users', `${user.uid}`), {
      nickname: values.nickname,
      position: values.position
    })
  }
  catch (e) {
    console.log(e)
    throw e
  }
}

</script>
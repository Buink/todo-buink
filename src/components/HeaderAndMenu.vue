<template>
  <nav>
    <v-snackbar location="top" v-model="snackbar" color="secondary" timeout="2000">
      Awesome! You added a new project.
      <template v-slot:actions>
        <v-btn
            variant="text"
            @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>

    <v-toolbar permanent density="comfortable" :elevation="8" class="bg-nav-background">
      <v-app-bar-nav-icon class="text-secondary" @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title class="text-uppercase text-secondary">
        <span class="font-weight-light">Todo</span>
        <span>Buink</span>
      </v-toolbar-title>

      <v-btn v-if="projectsStore.uid" variant="text" color="secondary" @click="SignOut">
        <span>Sign Out</span>
        <v-icon>mdi-logout</v-icon>
      </v-btn>
      <v-btn v-else variant="text" color="secondary" router to="/sign">
        <span>Sign In</span>
        <v-icon>mdi-login</v-icon>
      </v-btn>
    </v-toolbar>

    <v-navigation-drawer v-model="drawer" temporary class="bg-nav-background">
      <v-row class="mt-5 text-center">
        <v-col width="100%">
          <v-avatar size="100">
            <v-img v-if="projectsStore.uid"
                   src="https://cdn.pixabay.com/photo/2020/07/14/13/07/icon-5404125_1280.png"
                   alt="my-avatar">
            </v-img>
            <v-img v-else
                   src="https://cdn-icons-png.flaticon.com/512/1705/1705706.png"
                   alt="my-avatar">
            </v-img>
          </v-avatar>
          <p class="text-subheading mt-1">{{ projectsStore.nickname || 'Unknown user' }}</p>
        </v-col>
        <v-col v-if="projectsStore.uid" class="mt-4 mb-3">
          <PopUp @projectAdded="projectAdded()"/>
        </v-col>
      </v-row>
      <v-list>
        <v-list-subheader class="text-uppercase text-secondary">Pages</v-list-subheader>
        <v-list-item
            v-for="(item, i) in links"
            :key="i"
            :value="item"
            active-color="secondary"
            :to="item.route"
        >
          <template v-slot:prepend>
            <v-icon :icon="item.icon"></v-icon>
          </template>

          <v-list-item-title>{{ item.text }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

  </nav>
</template>

<script setup>
import PopUp from "@/components/PopUp";
import {defineEmits, ref} from "vue";
import { getAuth, signOut } from "firebase/auth";
import {useProjectsStore} from '@/stores/projects'

const projectsStore = useProjectsStore()

const emit = defineEmits(['reloadRouter'])

const projectAdded = () => {
  snackbar.value = true
  emit('reloadRouter')
}

let drawer = ref(false)
let snackbar = ref(false)
const links = ref([
      { text: 'Dashboard', icon: 'mdi-view-dashboard', route: '/' },
      { text: 'My projects', icon: 'mdi-folder', route: '/projects' },
      { text: 'Team', icon: 'mdi-git', route: '/team' }
    ])

const SignOut = async () => {
  try {
    const auth = getAuth()
    await signOut(auth)
    console.log('[SignOut]: Success')
  } catch (e) {
    console.log(e)
    throw e
  }
}

</script>
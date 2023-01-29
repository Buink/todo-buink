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

<!--      <v-menu location="bottom">-->
<!--        <template v-slot:activator="{ props }">-->
<!--          <v-btn-->
<!--              color="secondary"-->
<!--              dark-->
<!--              v-bind="props"-->
<!--          >-->
<!--            Menu-->
<!--          </v-btn>-->
<!--        </template>-->

<!--        <v-list>-->
<!--          <v-list-item-->
<!--              v-for="(link, i) in links"-->
<!--              :key="i"-->
<!--          >-->
<!--            <v-btn variant="text" color="secondary" router :to="link.route">{{link.text}}</v-btn>-->
<!--          </v-list-item>-->
<!--        </v-list>-->
<!--      </v-menu>-->

      <v-btn variant="text" color="secondary" router to="/sign">
        <span>Sign In</span>
        <v-icon>mdi-exit-to-app</v-icon>
      </v-btn>
    </v-toolbar>

    <v-navigation-drawer v-model="drawer" temporary class="bg-nav-background">
      <v-row class="mt-5 text-center">
        <v-col width="100%">
          <v-avatar size="100">
            <v-img src="https://cdn.pixabay.com/photo/2020/07/14/13/07/icon-5404125_1280.png" alt="my-avatar"></v-img>
          </v-avatar>
          <p class="text-subheading mt-1">{{ projectsStore.userName }}</p>
        </v-col>
        <v-col class="mt-4 mb-3">
          <PopUp @projectAdded="snackbar = true"/>
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

          <v-list-item-title v-text="item.text"></v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

  </nav>
</template>

<script setup>
import {ref} from "vue";
import PopUp from "@/components/PopUp";
import {useProjectsStore} from '@/stores/projects'
const projectsStore = useProjectsStore()

let drawer = ref(false)
let snackbar = ref(false)
const links = ref([
      { text: 'Dashboard', icon: 'mdi-view-dashboard', route: '/' },
      { text: 'My projects', icon: 'mdi-folder', route: '/projects' },
      { text: 'Team', icon: 'mdi-git', route: '/team' }
    ])

</script>
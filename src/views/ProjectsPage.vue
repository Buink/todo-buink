<template>
  <div class="projects">
    <h1 class="text-center text-h5 text-secondary">My projects</h1>

    <v-container v-if="!projectsStore.uid" class="text-center mt-5">
      <v-btn variant="text" color="secondary" router to="/sign">
        <span>Sign in first</span>
      </v-btn>
    </v-container>

    <v-container v-else>
      <v-container v-if="!myProjects.length" class="mt-10">
        <Loader />
      </v-container>

      <v-container v-else class="my-5">
        <div class="text-subtitle-2 mt-4 mb-2">My projects</div>

        <v-expansion-panels multiple variant="accordion">
          <v-expansion-panel
              class="bg-background-lighten-1"
              v-for="(project, i) in myProjects"
              :key="i"
          >
            <v-expansion-panel-title>{{project['title']}}</v-expansion-panel-title>
            <v-expansion-panel-text class="px-4">
              <div class="font-weight-bold">due by {{project['due']}}</div>
              <div>{{project['content']}}</div>
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-container>
    </v-container>

  </div>
</template>

<script setup>
import Loader from "@/components/Loader";
import {computed, onMounted, ref} from "vue";
import {collection, getDocs} from "firebase/firestore";
import db from "@/fb";
import {useProjectsStore} from '@/stores/projects'

const projectsStore = useProjectsStore()

const projects = ref([])

onMounted(async() => {
  const projectsRes = await getDocs(collection(db, "projects"));
  projectsRes.forEach((doc) => {
    projects.value.push(doc.data())
  })
})

const myProjects = computed(() => {
  return projects.value.filter(el => el['person'] === projectsStore.nickname)
})
</script>
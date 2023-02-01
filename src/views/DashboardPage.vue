<template>
  <div class="dashboard">
    <h1 class="text-center text-h5 text-secondary">Dashboard</h1>

    <v-container v-if="!projectsStore.uid" class="text-center mt-5">
      <v-btn variant="text" color="secondary" router to="/sign">
        <span>Sign in first</span>
      </v-btn>
    </v-container>

    <v-container v-else-if="loading">
      <Loader />
    </v-container>

    <v-container v-else>
      <v-container v-if="!projects.length" class="mt-10">
        <p class="text-center">There is no projects.</p>
      </v-container>

      <v-container v-else class="my-5">

        <v-row class="mb-3">
          <v-btn variant="text" size="small" color="grey" @click="sortProjectsByProp('title')">
            <v-icon size="small">mdi-folder</v-icon>
            <span class="text-caption text-lowercase ml-2">By project name</span>
            <v-tooltip activator="parent" location="top">Sort projects by its name</v-tooltip>
          </v-btn>
          <v-btn variant="text" class="ml-2" size="small" color="grey" @click="sortProjectsByProp('person')">
            <v-icon size="small">mdi-account</v-icon>
            <span class="text-caption text-lowercase ml-2">By person</span>
            <v-tooltip activator="parent" location="top">Sort projects by its person</v-tooltip>
          </v-btn>
          <v-btn variant="text" class="ml-2" size="small" color="grey" @click="sortProjectsByProp('due')">
            <v-icon size="small">mdi-clock-alert</v-icon>
            <span class="text-caption text-lowercase ml-2">By due time</span>
            <v-tooltip activator="parent" location="top">Sort projects by its due time</v-tooltip>
          </v-btn>
        </v-row>

        <v-card variant="flat" class="pa-3 mb-3" v-for="(project, i) in projects" :key = 'i'>
          <v-row :class="`pa-3 project ${project.status}`">
            <v-col cols="12" sm="12" md="6">
              <div class="text-caption text-grey">Project title</div>
              <div>{{project.title}}</div>
            </v-col>
            <v-col cols="6" sm="4" md="2">
              <div class="text-caption text-grey">Person</div>
              <div>{{project.person}}</div>
            </v-col>
            <v-col cols="6" sm="4" md="2">
              <div class="text-caption text-grey">Due by</div>
              <div>{{ $filters.dateFilter(project.due) }}</div>
            </v-col>
            <v-col cols="6" sm="4" md="2" class="text-center">
              <div>
                <v-chip size="small" :class="`${project.status} text-white text-caption my-2`">{{project.status}}</v-chip>
              </div>
            </v-col>
          </v-row>
        </v-card>

      </v-container>
    </v-container>

  </div>
</template>

<script setup>
import Loader from "@/components/Loader";
import {onMounted, ref} from "vue";
import db from '@/fb'
import { collection, getDocs } from "firebase/firestore";
import {useProjectsStore} from '@/stores/projects'

const projectsStore = useProjectsStore()

const projects = ref([])
let loading = ref(true)

onMounted(async() => {
  const projectsRes = await getDocs(collection(db, "projects"));
  projectsRes.forEach((doc) => {
    projects.value.push(doc.data())
  })
  sortProjectsByProp('due')

  loading.value = false
})

const sortProjectsByProp = ((prop) => {
  projects.value.sort((a, b) => a[prop] < b[prop] ? -1 : 1)
})

</script>

<style scoped>

.project.complete{
  border: 1px solid #3cd1c2;
  border-left: 5px solid #3cd1c2;
}
.project.ongoing{
  border: 1px solid orange;
  border-left: 5px solid orange;
}
.project.overdue{
  border: 1px solid tomato;
  border-left: 5px solid tomato;
}

.v-chip.complete{
  background: #3cd1c2;
}
.v-chip.ongoing{
  background: orange;
}
.v-chip.overdue{
  background: tomato;
}
</style>
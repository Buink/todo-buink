<template>
  <div class="dashboard">
    <h1 class="text-center text-h5 text-secondary">Dashboard</h1>
    <v-container class="my-5">

      <v-row class="mb-3">
        <v-btn variant="text" size="small" color="grey" @click="projectsStore.sortProjectsByProp('title')">
          <v-icon size="small">mdi-folder</v-icon>
          <span class="text-caption text-lowercase ml-2">By project name</span>
          <v-tooltip activator="parent" location="top">Sort projects by its name</v-tooltip>
        </v-btn>
        <v-btn variant="text" class="ml-2" size="small" color="grey" @click="projectsStore.sortProjectsByProp('person')">
          <v-icon size="small">mdi-account</v-icon>
          <span class="text-caption text-lowercase ml-2">By person</span>
          <v-tooltip activator="parent" location="top">Sort projects by its person</v-tooltip>
        </v-btn>
      </v-row>

      <v-card variant="flat" class="pa-3 mb-3" v-for="(project, i) in projectsStore.projects" :key = 'i'>
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
            <div>{{project.due}}</div>
          </v-col>
          <v-col cols="6" sm="4" md="2" class="text-center">
            <div>
              <v-chip size="small" :class="`${project.status} text-white text-caption my-2`">{{project.status}}</v-chip>
            </div>
          </v-col>
        </v-row>
      </v-card>

    </v-container>
  </div>
</template>

<script setup>
import {useProjectsStore} from '@/stores/projects'
import {onMounted} from "vue";

const projectsStore = useProjectsStore()

onMounted(async() => {
  await projectsStore.setProjectsToStore()
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
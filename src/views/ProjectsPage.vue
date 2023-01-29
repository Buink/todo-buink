<template>
  <div class="projects">
    <h1 class="text-center text-h5 text-secondary">Projects Page</h1>

    <v-container class="my-5">
      <div class="text-subtitle-2 mt-4 mb-2">My projects</div>

      <v-expansion-panels multiple variant="accordion">
        <v-expansion-panel
            class="bg-background-lighten-1"
            v-for="(project, i) in projectsStore.getMyProjects()"
            :key="i"
        >
          <v-expansion-panel-title>{{project.title}}</v-expansion-panel-title>
          <v-expansion-panel-text class="px-4">
            <div class="font-weight-bold">due by {{project.due}}</div>
            <div>{{project.content}}</div>
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-container>

  </div>
</template>

<script setup>
import {onMounted} from "vue";
import {useProjectsStore} from '@/stores/projects'

const projectsStore = useProjectsStore()

onMounted(async() => {
  await projectsStore.setProjectsToStore()
})
</script>
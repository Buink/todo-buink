<template>
  <v-app>
    <CustomHeader @reloadRouter="id++"/>
    <v-main class="my-4">
      <router-view :key="id"/>
    </v-main>
  </v-app>
</template>

<script setup>
import CustomHeader from "@/components/HeaderAndMenu";
import {ref} from "vue";
const id = ref(0)
</script>

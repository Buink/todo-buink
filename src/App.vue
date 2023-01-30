<template>
  <v-app>
    <CustomHeader/>
    <v-main class="my-4">
      <router-view/>
    </v-main>

  </v-app>
</template>

<script setup>
import CustomHeader from "@/components/HeaderAndMenu";
</script>

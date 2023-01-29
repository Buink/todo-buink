<template>
  <v-app>
    <CustomHeader/>
    <v-main class="my-4">
      <router-view/>
    </v-main>

  </v-app>
</template>

<script>
import CustomHeader from "@/components/HeaderAndMenu";

export default {
  name: 'App',
  components: {
    CustomHeader,
  }
}
</script>

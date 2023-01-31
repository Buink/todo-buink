<template>
  <div class="team">
    <h1 class="text-center text-h5 text-secondary">Team</h1>

    <v-container v-if="!projectsStore.uid" class="text-center mt-5">
      <v-btn variant="text" color="secondary" router to="/sign">
        <span>Sign in first</span>
      </v-btn>
    </v-container>
    
    <v-container v-else class="my-5">
      <v-row>
        <v-col cols="12" sm="6" md="4" lg="3" v-for="(person, i) in team" :key="i">
          <v-card class="text-center ma-3 bg-background-lighten-1">
            <v-responsive class="pt-4">
              <v-avatar size="100px">
                <v-img :src="person.avatar" alt="avatar"></v-img>
              </v-avatar>
            </v-responsive>
            <v-card-text>
              <div class="text-subheading">{{person.nickname}}</div>
              <div class="text-grey">{{person.position}}</div>
            </v-card-text>
            <v-card-actions class="justify-center">
              <v-btn color="secondary">
                <v-icon size="small">mdi-message</v-icon>
                <span class="ml-2">Message</span>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

  </div>
</template>

<script setup>
import {useProjectsStore} from '@/stores/projects'
import {onMounted, ref} from "vue";
import {collection, getDocs} from "firebase/firestore";
import db from "@/fb";

const projectsStore = useProjectsStore()
const team = ref([])
onMounted( async() => {
  const teamRes = await getDocs(collection(db, "users"));
  teamRes.forEach((doc) => {
    team.value.push(doc.data())
  })
})

// const team = [
//   {name: 'Valeriy Robko', role: 'Designer', avatar: 'https://cdn-icons-png.flaticon.com/512/3048/3048122.png'},
//   {name: 'Sasha Melov', role: 'Web developer', avatar: 'https://cdn-icons-png.flaticon.com/512/4128/4128176.png'},
//   {name: 'Igor Maltsev', role: 'Sales manager', avatar: 'https://cdn-icons-png.flaticon.com/512/194/194828.png'},
//   {name: 'Vika Gavr', role: 'Secretary', avatar: 'https://cdn-icons-png.flaticon.com/512/145/145847.png'},
//   {name: 'Anna Levon', role: 'Social media manager', avatar: 'https://www.shareicon.net/data/256x256/2016/09/15/829453_user_512x512.png'}
//   ]
</script>
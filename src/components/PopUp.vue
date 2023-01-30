<template>
    <v-dialog max-width="600px" v-model="dialog">
      <template v-slot:activator="{ props }">
        <v-btn color="secondary" dark v-bind="props">
          Add new project
        </v-btn>
      </template>
      <v-card>
        <v-card-title class="text-center">
          <h2>Add a New Project</h2>
        </v-card-title>
        <v-card-text>
          <v-form class="px-3" ref="myForm">
            <v-text-field
                label="Title"
                v-model="title"
                prepend-icon="mdi-folder"
                color="second"
                :rules="rules"
            ></v-text-field>
            <v-textarea
                label="Information"
                v-model="content"
                prepend-icon="mdi-information-variant"
                :rules="rules"
            ></v-textarea>

            <v-input prepend-icon="mdi-timetable" v-model="due" :rules="rules">
              <input type="date" v-model="due">
            </v-input>

            <v-btn
                color="secondary"
                class="mx-0 mt-3"
                variant="text"
                @click="submit"
                :loading="loading"
            >
              Add project
            </v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
</template>

<script setup>
import {ref, computed, defineEmits} from "vue";
import moment  from 'moment'
import db from "@/fb";
import {addDoc, collection} from "firebase/firestore";
import {useProjectsStore} from '@/stores/projects'

const projectsStore = useProjectsStore()

let dialog = ref(false)
let loading = ref(false)
let title = ref('')
let content = ref('')
let due = ref(null)
const min = ref(5)
const myForm = ref(null)

const emit = defineEmits(['projectAdded'])

const formattedDate = computed(() => {
  return due.value ? moment(due.value).format("Do MMMM YYYY") : ""
})

const rules = computed(() => {
  const rules = []

  if (min.value) {
    const rule =
        v => (v || '').length >= min.value ||
            `A minimum of ${min.value} characters is allowed`

    rules.push(rule)
  }

  return rules
})

const submit = async () => {
  const {valid} = await myForm.value.validate()

  if (valid) {
    console.log(title.value, content.value, formattedDate.value)

    try {
      loading.value = true

      const docRef = await addDoc(collection(db, "projects"), {
        title: title.value,
        content: content.value,
        due: formattedDate.value,
        person: 'Buink',
        status: 'ongoing'
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    } finally {
      const project = {
        title: title.value,
        content: content.value,
        due: formattedDate.value,
        person: 'Buink',
        status: 'ongoing'
      }
      projectsStore.addProject(project)

      loading.value = false
      dialog.value = false
      emit('projectAdded')
      title.value = ''
      content.value = ''
      due.value = null
    }
  }
}

</script>
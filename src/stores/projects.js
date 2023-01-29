import { defineStore } from 'pinia'
import { ref } from 'vue'
import db from '@/fb'
import { collection, getDocs } from "firebase/firestore";

export const useProjectsStore = defineStore('projectsStore', () => {
    const projects = ref([])
    const userName = ref('Buink')


    const addProject = (project) => {
        // console.log(project)
        projects.value.push(project)
    }

    const setProjectsToStore = async () => {
        if (projects.value.length === 0) {
            const querySnapshot = await getDocs(collection(db, "projects"));
            querySnapshot.forEach((doc) => {
                console.log(doc.id, " => ", doc.data());
                projects.value.push(doc.data())
            });
        }
    }

    const sortProjectsByProp = ((prop) => {
        projects.value.sort((a, b) => a[prop] < b[prop] ? -1 : 1)
    })

    const getMyProjects = (() => {
        return projects.value.filter(el => el['person'] === userName.value)
    })

    return {
        projects, userName, setProjectsToStore, sortProjectsByProp, getMyProjects, addProject
    }
})
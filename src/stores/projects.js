import { defineStore } from 'pinia'
import { ref } from 'vue'
import db from '@/fb'
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export const useProjectsStore = defineStore('projectsStore',  () => {
    //state
    const projects = ref([])
    const uid = ref(null)
    const userName = ref(null)
    const position = ref(null)

    //auth
    const auth = getAuth();
    const checkAuthAndSetState = () => {
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                console.log('logged')
                const uid = user.uid;
                setUid(uid)
                const userInfo = await getDoc(doc(db, 'users', `${uid}`));
                setUserName(userInfo.data().nickname)
                setPosition(userInfo.data().position)
            } else {
                console.log('not logged')
            }
        });
    }
    checkAuthAndSetState()

    //state change
    const setUid = (newUid) => {
        uid.value = newUid
    }

    const setUserName = (newUserName) => {
        userName.value = newUserName
    }

    const setPosition = (newPosition) => {
        position.value = newPosition
    }

    const addProject = (project) => {
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
        //auth
        checkAuthAndSetState,
        //state
        projects,
        uid,
        userName,
        position,
        //state change
        setUserName,
        setPosition,
        setProjectsToStore,
        addProject,
        setUid,
        //actions
        sortProjectsByProp,
        //getters
        getMyProjects,
    }
})
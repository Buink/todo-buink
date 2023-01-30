import { defineStore } from 'pinia'
import { ref } from 'vue'
import db from '@/fb'
import { /*collection, getDocs,*/ doc, getDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export const useProjectsStore = defineStore('projectsStore',  () => {
    //state
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
                clearInfo()
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

    const clearInfo = () => {
        uid.value = null
        userName.value = null
        position.value = null
    }

    return {
        //auth
        checkAuthAndSetState,
        //state
        uid,
        userName,
        position,
        //state change
        setUserName,
        setPosition,
        setUid,
        clearInfo
        //actions

        //getters

    }
})
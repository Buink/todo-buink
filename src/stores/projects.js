import { defineStore } from 'pinia'
import { ref } from 'vue'
import db from '@/fb'
import { doc, getDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export const useProjectsStore = defineStore('projectsStore',  () => {
    //state
    const uid = ref(null)
    const nickname = ref(null)
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
        nickname.value = newUserName
    }

    const setPosition = (newPosition) => {
        position.value = newPosition
    }

    const clearInfo = () => {
        uid.value = null
        nickname.value = null
        position.value = null
    }

    return {
        //auth
        checkAuthAndSetState,
        //state
        uid,
        nickname,
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
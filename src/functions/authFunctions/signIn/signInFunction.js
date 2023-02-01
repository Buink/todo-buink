import {getAuth, signInWithEmailAndPassword} from "firebase/auth";
import router from "@/router";
import {useProjectsStore} from '@/stores/projects'

const projectsStore = useProjectsStore()

export default async function signInFunction(values) {
    try {
        const auth = getAuth();
        const res = await signInWithEmailAndPassword(auth, values.email, values.password)
        const user = res.user
        projectsStore.setUid(user.uid)
        await router.go(-1)
    } catch (e) {
        console.log(e)
        throw e
    }
}
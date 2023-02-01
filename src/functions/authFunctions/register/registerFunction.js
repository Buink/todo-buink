import {createUserWithEmailAndPassword, getAuth} from "firebase/auth";
import {doc, setDoc} from "firebase/firestore";
import db from "@/fb";
import signInFunction from "@/functions/authFunctions/signIn/signInFunction";

const auth = getAuth();

export default async function registerFunction(values) {
    try {
        const res = await createUserWithEmailAndPassword(auth, values.email, values.password)
        const user = res.user
        await setDoc(doc(db, 'users', `${user.uid}`), {
            nickname: values.nickname,
            position: values.position,
            avatar: 'https://cdn.pixabay.com/photo/2020/07/14/13/07/icon-5404125_1280.png'
        })
        await signInFunction(values)
    }
    catch (e) {
        console.log(e)
        throw e
    }
}
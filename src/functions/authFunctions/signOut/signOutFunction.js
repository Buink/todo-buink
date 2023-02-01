import {getAuth, signOut} from "firebase/auth";

const auth = getAuth();

export default async function signOutFunction() {
    try {
        await signOut(auth)
        console.log('[SignOut]: Success')
    } catch (e) {
        console.log(e)
        throw e
    }
}
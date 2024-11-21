import { useEffect, useState } from "react"
import { getAuth } from "firebase/auth"
import { doc, getDoc } from "firebase/firestore"
import { db } from "../firebase.config"
export const useAuthAdmin = () => {
    const [chechAdmin, setChechAdmin] = useState(false)
    const [checkingStatus, setCheckingStatus] = useState(true)

    useEffect(()=>{
        const auth = getAuth()
        const checkAdmin = async () => {
            // alert(auth.currentUser.uid)
            const userRef = doc(db, 'users', auth.currentUser.uid)
            const userSnap = await getDoc(userRef)
            if (userSnap.exists()) {
                setChechAdmin(userSnap.data().admin)
            }
            setCheckingStatus(false)
        }
        checkAdmin()
    })
  return {chechAdmin, checkingStatus}
}

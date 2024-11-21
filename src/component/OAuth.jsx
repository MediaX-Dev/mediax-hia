import { useLocation, useNavigate } from "react-router-dom"
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth"
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore"
import { db } from "../firebase.config"
import { toast } from "react-toastify"
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid'
import { useState } from "react"
import Spinner from "./Spinner"

function OAuth({ img }) {

    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const location = useLocation()

    const onGoogleClick = async () => {
        setLoading(true)
        try {
            const auth = getAuth()
            const provider = new GoogleAuthProvider()
            const result = await signInWithPopup(auth, provider)
            const user = result.user
            console.log(user)
            //check for user
            const docRef = doc(db, 'users', user.uid)
            const docSnap = await getDoc(docRef)

            // If User, dosen't exits, create user
            if (!docSnap.exists()) {
                await setDoc(doc(db, 'users', user.uid), {
                    name: user.displayName,
                    email: user.email,
                    phone: user.phoneNumber,
                    timestamp: serverTimestamp(),
                    admin: false
                })
            }
            const blobUrl = localStorage.getItem('imageBlobUrl');

            if (!blobUrl) {
                console.error('No image found in localStorage');
                return;
            }

            // Fetch the Blob from the Blob URL
            fetch(blobUrl)
                .then(res => res.blob())
                .then(blob => {
                    const file = new File([blob], 'post.jpg', { type: 'image/jpeg' });

                    const storage = getStorage();
                    const imageRef = ref(storage, `images/${uuidv4()}.jpg`);
                    uploadBytes(imageRef, file).then(() => {
                        getDownloadURL(imageRef).then(async (url) => {
                            try {
                                const auth = getAuth();
                                if (!auth.currentUser) {
                                    throw new Error("User not authenticated");
                                }

                                const listingData = {
                                    listingCreated: true,
                                    userId: auth.currentUser.uid,
                                    name: auth.currentUser.displayName,
                                    gmail: auth.currentUser.email,
                                    dateOfPosting: '',
                                    postStatus: false,
                                    slotNumber: 0,
                                    payment: false,
                                    imageUrl: url,
                                    paymentResponseId: 'No Id Yet',
                                };

                                const docRef = doc(db, "listings", auth.currentUser.uid);
                                await setDoc(docRef, listingData);

                                console.log("Document written with ID: ", auth.currentUser.uid);
                                navigate('/pick-date');
                            } catch (error) {
                                console.error("Error adding document: ", error);
                                toast.error('Error creating listing: ' + error.message);
                            }
                        }).catch((error) => {
                            console.error('Error getting download URL:', error);
                            toast.error('Error getting download URL: ' + error.message);
                        });
                    }).catch((error) => {
                        console.log('Error uploading file:', error);
                        toast.error('Error uploading file:', error.message);
                    });
                })
                .catch(error => {
                    console.error('Error retrieving Blob from URL:', error);
                });
        } catch (error) {
            toast.error(error.message)
        }
    }
    return (
        <>
      <Spinner clsName={loading ? 'd-flex' : 'd-none'} />
        <div className="th-btn  fill w-100 d-flex gap-2 justify-content-center align-items-center" onClick={onGoogleClick}>
            <span>Sign {location.pathname === '/sign-in' ? 'In' : 'Up'} with</span>
            <span> <img src={img} className="w-100" alt="goodle img" /> </span>
        </div>
        </>
    )
}

export default OAuth

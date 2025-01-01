import Header from '../component/Header'
import Footer from '../component/Footer'
import heartImg from '../assets/heart.png'
import { Link } from 'react-router-dom'
import React, { useEffect, useRef, useState } from 'react'
import { getAuth } from 'firebase/auth'
import { collection, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase.config";

function Thankyou() {
    const [listingData, setListingData] = useState('')
    useEffect(() => {
        const fetchCurrentListing = async () => {
          const auth = getAuth()
          const docRef = doc(db, 'listings', auth.currentUser.uid)
          const docSnap = await getDoc(docRef)
          if (docSnap.exists()) {
            console.log(docSnap.data())
            setListingData(docSnap.data())
          }
        }
        fetchCurrentListing()
      }, [])
      const formatDate = (timestamp) => {
        // Convert Firestore Timestamp to JavaScript Date
        const date = new Date(timestamp.seconds * 1000); // Firestore seconds to milliseconds
      
        // Format Date to MM/DD/YY
        return new Intl.DateTimeFormat("en-US", {
          month: "2-digit",
          day: "2-digit",
          year: "2-digit",
        }).format(date);
      };
    return (
        <>
            <Header />
            <section className="thankyou">
                <div className="container-xxl">
                    <div className="d-flex flex-column text-center">
                        <div className="th-icon">
                            <img src={heartImg} className='w-100' alt="" />
                        </div>
                        <div className="th-body mt-3 mt-md-5">
                            <h1>Thank You for Your Submission!</h1>
                            <p className="mb-0 mt-3">
                            Your booking for <b>{formatDate(listingData.dateOfPosting)}</b> has been confirmed under slot <b>{listingData.slotNumber}</b> and will be posted between
                            2:00 and 2:30 PM.
                            </p>
                        </div>
                        <div className="d-flex justify-content-center">
                        <Link to='/' className="th-button mt-3 mt-md-5">
                            Go Back to Homepage                        
                        </Link>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    )
}

export default Thankyou

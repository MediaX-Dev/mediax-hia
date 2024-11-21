import { doc, getDoc, updateDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { db } from '../firebase.config'
import { toast } from 'react-toastify'
import Header from '../component/Header'
function EditListing() {
    const [editData, setEditData] = useState(null)
    const [payment, setPayment] = useState(editData ? editData.payment : '');
    const [postStatus, setPostStatus] = useState(editData ? editData.postStatus : '');
    const [postLink, setPostLink] = useState('');
    const { listingId } = useParams()
    const navigate = useNavigate()
    useEffect(() => {
        const fetchData = async () => {
            const docRef = doc(db, 'listings', listingId)
            const docSnap = await getDoc(docRef)
            if (docSnap.exists()) {
                // console.log(docSnap.data())
                setEditData(docSnap.data())
            }
        }
        fetchData()
    })
    const formatDate = (timestamp) => {
        if (!timestamp) return ''; // Handle undefined or null timestamps
        const date = timestamp.toDate();
        return date.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
        }).replace(/\./g, ''); // Remove dots after the abbreviated month
    };
    const handlePaymentChange = (e) => {
        setPayment(e.target.value === 'true');
    };

    const handlePostStatusChange = (e) => {
        setPostStatus(e.target.value === 'true');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const listingRef = doc(db, 'listings', listingId);

        // Update the listing with new payment and postStatus values
        try {
            await updateDoc(listingRef, {
                payment: payment,
                postStatus: postStatus,
            });

            // if (postStatus) {
            //     // Send email if postStatus is updated to "Posted"
            //     toast.success(editData.gmail)
            //     sendPostEmail(editData.gmail, postLink);
            // }
            toast.success('Listing updated successfully!');
            navigate('/admin/dashboard')
        } catch (error) {
            toast.error('Error updating document: ', error);
        }
    };
    /* // Send the post email using FormSubmit
    const sendPostEmail = async (email, link) => {
        try {
            const response = await fetch('https://formsubmit.co/ajax/jitender.work.mediax@gmail.com', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: 'FormSubmit',
                    message: `Your image has been posted and here is the link: ${link}`,
                    _replyto: email, // Reply to user's email
                }),
            });

            const result = await response.json();
            if (response.ok) {
                toast.success('Email sent successfully!');
            } else {
                throw new Error(result.error || 'Error sending email');
            }
        } catch (error) {
            toast.error('Error sending email: ', error);
        }
    }; */
    // Send the post email when the status is updated to "Posted"
//   const sendPostEmail = async (email, link) => {
//     try {
//       await emailjs.send(
//         'service_x7mez2i', // Replace with your EmailJS service ID
//         'template_ycse5id', // Replace with your EmailJS template ID
//         {
//           to_email: email,
//           post_link: link,
//           message: `Your image has been posted and here is the link: ${link}`,
//         },
//         'YOUR_USER_ID' // Replace with your EmailJS user ID
//       );
//       alert('Email sent successfully!');
//     } catch (error) {
//       console.error('Error sending email: ', error);
//     }
//   };
    return (
        <div>
            <Header/>
            <div className="row justify-content-center my-5">
                <h1 className="text-center my-5">Edit {editData && editData.name}'s Listing </h1>
                <div class="col-md-5 order-md-0">
                    <div class="boobit-right">
                        <form onSubmit={handleSubmit}>
                            <div class="mb-3">
                                <label htmlFor="" className="form-label">Slot No:</label>
                                <input type="text" class="form-control" disabled={true} value={editData && editData.slotNumber} />
                            </div>
                            <div class="mb-3">
                                <label htmlFor="" className="form-label">Name:</label>
                                <input type="text" class="form-control" disabled={true} value={editData && editData.name} />
                            </div>
                            <div class="mb-3">
                                <label htmlFor="" className="form-label">Email:</label>
                                <input type="text" class="form-control" disabled={true} value={editData && editData.gmail} />
                            </div>
                            <div class="mb-3">
                                <label htmlFor="" className="form-label">Date of Posting:</label>
                                <input type="text" class="form-control" disabled={true} value={formatDate(editData && editData.dateOfPosting)} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="" className="form-label">Posting Status:</label>
                                <select className="form-select" name="postStatus" value={postStatus} onChange={handlePostStatusChange}>
                                    <option value="" disabled>Select Posting Status</option>
                                    <option value="true">Posted</option>
                                    <option value="false">Pending</option>
                                </select>

                            </div>
                            {/* <div className="mb-3">
                                <label htmlFor="" className="form-label">Post Link:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={postLink}
                                    onChange={(e)=>setPostLink(e.target.value)}
                                    placeholder="Enter post link"
                                />
                            </div> */}
                            <div className="mb-3">
                                <label htmlFor="" className="form-label">Payment:</label>
                                <select className="form-select" name="payment" value={payment} onChange={handlePaymentChange}>
                                    <option value="" disabled>Select Payment</option>
                                    <option value="true">Paid</option>
                                    <option value="false">Unpaid</option>
                                </select>
                            </div>
                            <button type="submit" className="th-btn fill w-100 mt-3">Update</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditListing

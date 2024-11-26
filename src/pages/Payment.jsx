import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import hiaLogo from '../assets/logo.png';
import { getAuth } from 'firebase/auth';
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { db } from "../firebase.config";
import { useNavigate } from "react-router-dom";
import axios from "axios"
import { load } from '@cashfreepayments/cashfree-js'

function Payment() {
  // const [responseId, setResponseId] = useState('');
  const [listingData, setListingData] = useState({})
  const navigate = useNavigate()
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
  /*  const loadScript = (src) => {
     return new Promise((resolve) => {
       if (document.querySelector(`script[src="${src}"]`)) {
         resolve(true); // Script is already loaded
         return;
       }
       const script = document.createElement('script');
       script.src = src;
       script.onload = () => {
         resolve(true);
       };
       script.onerror = () => {
         resolve(false);
       };
       document.body.appendChild(script);
     });
   };
 
   const createRazorpayOrder = (amount) => {
     const data = JSON.stringify({
       amount: amount * 100, // Convert amount to paise
       currency: 'INR',
     });
 
     const config = {
       method: 'post',
       maxBodyLength: Infinity,
       url: 'http://localhost:8000/orders',
       headers: {
         'Content-Type': 'application/json',
       },
       data: data,
     };
 
     axios.request(config)
       .then((response) => {
         console.log(JSON.stringify(response.data));
         handleRazorpayScreen(response.data.amount);
       })
       .catch((error) => {
         console.log('Error at order creation', error);
         toast.error('Failed to create order.');
       });
   };
 
   const handleRazorpayScreen = async (amount) => {
     const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js');
     if (!res) {
       toast.error('Failed to load Razorpay checkout.');
       return;
     }
 
     const options = {
       key: 'rzp_test_P2P6lF14A7MpRI',
       amount: amount,
       currency: 'INR',
       name: 'Happening In Agra',
       description: 'Payment to Happening In Agra',
       image: hiaLogo,
       handler: function (response) {
         setResponseId(response.razorpay_payment_id);
         // Send this to your backend for verification
 
         // Call updatePaymentStatus after successful payment
         updatePaymentStatus(response.razorpay_payment_id);
       },
       theme: {
         color: '#01b4bc',
       },
     };
 
     const paymentObject = new window.Razorpay(options);
     paymentObject.open();
   }; */


  let cashfree;

  let insitialzeSDK = async function () {

    cashfree = await load({
      // mode: "sandbox",
      mode: "production",
    })
  }

  insitialzeSDK()

  const [orderId, setOrderId] = useState("")



  const getSessionId = async () => {
    try {
      const auth = getAuth()
      const docRef = doc(db, 'listings', auth.currentUser.uid)
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        console.log(docSnap.data())
        debugger;
      }
      
      let res = await axios.get("https://mediax-hia-backend-delta.vercel.app/payment")

      if (res.data && res.data.payment_session_id) {

        console.log(res.data)
        setOrderId(res.data.order_id)
        return res.data.payment_session_id
      }


    } catch (error) {
      console.log(error)
    }
  }

  /*   const verifyPayment = async () => {
      try {
        
        let res = await axios.post("https://mediax-hia-backend-delta.vercel.app/verify", {
          orderId: orderId
        })
  
        if(res && res.data){
          alert("payment verified")
        }
  
      } catch (error) {
        console.log(error)
      }
    } */
  const verifyPayment = async (orderId) => {
    try {

      const res = await axios.post("https://mediax-hia-backend-delta.vercel.app/verify", {
        orderId: orderId
      })

      if (res && res.data) {
        alert("payment verified")
        return true;
      }

    } catch (error) {
      console.log(error)
      return false;
    }
  }

  /* const handleClick = async (e) => {
    e.preventDefault()
    try {

      let sessionId = await getSessionId()
      let checkoutOptions = {
        paymentSessionId : sessionId,
        redirectTarget:"_modal",
      }

      cashfree.checkout(checkoutOptions).then((res) => {
        console.log("payment initialized")

        verifyPayment(orderId)
        updatePaymentStatus(orderId)
      })


    } catch (error) {
      console.log(error)
    }

  } */
  const handleClick = async () => {
    try {
      let sessionId = await getSessionId()
      let checkoutOptions = {
        paymentSessionId: sessionId,
        redirectTarget: "_modal",
      }
      cashfree.checkout(checkoutOptions).then(async (order) => {
        console.log("payment initialized", order);
        if (await verifyPayment(order.cf_order_id)) {
           await updatePaymentStatus(order)
        }
      })
    } catch (error) {
      console.log(error);
      alert(JSON.stringify(error));
    }
  }

  const updatePaymentStatus = async (order) => {
    // toast.success(resId)
    try {
      const auth = getAuth()
      const docRef = doc(db, 'listings', auth.currentUser.uid)
      await updateDoc(docRef, {
        payment: true,
        paymentResponseId: order.cf_order_id,
        orderDetails: order
      })
      // toast.success('Payment successfully!');
      navigate('/thankyou')
    } catch (error) {
      toast.error('Something went wrong');
    }
  }

  return (
    <div>
      <div className="container-xxl my-5 text-center">
        <h2>Slot Number: {listingData?.slotNumber}</h2>
        <div className="final-post">
          <img src={listingData?.imageUrl} className="w-100" alt="" />
        </div>
        <button className="th-btn fill mt-5" onClick={handleClick}>
          Proceed to pay Rs 1,999
        </button>
      </div>
    </div>
  );
}

export default Payment;

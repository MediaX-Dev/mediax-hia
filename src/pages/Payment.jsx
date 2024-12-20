import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import hiaLogo from '../assets/logo.png';
import { getAuth } from 'firebase/auth';
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { db } from "../firebase.config";
import { useNavigate } from "react-router-dom";
import axios from "axios"
import { load } from '@cashfreepayments/cashfree-js'
import {
  FaTimesCircle
} from 'react-icons/fa';

let orderDetails = null;

function Payment() {
  // const [responseId, setResponseId] = useState('');
  // const [orderDetails, setOrderDetails] = useState({})
  const [listingData, setListingData] = useState({})
  const [loading, setLoading] = useState(false)
  const [payFailed, setPayFailed] = useState(false)

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

        console.log('This is response from get session id', res.data)
        orderDetails = res.data;
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
        console.log("payment verified data", res.data)
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
  // const handleClick = async () => {
  //   try {
  //     setLoading(true)
  //     let sessionId = await getSessionId()
  //     let checkoutOptions = {
  //       paymentSessionId: sessionId,
  //       redirectTarget: "_modal",
  //     }
  //     cashfree.checkout(checkoutOptions).then(async (order) => {
  //       console.log("payment initialized", order, orderDetails);
  //       await verifyPayment(orderDetails.order_id);
  //       console.log(order.error.code)
  //       if(order.error.code == "payment_aborted"){
  //         setPayFailed(true)
  //         setLoading(false)
  //       } else{
  //         navigate('/thankyou')
  //         setPayFailed(false)
  //         setLoading(false)
  //         updatePaymentStatus(orderDetails);
  //       }
  //     })
  //   } catch (error) {
  //     console.log(error);
  //     alert(JSON.stringify(error));
  //   }
  // }
  // const handleClick = async () => {
  //   try {
  //     setLoading(true);
  //     const sessionId = await getSessionId();
  //     const checkoutOptions = {
  //       paymentSessionId: sessionId,
  //       redirectTarget: "_modal",
  //     };

  //     cashfree.checkout(checkoutOptions).then(async (order) => {
  //       console.log("Payment initialized", order, orderDetails);

  //       if (order?.error?.code === "payment_aborted") {
  //         setPayFailed(true);
  //         setLoading(false);
  //         toast.error("Payment was aborted.");
  //       } else {
  //         const paymentVerified = await verifyPayment(orderDetails?.order_id);
  //         if (paymentVerified) {
  //           await updatePaymentStatus(orderDetails);
  //           toast.success("Payment successful!");
  //           setPayFailed(false);
  //           navigate("/thankyou");
  //         } else {
  //           setPayFailed(true);
  //           toast.error("Payment verification failed.");
  //         }
  //         setLoading(false);
  //       }
  //     }).catch((error) => {
  //       console.error("Error in cashfree checkout:", error);
  //       setLoading(false);
  //       toast.error("Payment process failed. Please try again.");
  //     });
  //   } catch (error) {
  //     console.error("Error during payment initialization:", error);
  //     setLoading(false);
  //     toast.error("Something went wrong. Please try again.");
  //   }
  // };

  const handleClick = async () => {
    try {
      setLoading(true);
  
      // Step 1: Get the payment session ID
      const sessionId = await getSessionId();
  
      // Step 2: Configure the checkout options
      const checkoutOptions = {
        paymentSessionId: sessionId,
        redirectTarget: "_modal",
      };
  
      // Step 3: Trigger the Cashfree checkout
      cashfree.checkout(checkoutOptions).then(async (response) => {
        console.log("Payment response:", response);
  
        // Check for payment success
        if (response?.error) {
          console.error("Payment error:", response.error);
          setPayFailed(true);
          setLoading(false);
          toast.error("Payment failed or aborted.");
        } else {
          console.log("Payment successful. Verifying...");
          const paymentVerified = await verifyPayment(orderDetails?.order_id);
  
          if (paymentVerified) {
            await updatePaymentStatus(orderDetails);
            toast.success("Payment successful!");
            setPayFailed(false);
            setLoading(false);
            navigate("/thankyou");
          } else {
            console.error("Payment verification failed.");
            setPayFailed(true);
            setLoading(false);
            toast.error("Payment verification failed.");
          }
        }
      }).catch((error) => {
        console.error("Cashfree checkout error:", error);
        setPayFailed(true);
        setLoading(false);
        toast.error("Payment process failed. Please try again.");
      });
    } catch (error) {
      console.error("Error during payment initialization:", error);
      setPayFailed(true);
      setLoading(false);
      toast.error("Something went wrong. Please try again.");
    }
  };
  
  const updatePaymentStatus = async (order) => {
    // toast.success(resId)
    try {
      const auth = getAuth()
      const docRef = doc(db, 'listings', auth.currentUser.uid)
      await updateDoc(docRef, {
        payment: true,
        paymentResponseId: order.order_id,
        orderDetails: order
      })
      // toast.success('Payment successfully!');

    } catch (error) {
      toast.error('Something went wrong');
    }
  }

  return (
    <div>
      {/* <Spinner className={loading ? 'd-flex' : 'd-none'} /> */}

      <div className="container-xxl my-5 text-center">
        <h2>Slot Number: {listingData?.slotNumber}</h2>
        <div className="final-post">
          <img src={listingData?.imageUrl} className="w-100" alt="" />
        </div>
        {payFailed ? (
          <div className="d-flex flex-column mt-3 mt-md-5 gap-3">
            <div className="th-btn danger">
              <FaTimesCircle /> Payment Failed
            </div>
            <button className="th-btn fill" onClick={handleClick}>
              <div className="d-flex align-items-center justify-content-center gap-2">
                <span className="m-0">{loading ? "Please wait..." : "Try Again"}</span>
              </div>
            </button>

          </div>
        ) : (
          <button className="th-btn fill mt-4" onClick={handleClick}>
            <div className="d-flex align-items-center justify-content-center gap-2">
              <span className="m-0">{loading ? "Please wait..." : "Proceed to pay Rs 1,999"}</span>
            </div>
          </button>
        )}
      </div>
    </div>
  );
}

export default Payment;

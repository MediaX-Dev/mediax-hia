import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import ForgotPassword from "./pages/ForgotPassword";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Privateroute from "./component/Privateroute";
import Listings from "./pages/Listings";
import MyDatePicker from './pages/MyDatePicker'
import Payment from "./pages/Payment";
import Dashboard from "./pages/Dashboard";
import EditListing from "./pages/EditListing";
import AdminSignIn from "./pages/AdminSignIn";
import Privaterouteadmin from "./component/Privaterouteadmin";
import DeleteListing from "./pages/DeleteListing";
import TermsAndConditions from "./pages/TermsAndConditions";
import RefundPolicy from "./pages/RefundPolicy";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import PhoneAuth from "./pages/PhoneAuth";
import ContactUs from "./pages/ContactUs";
import Thankyou from "./pages/Thankyou";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/" element={<Privateroute />}>
          <Route path="/" element={<Home />} />
        </Route> */}
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/listings" element={<Listings />} />
        <Route path="/pick-date" element={<Privateroute />}>
          <Route path="/pick-date" element={<MyDatePicker />} />
        </Route>
        {/* <Route path="/pick-date" element={<MyDatePicker />} /> */}
        <Route path="/payment" element={<Privateroute />}>
          <Route path="/payment" element={<Payment />} />
        </Route>
        {/* <Route path="/payment" element={<Payment />} /> */}
        <Route path="/admin/dashboard" element={<Privaterouteadmin />}>
          <Route path="/admin/dashboard" element={<Dashboard />} />
        </Route>
        <Route path="/admin/edit/:listingId" element={<Privaterouteadmin />}>
          <Route path="/admin/edit/:listingId" element={<EditListing />} />
        </Route>
        <Route path="/admin/delete/:listingId" element={<Privaterouteadmin />}>
          <Route path="/admin/delete/:listingId" element={<DeleteListing />} />
        </Route>
        <Route path="/admin/sign-in" element={<AdminSignIn />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/refund-policy" element={<RefundPolicy />} />
        <Route path="/terms-n-conditions" element={<TermsAndConditions />} />
        <Route path="/phone-auth" element={<PhoneAuth />} />
        <Route path="/contact-us" element={<ContactUs />} />
        {/* <Route path="/thankyou" element={<Privateroute />}>
          <Route path="/thankyou" element={<Thankyou />} />
        </Route> */}
          <Route path="/thankyou" element={<Thankyou />} />
      </Routes>
      <ToastContainer />
    </Router>
  );
}

export default App;

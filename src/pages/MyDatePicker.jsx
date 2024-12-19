import { useEffect, useState } from "react";
import { db } from "../firebase.config";
import { collection, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Header from "../component/Header";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function MyDatePicker() {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(null);
  const [newSlot, setNewSlot] = useState(null);
  const [isDatePickerDisabled, setIsDatePickerDisabled] = useState(false);
  const [minDate, setMinDate] = useState(new Date());

  useEffect(() => {
    const now = new Date();
    const hours = now.getHours(); // Get the current hour (0-23)

    // If the time is after 1 PM, disable today's date
    if (hours >= 13) {
      const tomorrow = new Date();
      tomorrow.setDate(now.getDate() + 1); // Set minDate to tomorrow
      setMinDate(tomorrow);
    }

    const auth = getAuth();
    const fetchData = async () => {
      const docRef = doc(db, 'listings', auth.currentUser.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        if (docSnap.data().dateOfPosting !== '') {
          navigate('/payment');
        }
      }
    };

    fetchData();
  }, [navigate]);

  useEffect(() => {
    const auth = getAuth()
    const fetchData = async () => {
      const docRef = doc(db, 'listings', auth.currentUser.uid)
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        console.log(docSnap.data())
        if (docSnap.data().dateOfPosting !== '') {
          navigate('/payment')
        }
      }
    }
    fetchData()
  }, [])

  const onSubmitDate = async (e) => {
    e.preventDefault();
    const date = selectedDate;
    if (!(date instanceof Date) || isNaN(date)) {
      console.error("Invalid date selected");
      return;
    }

    const formattedDate = date.toLocaleDateString('en-CA');
    const docRef = doc(db, 'bookedSlot', formattedDate);
    const docSnap = await getDoc(docRef);

    let slotNumber;

    if (docSnap.exists()) {
      const availableSlots = docSnap.data().availableSlot || [];

      if (availableSlots.length >= 8) {
        toast.error('All slots booked for this date');
        return false
      } else {
        const lastSlot = availableSlots.length > 0 ? Math.max(...availableSlots) : 0;
        slotNumber = lastSlot + 1;
        if (slotNumber <= 8) {
          await updateDoc(docRef, {
            availableSlot: [...availableSlots, slotNumber]
          });
        }
      }
    } else {
      slotNumber = 1;
      await setDoc(docRef, {
        date: date,
        availableSlot: [slotNumber]
      });
    }

    if (slotNumber !== undefined) {
      const auth = getAuth();
      const listingRef = doc(db, 'listings', auth.currentUser.uid);
      await updateDoc(listingRef, {
        dateOfPosting: date,
        slotNumber: slotNumber,
      });

      navigate('/payment');
    } else {
      console.error('Error: slotNumber is undefined');
    }

    setIsDatePickerDisabled(true);
  };

  return (
    <>
      <Header />
      <section className="book-obituary" id="book-obituary">
        <div className="container-xxl">
          <div className="boobit-container">
            <div className="boobit-box">
              <div className="row justify-content-center">
                <div className="col-lg-6 col-md-8 col-sm-10">
                  <h2 className="text-center mb-4">Check Available Slot</h2>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12 order-md-0">
                  <div className="boobit-right">
                    <form onSubmit={onSubmitDate}>
                      <div className="mb-3">
                        {/* <DatePicker
                          onChange={(date) => setSelectedDate(date)}
                          selected={selectedDate}
                          dateFormat="dd/MM/yyyy"
                          className='date form-control'
                          placeholderText='Date of Posting'
                          showYearDropdown
                          showMonthDropdown
                          scrollableMonthYearDropdown
                          minDate={new Date()}
                          disabled={isDatePickerDisabled}
                        /> */}
                        <DatePicker
                          onChange={(date) => setSelectedDate(date)}
                          selected={selectedDate}
                          dateFormat="dd/MM/yyyy"
                          className="date form-control"
                          placeholderText="Date of Posting"
                          showYearDropdown
                          showMonthDropdown
                          scrollableMonthYearDropdown
                          minDate={minDate}
                          disabled={isDatePickerDisabled}
                        />
                        <div className="ob-icon"><i className="fas fa-calendar-alt"></i></div>
                      </div>
                      {selectedDate && (
                        <div className="d-flex justify-content-center mt-3">
                          <button className="th-btn fill">Proceed</button>
                        </div>
                      )}
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default MyDatePicker;

import hero from '../assets/hero-banner.jpg'
import heroMobile from '../assets/hero-banner-mobile.jpg'
import work from '../assets/work.png'
import workMobile from '../assets/work-mobile.png'
import instDesk from '../assets/foot-ban-desk.jpg'
import instTab from '../assets/foot-ban-tab.jpg'
import instMob from '../assets/foot-ban-mob.jpg'
import workRight from '../assets/work-right.png'
import profile from '../assets/profile.png'
import happenImg from '../assets/happen-img.jpg'
import upImg from '../assets/up-img.png'
import postLine from '../assets/post-line.png'
import postBird from '../assets/bird.png'
import React, { useEffect, useRef, useState } from 'react'
import $ from 'jquery'
import { getAuth } from 'firebase/auth'
import { Link, useNavigate } from 'react-router-dom'
// import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "react-widgets/styles.css";
import DatePickerWidgets from "react-widgets/DatePicker";
import {
    FaCalendar,
    FaCalendarWeek,
    FaCalendarDay,
    FaCalendarCheck,
    FaClock,
} from 'react-icons/fa';
import { format } from 'date-fns'
import html2canvas from 'html2canvas';
import { toast } from 'react-toastify'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db } from '../firebase.config'; // Adjust the import according to your file structure
import { collection, addDoc, setDoc, doc, getDoc } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid'
import Header from '../component/Header'
import Footer from '../component/Footer'
import ReactCrop, { centerCrop, convertToPixelCrop, makeAspectCrop } from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import setCanvasPreview from './setCanvasPreview'
import { el } from 'date-fns/locale'
import Spinner from '../component/Spinner'
function Home() {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [prefix, setPrefix] = useState(null)
    const [nameOfDeceased, setNameOfDeceased] = useState(null)
    const [memoService, setMemoService] = useState(null)
    const [memoService1, setMemoService1] = useState(null)
    const [serviceTimeStart, setServiceTimeStart] = useState('00')
    const [serviceTimeEnd, setServiceTimeEnd] = useState('00')
    const [serviceAddress, setServiceAddress] = useState(null)
    const [dateOfBirth, setDateOfBirth] = useState(null)
    const [dateOfDeath, setDateOfDeath] = useState(null)
    const [dateOfService, setDateOfService] = useState(null)
    const [griefPerson1, setGriefPerson1] = useState(false)
    const [griefPerson2, setGriefPerson2] = useState(false)
    const [griefPerson3, setGriefPerson3] = useState(false)
    const [griefPersonText1, setGriefPersonText1] = useState(null)
    const [griefPersonText2, setGriefPersonText2] = useState(null)
    const [griefPersonText3, setGriefPersonText3] = useState(null)
    const [griefPersonText4, setGriefPersonText4] = useState(null)
    const [griefPersonRelation1, setGriefPersonRelation1] = useState(null)
    const [griefPersonRelation2, setGriefPersonRelation2] = useState(null)
    const [griefPersonRelation3, setGriefPersonRelation3] = useState(null)
    const [griefPersonRelation4, setGriefPersonRelation4] = useState(null)
    const [imageUpload, setImageUpload] = useState(null)
    const [user, setUser] = useState(null)
    const [listingDataCheck, setListingDataCheck] = useState()
    const [listingExists, setListingExists] = useState(false)
    const [tabToggle, setTabToggle] = useState(1)
    const [bookingToggle, setBookingToggle] = useState(1)
    const [cancellationsToggle, setCancellationsToggle] = useState(1)
    const [viewingToggle, setViewingToggle] = useState(1)
    const [paymentToggle, setPaymentToggle] = useState(1)
    const [privacyToggle, setPrivacyToggle] = useState(1)
    const [uploadImgSrc, setUploadImgSrc] = useState('')
    const [uploadImgSrcFinal, setUploadImgSrcFinal] = useState('')
    const [crop, setCrop] = useState()
    const [error, setError] = useState('')
    const imgRef = useRef(null)
    const previewCanvasRef = useRef(null)
    const [confirmToggle, setConfirmToggle] = useState(false)
    const [confirm, setConfirm] = useState(true)
    const [policy1, setPolicy1] = useState(true)
    const [policy2, setPolicy2] = useState(false)
    const [policy3, setPolicy3] = useState(false)
    const [policy4, setPolicy4] = useState(false)
    const [policy5, setPolicy5] = useState(false)
    const [imgStored, setImgStored] = useState(false)
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenDc, setIsOpenDc] = useState(false);
    const [isOpenSc, setIsOpenSc] = useState(false);
    const auth = getAuth()
    useEffect(() => {
        setUser(auth.currentUser)
        const fetchData = async () => {
            const docRef = doc(db, 'listings', auth.currentUser.uid)
            const docSnap = await getDoc(docRef)

            if (docSnap.exists()) {
                console.log(docSnap.data())
                setListingExists(true)
                setListingDataCheck(docSnap.data())
                if (docSnap.data().listingCreated && docSnap.data().dateOfPosting === '') {
                    navigate('/pick-date')
                    // toast.success('you have created obitury last time you visited')
                } else if (!docSnap.data().payment) {
                    navigate('/payment')
                    // toast.success('you have booked slot obitury last time you visited')
                }
            }
        }
        if (auth.currentUser) {
            fetchData()
        }
    }, [])

    useEffect(() => {
        // jQuery code for FAQ toggle
        $('.faq-text').slideUp();
        $('.faq-h').on('click', function () {
            $(this).parent().toggleClass('active');
            $(this).next('.faq-text').slideToggle(100);
            $(this).find('.faq-icon .fal').toggleClass('fa-minus fa-plus');
        });

        // jQuery code for Sidebar toggle
        $('.sidebar-btn-desk').on('click', function () {
            let data = $(this).attr('data-faq');
            $('.faq-tab-container').addClass('d-none');
            $(`#${data}`).removeClass('d-none');
            $('.sidebar-btn-desk').removeClass('active');
            $(this).addClass('active');
        });
        // jQuery code for Sidebar toggle
        $('.sidebar-btn-mob').next().slideUp(500)
        $('.sidebar-btn-mob').eq(0).next().slideDown(500)
        $('.sidebar-btn-mob').on('click', function () {
            // $('.sidebar-btn-mob').removeClass('active');
            // $('.faq-tab-container').slideUp(500);
            $(this).next().slideToggle(500)
            $(this).toggleClass('active');
        });

        // Cleanup event handlers when component unmounts
        return () => {
            $('.faq-h').off('click');
            $('.sidebar-btn').off('click');
        };
    }, []); // Empty dependency array ensures this runs only on component mount


    

    function confirmDetails() {
        if (!prefix || !nameOfDeceased || !dateOfBirth || !dateOfDeath || !serviceTimeStart || !serviceTimeEnd || !dateOfService || !serviceAddress || !griefPersonText1 || (memoService === "Write Your Own" ? !memoService1 : !memoService)) {
            toast.error('Warning: All fields must be filled out.');
            return false;
        } else if (!griefPersonRelation1) {
            toast.error('Warning: Please select your relationship with the deceased person.');
            return false;
        } else if (griefPerson1 && !griefPersonText2) {
            toast.error('Please Fill all the fields');
            return false;
        } else if (griefPerson1 && !griefPersonRelation2) {
            toast.error('Warning: Please select your relationship with the deceased person.');
            return false;
        } else if (griefPerson2 && !griefPersonText3) {
            toast.error('Please Fill all the fields');
            return false;
        } else if (griefPerson2 && !griefPersonRelation3) {
            toast.error('Warning: Please select your relationship with the deceased person.');
            return false;
        } else if (griefPerson3 && !griefPersonText4) {
            toast.error('Please Fill all the fields');
            return false;
        } else if (griefPerson3 && !griefPersonRelation4) {
            toast.error('Warning: Please select your relationship with the deceased person.');
            return false;
        } else if (!imgStored) {
            toast.error('Ensure to upload an image of the deceased.');
            return false;
        }
        setConfirmToggle(true)
        // Call the function or operation you want to perform

        /* const confirm = window.confirm("Please check everything before going forward");
        if (confirm) {
            document.querySelector('.boobit-img-container').style.transform = 'scale(1)';

            handleClick(); // Call the function or operation you want to perform
        } else {
            // toast.error('Please check all the details')
            return false
        } */

    }
    const confirmProceed = () => {
        document.querySelector('.boobit-img-container').style.transform = 'scale(1)';
        handleClick();
    }

    function handleClick() {
        html2canvas(document.querySelector('#boobit-img'),
            { scale: 6 }
            // {  scale: 2, width: 1080, height: 1080 }
        ).then(function (canvas) {
            canvas.toBlob(function (blob) {
                const file = new File([blob], 'post.jpg', { type: 'image/jpeg' });
                const dataTransfer = new DataTransfer();
                dataTransfer.items.add(file);
                const image = dataTransfer.files;

                // Convert the Blob to a Blob URL and store it in localStorage
                const blobUrl = URL.createObjectURL(blob);
                localStorage.setItem('imageBlobUrl', blobUrl);
                navigate('/sign-in')
            }, 'image/jpeg');
        }).catch(function (error) {
            console.log('Error capturing the section:', error);
        });
    }

    const onImageLoad = (e) => {
        const { width, height } = e.currentTarget;
        const cropWidthInPercent = (150 / width) * 100
        const crop = makeAspectCrop(
            {
                unit: '%',
                width: cropWidthInPercent,
            }, 1, width, height
        )
        const centeredCrop = centerCrop(crop, width, height)
        setCrop(centeredCrop)
    }

    const [endTimeOptions, setEndTimeOptions] = useState([
        "5:30 AM", "6:00 AM", "6:30 AM", "7:00 AM", "7:30 AM", "8:00 AM",
        "8:30 AM", "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM",
        "11:30 AM", "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM", "2:00 PM",
        "2:30 PM", "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM", "5:00 PM",
        "5:30 PM", "6:00 PM", "6:30 PM", "7:00 PM", "7:30 PM", "8:00 PM",
        "8:30 PM", "9:00 PM", "9:30 PM", "10:00 PM", "10:30 PM", "11:00 PM",
        "11:30 PM"
    ]);
    const [filteredEndTimeOptions, setFilteredEndTimeOptions] = useState(endTimeOptions);

    // Helper function to convert time to minutes
    const timeToMinutes = (time) => {
        const [hours, minutes] = time.split(/[: ]/);
        return (parseInt(hours, 10) % 12) * 60 + parseInt(minutes, 10) + (time.includes("PM") ? 720 : 0);
    };

    // Update end times options based on the selected start time
    const updateEndTimeOptions = (startTime) => {
        const filteredOptions = endTimeOptions.filter(option => timeToMinutes(option) >= timeToMinutes(startTime));
        setServiceTimeEnd(prevEndTime => filteredOptions.includes(prevEndTime) ? prevEndTime : "00");
        return filteredOptions;
    };
    useEffect(() => {
        if (serviceTimeStart !== "00") {
            const filteredOptions = endTimeOptions.filter(
                option => timeToMinutes(option) > timeToMinutes(serviceTimeStart)
            );
            setFilteredEndTimeOptions(filteredOptions);

            // Reset `serviceTimeEnd` if it's not in the updated options
            if (!filteredOptions.includes(serviceTimeEnd)) {
                setServiceTimeEnd("00");
            }
        }
    }, [serviceTimeStart]);

    /*  const handleDateOfBirthChange = (date) => {
         if (dateOfDeath && date > dateOfDeath) {
             alert("Date of birth cannot be later than the date of death.");
             return;
         }
         setDateOfBirth(date);
     };
 
     const handleDateOfDeathChange = (date) => {
         if (dateOfBirth && date < dateOfBirth) {
             alert("Date of death cannot be earlier than the date of birth.");
             return;
         }
         setDateOfDeath(date);
     }; */
    const handleDateOfBirthChange = (date) => {
        if (!(date instanceof Date) || isNaN(date)) {
            console.error("Invalid date selected for Date of Birth.");
            return;
        }
        if (dateOfDeath && date > dateOfDeath) {
            alert("Date of birth cannot be later than the date of death.");
            return;
        }
        setDateOfBirth(date);
        setIsOpen(false);
    };
    const handleDateOfDeathChange = (date) => {
        if (!(date instanceof Date) || isNaN(date)) {
            console.error("Invalid date selected for Date of Death.");
            return;
        }
        if (dateOfBirth && date < dateOfBirth) {
            alert("Date of death cannot be earlier than the date of birth.");
            return;
        }
        setDateOfDeath(date);
        setIsOpenDc(false);
    };
    const handleDateOfServiceChange = (date) => {
        if (date instanceof Date && !isNaN(date)) {
            setDateOfService(date);
        } else {
            console.error("Invalid date selected for Date of Service.");
        }
        setIsOpenSc(false);
    };


    // Effect to update end time options whenever start time changes
    useEffect(() => {
        if (serviceTimeStart !== "00") {
            setEndTimeOptions(updateEndTimeOptions(serviceTimeStart));
        }
    }, [serviceTimeStart]);
    return (
        <>
            {/* <!-- Header Section Start --> */}
            <Header />
            {/* <!-- Header Section End --> */}
            <main>
                {/* <!-- Hero Section Start --> */}
                <section className='hero'>
                    {/* <img src={hero} class="d-none d-sm-block w-100" alt="" />
                    <img src={heroMobile} class="d-block d-sm-none w-100" alt="" />*/}
                    <div className="container-xxl">
                        <h1 className='mb-3  text-center'>
                            <div className="primary">Honor Their Memory</div>
                            <div className="secondary">Share A Tribute</div>
                            <img src={postBird} alt="" />
                        </h1>
                        <p>Remembering and honoring a loved one is a deeply personal journey. We are here to help you share their life with grace and dignity, ensuring that their memory is cherished and respected.</p>
                        <div className="d-flex justify-content-center mt-3">
                            <a href="#book-obituary" className="th-btn fill"> Register now</a>
                        </div>
                    </div>
                </section>
                {/* <!-- Hero Section End --> */}

                {/* <!-- How It Works Section Start --> */}
                <section className='how-it-works'>
                    <div class="container-xxl">
                        <div class="hoitwo-box">
                            <div class="mb-3 mb-sm-5 text-center">
                                <h2>How it works</h2>
                            </div>
                            <div class="row justify-content-center">
                                <div class="col-lg-8">
                                    <div class="row justify-content-around">
                                        <div class="col-sm-5 p-0">
                                            <div class="hoitwo-con">
                                                <div class="hoitwo-img p-2 d-none d-sm-block"><img src={work} alt="" class="w-100" /></div>
                                                <div class="hoitwo-img p-2 d-block d-sm-none"><img src={workMobile} alt="" class="w-100" /></div>
                                            </div>
                                            <div class="mt-2 text-center d-flex">
                                                <a href="#book-obituary" class="th-btn fill">Register Now</a>
                                            </div>
                                        </div>
                                        <div class="col-sm-6 mt-4 mt-sm-0 p-0"><img src={workRight} alt="" class="w-100" /></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="hoitwo-pera">
                            <p>Losing a loved one is incredibly challenging. Our goal is to offer a straightforward and compassionate way to share these significant moments, helping friends and family come together to remember them with respect.
                            </p>
                        </div>
                    </div>
                </section>
                {/* <!-- How It Works Section End --> */}


                {/* <!-- Book an Obituary Section Start --> */}
                <section class="book-obituary" id="book-obituary">
                    <div class="container-xxl">
                        <div class="boobit-container">
                            <div class="boobit-box">
                                <div class="row justify-content-center">
                                    <div class="col-lg-6 col-md-8 col-sm-10">
                                        <h2 class="text-center mb-2 mb-sm-4">{listingExists ? 'You have created Obituary' : 'Create a Personalized Tribute'}</h2>
                                        <p class="text-center mb-0 mb-sm-4">
                                        {listingExists ? '' : 'Share the details and upload a photo to craft a meaningful obituary. Simply complete the form below to get started.'}
                                        </p>
                                        {/* {listingExists &&(<div className="text-center"><img src={listingDataCheck?.imageUrl} alt="" className="w-50" /></div>)} */}
                                    </div>
                                </div>

                                <div className={`row ${listingExists ? 'd-none' : ' '}`}>
                                    <div class="col-lg-7 order-lg-1 boobit-left-conatiner mb-sm-4">
                                        <div class="boobit-left d-flex justify-content-center align-items-start">
                                            <div className="boobit-img-container">
                                                <div id="boobit-img" class="boobit-img mx-auto">
                                                    <div className="boobit-bird"><img src={postBird} className='w-100' alt="" /></div>
                                                    {/* <div class="boobit-head">in loving memory of </div> */}
                                                    <div class="boobit-img"><img src={uploadImgSrcFinal ? uploadImgSrcFinal : profile} class="w-100"
                                                        id="boobit-up-img" alt="" /></div>
                                                    <div class="boobit-text">
                                                        <div class="boobit-name">
                                                            <div class="boobit-prefix">{prefix ? prefix : 'Mr.'}</div>
                                                            <div class="boobit-n-t">{nameOfDeceased ? nameOfDeceased : 'Kalash Singh'}</div>
                                                        </div>
                                                        <div className="boobit-post-line">
                                                            <img src={postLine} className='w-100' alt="" />
                                                        </div>
                                                        <div class="boobit-life-spam">
                                                            <div class="boobit-date-of-birth">
                                                                {dateOfBirth ? format(dateOfBirth, 'do MMM, yyyy') : '20th April, 1883'}
                                                                {/* {dateOfBirth? dateOfBirth.toLocaleDateString('en-GB') : '20th April, 1883'} */}
                                                            </div>
                                                            <div class="">-</div>
                                                            <div class="boobit-date-of-death">
                                                                {dateOfDeath ? format(dateOfDeath, 'do MMM, yyyy') : '19th April, 1945'}
                                                            </div>
                                                        </div>
                                                        <div class="boobit-service">
                                                            {memoService
                                                                ? (memoService === "Write Your Own" ? "" : memoService)
                                                                : "Memorial Service"}
                                                            {memoService1 || ""}

                                                        </div>
                                                        <div class="boobit-details text-center">
                                                            <div class="boobit-time">
                                                                {serviceTimeStart ? serviceTimeStart : '10:00am'}
                                                                &nbsp;-    {serviceTimeEnd ? serviceTimeEnd : '12:30pm'}
                                                            </div>
                                                            <div class="">|</div>
                                                            <div class="boobit-date">
                                                                {dateOfService ? format(dateOfService, 'do MMM, yyyy') : '20th April, 1883'}
                                                            </div>
                                                            <div class="">|</div>
                                                            <div class="boobit-address">{serviceAddress ? serviceAddress : 'Surya Nagar Mandir, Agra'}</div>
                                                        </div>
                                                    </div>
                                                    <div class="boobit-h-grif">
                                                        In Grief:
                                                    </div>
                                                    <div class="boobit-greif">

                                                        {griefPersonText1 ? `${griefPersonText1} ${`(${griefPersonRelation1})`}` : (<>Person1 (Relation) | Person2 (Relation) <br /> Person3 (Relation) | Person4 (Relation)</>)}
                                                        {griefPersonText2 && ` | ${griefPersonText2} (${griefPersonRelation2})`}
                                                        <div className="mt-1"></div>
                                                        {griefPersonText3 && `${griefPersonText3} (${griefPersonRelation3})`}
                                                        {griefPersonText4 && ` | ${griefPersonText4} (${griefPersonRelation4})`}
                                                    </div>
                                                    <div class="boobit-happening">
                                                        <img src={happenImg} alt="" class="w-100" id="happening-img" />
                                                    </div>
                                                </div>
                                            </div>
                                            {/* <div id="apply-change" onClick={handleClick} class="th-btn outline">
                                                Apply Changes
                                            </div> */}
                                        </div>
                                    </div>
                                    <div class="col-lg-5 order-lg-0">
                                        <div class="boobit-right">
                                            <form action="" method="post">
                                                <div class="mb-3">
                                                    <select class="form-select" name="prefix" id="prefix-select" value={prefix} onChange={(pfix) => setPrefix(pfix.target.value)}>
                                                        <option selected disabled>Select Prefix</option>
                                                        <option value="Mr.">Mr.</option>
                                                        <option value="Mrs.">Mrs.</option>
                                                        <option value="Miss">Miss</option>
                                                        <option value="Ms.">Ms.</option>
                                                        <option value="Shri">Shri</option>
                                                        <option value="Sri">Sri</option>
                                                    </select>
                                                </div>
                                                <div class="mb-3">
                                                    <input type="text" class="form-control text-capitalize" maxLength='21' id="name-of-deceased" value={nameOfDeceased}
                                                        placeholder="Name of Deceased" onChange={(prev) => setNameOfDeceased(prev.target.value)} />
                                                </div>
                                                <div className="mb-3">
                                                    <DatePickerWidgets
                                                        value={dateOfBirth || null}
                                                        onChange={handleDateOfBirthChange}
                                                        // onToggle={() => setIsOpen(true)} // Opens DatePicker on focus
                                                        onFocus={() => setIsOpen(true)}
                                                        onBlur={() => setIsOpen(false)} // Closes DatePicker when blurred
                                                        open={isOpen} // Controls the visibility
                                                        // editFormat="DD MMM, YYYY"
                                                        parse={(str) => {
                                                            const date = new Date(str);
                                                            return isNaN(date) ? null : date;
                                                        }}
                                                        placeholder="Date of Birth"
                                                        max={new Date()}
                                                    />
                                                    {/* <DatePickerWidgets
                                                        value={dateOfBirth}
                                                        onChange={setDateOfBirth}
                                                        editFormat="DD MMM, YYYY" // User can input the date in this format
                                                        parse={str => new Date(str)} // Parse the input into a Date object
                                                        placeholder="Date of birth"
                                                        max={new Date()}
                                                    /> */}
                                                </div>
                                                <div className="mb-3">
                                                    <DatePickerWidgets
                                                        value={dateOfDeath || null}
                                                        onChange={handleDateOfDeathChange}
                                                        editFormat="DD MMM, YYYY"
                                                        onFocus={() => setIsOpenDc(true)}
                                                        onBlur={() => setIsOpenDc(false)} // Closes DatePicker when blurred
                                                        open={isOpenDc} // Controls the visibility
                                                        parse={(str) => {
                                                            const date = new Date(str);
                                                            return isNaN(date) ? null : date;
                                                        }}
                                                        placeholder="Date of Death"
                                                        min={dateOfBirth || undefined}
                                                        max={new Date()}
                                                    />
                                                </div>
                                                <div class="mb-3">
                                                    <select class={`form-select ${memoService === "Write Your Own" ? 'd-none' : ''}`} id="service-select" value={memoService} onChange={(memo) => setMemoService(memo.target.value)}>
                                                        <option selected disabled>Service</option>
                                                        <option value="Shav Yatra">Shav Yatra</option>
                                                        <option value="Uthawani">Uthawani</option>
                                                        <option value="Tehravi">Tehravi</option>
                                                        <option value="Chautha">Chautha</option>
                                                        <option value="Write Your Own">Write Your Own</option>
                                                    </select>
                                                    <div class={`my-3 ${memoService === "Write Your Own" ? 'd-block' : 'd-none'}`}>
                                                        <input type="text" class="form-control" placeholder="Write Your Own" value={memoService1} onChange={(memo) => setMemoService1(memo.target.value)}
                                                            maxLength="30" />
                                                    </div>
                                                </div>
                                                <div className="mb-3">
                                                    {/*  <select className="form-select" value={serviceTimeStart} onChange={(e) => setServiceTimeStart(e.target.value)}>
                                                        <option value="00" disabled>Time of Service (Start)</option>
                                                        {endTimeOptions.map(time => (
                                                            <option key={time} value={time}>{time}</option>
                                                        ))}
                                                    </select> */}
                                                    <select
                                                        className="form-select"
                                                        value={serviceTimeStart}
                                                        onChange={(e) => setServiceTimeStart(e.target.value)}
                                                    >
                                                        <option value="00" disabled>Time of Service (Start)</option>
                                                        {endTimeOptions.map(time => (
                                                            <option key={time} value={time}>{time}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                                <div className="mb-3">
                                                    {/*  <select className="form-select" value={serviceTimeEnd} onChange={(e) => setServiceTimeEnd(e.target.value)}>
                                                        <option value="00" disabled>Time of Service (End)</option>
                                                        {endTimeOptions.map(time => (
                                                            <option key={time} value={time}>{time}</option>
                                                        ))}
                                                    </select> */}

                                                    <select
                                                        className="form-select"
                                                        value={serviceTimeEnd}
                                                        onChange={(e) => setServiceTimeEnd(e.target.value)}
                                                    >
                                                        <option value="00" disabled>Time of Service (End)</option>
                                                        {filteredEndTimeOptions.map(time => (
                                                            <option key={time} value={time}>{time}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                                <div className="mb-3">
                                                    <DatePickerWidgets
                                                        value={dateOfService || null} // Default to null if invalid
                                                        onChange={handleDateOfServiceChange}
                                                        editFormat="DD MMM, YYYY"
                                                        onFocus={() => setIsOpenSc(true)}
                                                        onBlur={() => setIsOpenSc(false)} // Closes DatePicker when blurred
                                                        open={isOpenSc} // Controls the visibility
                                                        parse={(str) => {
                                                            const parsedDate = new Date(str);
                                                            return isNaN(parsedDate) ? null : parsedDate;
                                                        }}
                                                        placeholder="Date of Service"
                                                        min={new Date()} // Ensure this is a valid date
                                                    />
                                                </div>
                                                <div class="mb-3">
                                                    <input type="text" class="form-control" id="address" placeholder="Address of Memorial Service" value={serviceAddress}
                                                        maxLength="24" onChange={(addr) => setServiceAddress(addr.target.value)} />
                                                </div>
                                                <div class="">
                                                    <div class="greif">
                                                        <div class="d-flex gap-3 mb-3">
                                                            <input type="text" class="form-control greif-input" maxLength="15" value={griefPersonText1} onChange={(prev) => setGriefPersonText1(prev.target.value)} placeholder="Person in Grief" />
                                                            <select class="form-select" name="prefix" id="prefix-select" value={griefPersonRelation1} onChange={(rel) => setGriefPersonRelation1(rel.target.value)}>
                                                                <option value="Relation" selected>Relation</option>
                                                                <option value="Father">Father</option>
                                                                <option value="Mother">Mother</option>
                                                                <option value="Son">Son</option>
                                                                <option value="Daughter">Daughter</option>
                                                                <option value="Sister">Sister</option>
                                                                <option value="Brother">Brother</option>
                                                                <option value="Husband">Husband</option>
                                                                <option value="Wife">Wife</option>
                                                                <option value="Grandfather">Grandfather</option>
                                                                <option value="Grandmother">Grandmother</option>
                                                                <option value="Father-in-law">Father-in-law</option>
                                                                <option value="Mother-in-law">Mother-in-law</option>
                                                                <option value="Friend">Friend</option>
                                                            </select>
                                                            <div class={`form-control w-auto ${griefPerson1 ? "disabled" : ""}`} onClick={() => { setGriefPerson1(true) }}><i
                                                                class="fal fa-plus fa-plus-icon"></i></div>
                                                        </div>
                                                        {griefPerson1 && (
                                                            <div class="d-flex gap-3 mb-3">
                                                                <input type="text" class="form-control greif-input" maxLength="15" value={griefPersonText2} onChange={(prev) => setGriefPersonText2(prev.target.value)} placeholder="Person in Grief" />
                                                                <select class="form-select" name="prefix" id="prefix-select" value={griefPersonRelation2} onChange={(rel) => setGriefPersonRelation2(rel.target.value)}>
                                                                    <option value="Relation" selected>Relation</option>
                                                                    <option value="Father">Father</option>
                                                                    <option value="Mother">Mother</option>
                                                                    <option value="Son">Son</option>
                                                                    <option value="Daughter">Daughter</option>
                                                                    <option value="Sister">Sister</option>
                                                                    <option value="Brother">Brother</option>
                                                                    <option value="Husband">Husband</option>
                                                                    <option value="Wife">Wife</option>
                                                                    <option value="Grandfather">Grandfather</option>
                                                                    <option value="Grandmother">Grandmother</option>
                                                                    <option value="Father-in-law">Father-in-law</option>
                                                                    <option value="Mother-in-law">Mother-in-law</option>
                                                                    <option value="Friend">Friend</option>
                                                                </select>
                                                                <div class={`form-control w-auto ${griefPerson2 ? "disabled" : ""}`} onClick={() => { setGriefPerson2(true) }}><i
                                                                    class="fal fa-plus fa-plus-icon"></i></div>
                                                            </div>)}
                                                        {griefPerson2 && (
                                                            <div class="d-flex gap-3 mb-3">
                                                                <input type="text" class="form-control greif-input" maxLength="15" value={griefPersonText3} onChange={(prev) => setGriefPersonText3(prev.target.value)} placeholder="Person in Grief" />
                                                                <select class="form-select" name="prefix" id="prefix-select" value={griefPersonRelation3} onChange={(rel) => setGriefPersonRelation3(rel.target.value)}>
                                                                    <option value="Relation" selected>Relation</option>
                                                                    <option value="Father">Father</option>
                                                                    <option value="Mother">Mother</option>
                                                                    <option value="Son">Son</option>
                                                                    <option value="Daughter">Daughter</option>
                                                                    <option value="Sister">Sister</option>
                                                                    <option value="Brother">Brother</option>
                                                                    <option value="Husband">Husband</option>
                                                                    <option value="Wife">Wife</option>
                                                                    <option value="Grandfather">Grandfather</option>
                                                                    <option value="Grandmother">Grandmother</option>
                                                                    <option value="Father-in-law">Father-in-law</option>
                                                                    <option value="Mother-in-law">Mother-in-law</option>
                                                                    <option value="Friend">Friend</option>
                                                                </select>
                                                                <div class={`form-control w-auto ${griefPerson3 ? "disabled" : ""}`} onClick={() => { setGriefPerson3(true) }}><i
                                                                    class="fal fa-plus fa-plus-icon"></i></div>
                                                            </div>)}
                                                        {griefPerson3 && (
                                                            <div class="d-flex gap-3 mb-3">
                                                                <input type="text" class="form-control greif-input" maxLength="15" value={griefPersonText4} onChange={(prev) => setGriefPersonText4(prev.target.value)} placeholder="Person in Grief" />
                                                                <select class="form-select" name="prefix" id="prefix-select" value={griefPersonRelation4} onChange={(rel) => setGriefPersonRelation4(rel.target.value)}>
                                                                    <option value="Relation" selected>Relation</option>
                                                                    <option value="Father">Father</option>
                                                                    <option value="Mother">Mother</option>
                                                                    <option value="Son">Son</option>
                                                                    <option value="Daughter">Daughter</option>
                                                                    <option value="Sister">Sister</option>
                                                                    <option value="Brother">Brother</option>
                                                                    <option value="Husband">Husband</option>
                                                                    <option value="Wife">Wife</option>
                                                                    <option value="Grandfather">Grandfather</option>
                                                                    <option value="Grandmother">Grandmother</option>
                                                                    <option value="Father-in-law">Father-in-law</option>
                                                                    <option value="Mother-in-law">Mother-in-law</option>
                                                                    <option value="Friend">Friend</option>
                                                                </select>
                                                                <div class="form-control w-auto" onClick={() => { alert("The maximum number of people allowed in the grief section is 4.") }}><i
                                                                    class="fal fa-plus fa-plus-icon"></i></div>
                                                            </div>)}
                                                    </div>
                                                </div>
                                                <div class="mb-3">
                                                    <label htmlFor="up-img" class="up-img">
                                                        <img src={upImg} alt="" />
                                                    </label>
                                                    <input class="form-control position-fixed opacity-0" type="file"
                                                        id="up-img" onInput={fileUpload} />

                                                    {uploadImgSrc && (
                                                        <div className="crop-img overflow-y-scroll">
                                                            <div className="crop-img-container">
                                                                <i class="fal fa-times" onClick={() => setUploadImgSrc('')}></i>
                                                                {error && (<p className='text-danger'>{error}</p>)}
                                                                <ReactCrop className="w-auto h-100"
                                                                    crop={crop}
                                                                    onChange={
                                                                        (pixelCrop, percentCrop) => setCrop(percentCrop)
                                                                    }
                                                                    circularCrop
                                                                    keepSelection
                                                                    aspect={1}
                                                                    minWidth={150}
                                                                >
                                                                    <img ref={imgRef} src={uploadImgSrc} alt="" onLoad={onImageLoad} />
                                                                </ReactCrop>
                                                                <div className="text-center ">
                                                                    <div className="th-btn fill py-2" onClick={() => {
                                                                        setCanvasPreview(
                                                                            imgRef.current,
                                                                            previewCanvasRef.current,
                                                                            convertToPixelCrop(
                                                                                crop,
                                                                                imgRef.current.width,
                                                                                imgRef.current.height
                                                                            )
                                                                        )
                                                                        const dataUrl = previewCanvasRef.current.toDataURL()
                                                                        setUploadImgSrcFinal(dataUrl)
                                                                        setUploadImgSrc('')
                                                                        // toast.success('Image uploaded successfully!')
                                                                    }}> Crop Image</div>
                                                                </div>
                                                                {crop && (
                                                                    <canvas
                                                                        ref={previewCanvasRef}
                                                                        className='mt-4'
                                                                        style={{
                                                                            display: 'none',
                                                                            width: 150,
                                                                            height: 150,
                                                                            objectFit: 'contain',
                                                                            border: '1px solid black'
                                                                        }}
                                                                    />
                                                                )}
                                                            </div>
                                                        </div>
                                                    )}

                                                </div>

                                                {/* <input class="form-control form-control-lg"  id="formFileLg" onChange={(e)=>setImage(e.target.files[0])} type="file" /> */}
                                                {/* <input class="form-control form-control-lg" id="formFileLg" type="file" /> */}
                                            </form>
                                        </div>
                                    </div>

                                    {/* <div class="col-12 d-flex justify-content-center my-sm-4 order-md-2" onClick={confirmDetails}> */}
                                    <div class="col-12 d-flex justify-content-center my-sm-4 order-md-2">
                                        <div class="th-btn fill" onClick={confirmDetails}>Proceed</div>
                                    </div>
                                    <div class="col-12 d-flex justify-content-center mt-2 mt-md-0 order-md-3 need-help" >
                                        <a href="https://wa.me/9027572020" target='_blank' className='th-btn fill yellow'>Need Help?</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* <!-- Book an Obituary Section End --> */}

                {/* <!-- Faq Section Start --> */}
                <section className="faqs">
                    <div className="container-xxl">
                        <h1 className='text-center'>Frequently Asked Questions</h1>
                        <div className="row mt-5 d-none d-md-flex">
                            <div className="col-md-3">
                                <div className="faq-btn-box">
                                    <div className="policy-sidebar">
                                        <ul className='list-unstyled p-0 m-0'>
                                            <li>
                                                <div className='sidebar-btn sidebar-btn-desk d-flex justify-content-between align-items-center active' data-faq='viewing-and-scheduling'>
                                                    <span className="posi-text">Viewing and Scheduling</span> <i class="far fa-angle-right"></i>
                                                </div>
                                            </li>
                                            <li>
                                                <div className='sidebar-btn sidebar-btn-desk d-flex justify-content-between align-items-center' data-faq='booking-and-submission'>
                                                    <span className="posi-text">Booking and Submission</span> <i class="far fa-angle-right"></i>
                                                </div>
                                            </li>
                                            <li>
                                                <div className='sidebar-btn sidebar-btn-desk d-flex justify-content-between align-items-center' data-faq='cancellations-and-edits'>
                                                    <span className="posi-text">Cancellations and Edits</span> <i class="far fa-angle-right"></i>
                                                </div>
                                            </li>
                                            <li>
                                                <div className='sidebar-btn sidebar-btn-desk d-flex justify-content-between align-items-center' data-faq='payment-and-refund-policy'>
                                                    <span className="posi-text">Payment and Refund Policy</span> <i class="far fa-angle-right"></i>
                                                </div>
                                            </li>
                                            <li>
                                                <div className='sidebar-btn sidebar-btn-desk d-flex justify-content-between align-items-center' data-faq='privacy-and-security'>
                                                    <span className="posi-text">Privacy and Security</span> <i class="far fa-angle-right"></i>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-9 d-none d-md-block">
                                <div id='viewing-and-scheduling' className='faq-tab-container mt-5 mt-md-0' >
                                    <div className='faq-box mb-3'>
                                        <div className="faq-h">
                                            <h5 className="m-0"> Where can I view the obituary I booked?
                                            </h5>
                                            <div className="faq-icon"><i className='fal fa-plus'></i></div>
                                        </div>
                                        <div className="faq-text">
                                            <p className="m-0">Your obituary post will be shared on our <a href='https://www.instagram.com/happeningin.agra/' target='_blank' className='text-decoration-underline'>Instagram community page</a>.
                                            </p>
                                        </div>
                                    </div>
                                    <div className='faq-box mb-3'>
                                        <div className="faq-h">
                                            <h5 className="m-0">When will the obituary be published?
                                            </h5>
                                            <div className="faq-icon"><i className='fal fa-plus'></i></div>
                                        </div>
                                        <div className="faq-text">
                                            <p className="m-0">You can view the obituary on the posting date you selected during booking. It will be shared between 02:00 PM to 02:30 PM on our <a href='https://www.instagram.com/happeningin.agra/' target='_blank' className='text-decoration-underline'>Instagram community page</a>.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div id='booking-and-submission' className='faq-tab-container mt-5 mt-md-0 d-none'>
                                    <div className='faq-box mb-3'>
                                        <div className="faq-h">
                                            <h5 className="m-0">How do I book an obituary post with Happening In Agra?
                                            </h5>
                                            <div className="faq-icon"><i className='fal fa-plus'></i></div>
                                        </div>
                                        <div className="faq-text">
                                            <p className="m-0">You can book an obituary post by visiting our<a href="#book-obituary" className='text-decoration-underline d-inline'>obituary registration form,</a> providing the
necessary details, and making the payment through Cashfree. Once the payment is
confirmed, your slot is booked.
                                            </p>
                                        </div>
                                    </div>
                                    <div className='faq-box mb-3'>
                                        <div className="faq-h">
                                            <h5 className="m-0">What details are required to submit an obituary?
                                            </h5>
                                            <div className="faq-icon"><i className='fal fa-plus'></i></div>
                                        </div>
                                        <div className="faq-text">
                                            <p className="m-0">You will need to provide the following information: the name of the deceased, their birth
and death dates, the service name, venue and date, as well as the names of those in
mourning. These details will be used to prepare the obituary post.

                                            </p>
                                        </div>
                                    </div>
                                    <div className='faq-box mb-3'>
                                        <div className="faq-h">
                                            <h5 className="m-0">Can I choose a specific format for my obituary post?
                                            </h5>
                                            <div className="faq-icon"><i className='fal fa-plus'></i></div>
                                        </div>
                                        <div className="faq-text">
                                            <p className="m-0">No, we maintain a standard format for all obituary posts to ensure consistency and respect across our platform. Custom templates or formats are not available.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div id='cancellations-and-edits' className='faq-tab-container mt-5 mt-md-0 d-none' >
                                    <div className='faq-box mb-3'>
                                        <div className="faq-h">
                                            <h5 className="m-0">Can I cancel my booking?
                                            </h5>
                                            <div className="faq-icon"><i className='fal fa-plus'></i></div>
                                        </div>
                                        <div className="faq-text">
                                            <p className="m-0">Yes, you can cancel your booking by emailing us at <a href="mailto:happeninginofficial@gmail.com" className="d-inline text-decoration-underline" target='_blank'>happeninginofficial@gmail.com</a>. However, please note that refunds are not applicable even if the booking is canceled.
                                            </p>
                                        </div>
                                    </div>
                                    <div className='faq-box mb-3'>
                                        <div className="faq-h">
                                            <h5 className="m-0">Can I edit the obituary after submitting it?
                                            </h5>
                                            <div className="faq-icon"><i className='fal fa-plus'></i></div>
                                        </div>
                                        <div className="faq-text">
                                            <p className="m-0">
                                                Yes, changes can be made, kindly inform us via email at <a href="mailto:happeninginofficial@gmail.com" className="d-inline text-decoration-underline" target='_blank'>happeninginofficial@gmail.com</a>
by 12:00 PM on the date of posting (2 hours before the content goes live). Unfortunately,
edits cannot be accommodated after this time.
                                            </p>
                                        </div>
                                    </div>
                                    <div className='faq-box mb-3'>
                                        <div className="faq-h">
                                            <h5 className="m-0">Can I reschedule my posting?
                                            </h5>
                                            <div className="faq-icon"><i className='fal fa-plus'></i></div>
                                        </div>
                                        <div className="faq-text">
                                            <p className="m-0">Yes, if you need to reschedule, please inform us via email at
<a href="mailto:happeninginofficial@gmail.com" className="d-inline text-decoration-underline" target='_blank'>happeninginofficial@gmail.com</a> by 12:00 PM on the date of posting. We will do our best
to offer an alternative slot, subject to availability.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div id='payment-and-refund-policy' className='faq-tab-container mt-5 mt-md-0 d-none' >
                                    <div className='faq-box mb-3'>
                                        <div className="faq-h">
                                            <h5 className="m-0">What is your refund policy?
                                            </h5>
                                            <div className="faq-icon"><i className='fal fa-plus'></i></div>
                                        </div>
                                        <div className="faq-text">
                                            <p className="m-0">We do not offer refunds once a slot is booked. Cancellations will not be eligible for a refund.
                                            </p>
                                        </div>
                                    </div>
                                    <div className='faq-box mb-3'>
                                        <div className="faq-h">
                                            <h5 className="m-0">Payments are processed securely through Cashfree. 
                                            </h5>
                                            <div className="faq-icon"><i className='fal fa-plus'></i></div>
                                        </div>
                                        <div className="faq-text">
                                            <p className="m-0">We accept most major payment
methods, including UPI, credit card, net banking, wallets, and other standard payment
methods
                                            </p>
                                        </div>
                                    </div>
                                    <div className='faq-box mb-3'>
                                        <div className="faq-h">
                                            <h5 className="m-0">Is there any additional cost apart from the listed price?
                                            </h5>
                                            <div className="faq-icon"><i className='fal fa-plus'></i></div>
                                        </div>
                                        <div className="faq-text">
                                            <p className="m-0">No, the cost of INR. 1999 includes the 18% GST required.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div id='privacy-and-security' className='faq-tab-container mt-5 mt-md-0 d-none' >
                                    <div className='faq-box mb-3'>
                                        <div className="faq-h">
                                            <h5 className="m-0">How is my personal information protected?</h5>
                                            <div className="faq-icon"><i className='fal fa-plus'></i></div>
                                        </div>
                                        <div className="faq-text">
                                            <p className="m-0">We take data security seriously and implement measures to protect your information. Your payment is processed securely through Cashfree, and no payment information is stored on our servers.
                                            </p>
                                        </div>
                                    </div>
                                    <div className='faq-box mb-3'>
                                        <div className="faq-h">
                                            <h5 className="m-0">Who has access to the obituary details I provide?
                                            </h5>
                                            <div className="faq-icon"><i className='fal fa-plus'></i></div>
                                        </div>
                                        <div className="faq-text">
                                            <p className="m-0">Only authorized team members involved in processing and posting your obituary have access to the information you provide. We do not share your data with third parties except as necessary for payment processing.</p>
                                        </div>
                                    </div>
                                    <div className='faq-box mb-3'>
                                        <div className="faq-h">
                                            <h5 className="m-0">Can I request the deletion of my data after the obituary post?</h5>
                                            <div className="faq-icon"><i className='fal fa-plus'></i></div>
                                        </div>
                                        <div className="faq-text">
                                            <p className="m-0">
                                                You can request the deletion of your personal data after the post by reaching out to us at
<a href="mailto:happeninginofficial@gmail.com" className="d-inline text-decoration-underline" target='_blank'>happeninginofficial@gmail.com</a>. We will handle your request in accordance with our
privacy policy.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="d-block d-md-none">
                            <div className="faq-btn-box">
                                <div className="policy-sidebar">
                                    <ul className='list-unstyled p-0 m-0'>
                                        <li>
                                            <div className='sidebar-btn sidebar-btn-mob d-flex justify-content-between align-items-center active' data-faq='viewing-and-scheduling'>
                                                <span className="posi-text">Viewing and Scheduling</span>
                                                <i className='far fa-angle-right'></i>
                                            </div>
                                            <div id='viewing-and-scheduling' className={`faq-tab-container`} >
                                                <div className='faq-box mb-3'>
                                                    <div className="faq-h">
                                                        <h5 className="m-0"> Where can I view the obituary I booked?
                                                        </h5>
                                                        <div className="faq-icon"><i className='fal fa-plus'></i></div>
                                                    </div>
                                                    <div className="faq-text">
                                                        <p className="m-0">Your obituary post will be shared on our <a href='https://www.instagram.com/happeningin.agra/' target='_blank' className='text-decoration-underline'>Instagram community page</a>.
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className='faq-box mb-3'>
                                                    <div className="faq-h">
                                                        <h5 className="m-0">When will the obituary be published?
                                                        </h5>
                                                        <div className="faq-icon"><i className='fal fa-plus'></i></div>
                                                    </div>
                                                    <div className="faq-text">
                                                        <p className="m-0">You can view the obituary on the posting date you selected during booking. It will be shared between 02:00 PM to 02:30 PM on our <a href='https://www.instagram.com/happeningin.agra/' target='_blank' className='text-decoration-underline'>Instagram community page</a>.
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <div className='sidebar-btn sidebar-btn-mob d-flex justify-content-between align-items-center' data-faq='booking-and-submission'>
                                                <span className="posi-text" >Booking and Submission</span>
                                                <i className='far fa-angle-right'></i>
                                            </div>
                                            <div id='booking-and-submission' className={`faq-tab-container`}>
                                                <div className='faq-box mb-3'>
                                                    <div className="faq-h">
                                                        <h5 className="m-0">How do I book an obituary post with Happening In Agra?
                                                        </h5>
                                                        <div className="faq-icon"><i className='fal fa-plus'></i></div>
                                                    </div>
                                                    <div className="faq-text">
                                                        <p className="m-0">You can book an obituary post by visiting our <a href="#book-obituary" className='text-decoration-underline'>obituary registration form,</a> providing the
necessary details, and making the payment through Cashfree. Once the payment is
confirmed, your slot is booked.
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className='faq-box mb-3'>
                                                    <div className="faq-h">
                                                        <h5 className="m-0">What details are required to submit an obituary?
                                                        </h5>
                                                        <div className="faq-icon"><i className='fal fa-plus'></i></div>
                                                    </div>
                                                    <div className="faq-text">
                                                        <p className="m-0">You will need to provide the following information: the name of the deceased, their birth
and death dates, the service name, venue and date, as well as the names of those in
mourning. These details will be used to prepare the obituary post.

                                                        </p>
                                                    </div>
                                                </div>
                                                <div className='faq-box mb-3'>
                                                    <div className="faq-h">
                                                        <h5 className="m-0">Can I choose a specific format for my obituary post?
                                                        </h5>
                                                        <div className="faq-icon"><i className='fal fa-plus'></i></div>
                                                    </div>
                                                    <div className="faq-text">
                                                        <p className="m-0">No, we maintain a standard format for all obituary posts to ensure consistency and respect across our platform. Custom templates or formats are not available.
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <div className='sidebar-btn sidebar-btn-mob d-flex justify-content-between align-items-center' data-faq='cancellations-and-edits'>
                                                <span className="posi-text" >Cancellations and Edits</span>  <i className='far fa-angle-right'></i>
                                            </div>
                                            <div id='cancellations-and-edits' className={`faq-tab-container`} >
                                                <div className='faq-box mb-3'>
                                                    <div className="faq-h">
                                                        <h5 className="m-0">Can I cancel my booking?
                                                        </h5>
                                                        <div className="faq-icon"><i className='fal fa-plus'></i></div>
                                                    </div>
                                                    <div className="faq-text">
                                                        <p className="m-0">Yes, you can cancel your booking by emailing us at <a href="mailto:happeninginofficial@gmail.com" className="d-inline text-decoration-underline" target='_blank'>happeninginofficial@gmail.com</a>. However, please note that refunds are not applicable even if the booking is canceled.
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className='faq-box mb-3'>
                                                    <div className="faq-h">
                                                        <h5 className="m-0">Can I edit the obituary after submitting it?
                                                        </h5>
                                                        <div className="faq-icon"><i className='fal fa-plus'></i></div>
                                                    </div>
                                                    <div className="faq-text">
                                                        <p className="m-0">
                                                            Yes, changes can be made, kindly inform us via email at <a href="mailto:happeninginofficial@gmail.com" className="d-inline text-decoration-underline" target='_blank'>happeninginofficial@gmail.com</a>
by 12:00 PM on the date of posting (2 hours before the content goes live). Unfortunately,
edits cannot be accommodated after this time.
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className='faq-box mb-3'>
                                                    <div className="faq-h">
                                                        <h5 className="m-0">Can I reschedule my posting?
                                                        </h5>
                                                        <div className="faq-icon"><i className='fal fa-plus'></i></div>
                                                    </div>
                                                    <div className="faq-text">
                                                        <p className="m-0">Yes, if you need to reschedule, please inform us via email at
<a href="mailto:happeninginofficial@gmail.com" className="d-inline text-decoration-underline" target='_blank'>happeninginofficial@gmail.com</a> by 12:00 PM on the date of posting. We will do our best
to offer an alternative slot, subject to availability.
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <div className='sidebar-btn sidebar-btn-mob d-flex justify-content-between align-items-center' data-faq='payment-and-refund-policy'>
                                                <span className="posi-text">Payment and Refund Policy</span>  <i className='far fa-angle-right'></i>
                                            </div>
                                            <div id='payment-and-refund-policy' className={`faq-tab-container`} >
                                                <div className='faq-box mb-3'>
                                                    <div className="faq-h">
                                                        <h5 className="m-0">What is your refund policy?
                                                        </h5>
                                                        <div className="faq-icon"><i className='fal fa-plus'></i></div>
                                                    </div>
                                                    <div className="faq-text">
                                                        <p className="m-0">We do not offer refunds once a slot is booked. Cancellations will not be eligible for a refund.
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className='faq-box mb-3'>
                                                    <div className="faq-h">
                                                        <h5 className="m-0">Payments are processed securely through Cashfree. 
                                                        </h5>
                                                        <div className="faq-icon"><i className='fal fa-plus'></i></div>
                                                    </div>
                                                    <div className="faq-text">
                                                        <p className="m-0">We accept most major payment
methods, including UPI, credit card, net banking, wallets, and other standard payment
methods
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className='faq-box mb-3'>
                                                    <div className="faq-h">
                                                        <h5 className="m-0">Is there any additional cost apart from the listed price?
                                                        </h5>
                                                        <div className="faq-icon"><i className='fal fa-plus'></i></div>
                                                    </div>
                                                    <div className="faq-text">
                                                        <p className="m-0">No, the cost of INR. 1999 includes the 18% GST required.
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <div className='sidebar-btn sidebar-btn-mob d-flex justify-content-between align-items-center' data-faq='privacy-and-security'>
                                                <span className="posi-text" >Privacy and Security</span> <i className='far fa-angle-right'></i>
                                            </div>
                                            <div id='privacy-and-security' className={`faq-tab-container`} >
                                                <div className='faq-box mb-3'>
                                                    <div className="faq-h">
                                                        <h5 className="m-0">How is my personal information protected?</h5>
                                                        <div className="faq-icon"><i className='fal fa-plus'></i></div>
                                                    </div>
                                                    <div className="faq-text">
                                                        <p className="m-0">We take data security seriously and implement measures to protect your information. Your payment is processed securely through Cashfree, and no payment information is stored on our servers.
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className='faq-box mb-3'>
                                                    <div className="faq-h">
                                                        <h5 className="m-0">Who has access to the obituary details I provide?
                                                        </h5>
                                                        <div className="faq-icon"><i className='fal fa-plus'></i></div>
                                                    </div>
                                                    <div className="faq-text">
                                                        <p className="m-0">Only authorized team members involved in processing and posting your obituary have access to the information you provide. We do not share your data with third parties except as necessary for payment processing.</p>
                                                    </div>
                                                </div>
                                                <div className='faq-box mb-3'>
                                                    <div className="faq-h">
                                                        <h5 className="m-0">Can I request the deletion of my data after the obituary post?</h5>
                                                        <div className="faq-icon"><i className='fal fa-plus'></i></div>
                                                    </div>
                                                    <div className="faq-text">
                                                        <p className="m-0">
                                                            You can request the deletion of your personal data after the post by reaching out to us at
<a href="mailto:happeninginofficial@gmail.com" className="d-inline text-decoration-underline" target='_blank'>happeninginofficial@gmail.com</a>. We will handle your request in accordance with our
privacy policy.</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* <!-- Faq Section End --> */}

                {/* <!-- Instagarm Banner Section Start --> */}
                {/* <section className="instagarm-banner">
                    <a href='https://www.instagram.com/happeningin.agra/' target='_blank'>
                        <img src={instDesk} alt="" className="w-100 instDesk" />
                        <img src={instTab} alt="" className="w-100 instTab" />
                        <img src={instMob} alt="" className="w-100 instMob" />
                    </a>
                </section> */}
                {/* <!-- Instagarm Banner Section End --> */}

                <div className={`confirm-toggle position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center ${confirmToggle ? 'active' : ''}`}>
                    <div className="contirm-box">
                        {/* <h4>Notice<span className="text-danger">!</span></h4> */}
                        <p>Please review all the details you have entered. Close dialog & scroll up to view the
automatically generated obituary.</p>
                        <div className="confirm-btn d-flex gap-3 justify-content-between">
                            <button className="th-btn fill yellow" onClick={() => setConfirmToggle(false)}>Close</button>
                            <button className="th-btn fill" onClick={confirmProceed}>Proceed</button></div>
                    </div>
                </div>
            </main>

            {/* <!-- Footer Section Start --> */}
            <Footer />
            {/* <!-- Footer Section End --> */}

        </>
    )
}

export default Home
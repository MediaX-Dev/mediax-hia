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
                    toast.success('you have created obitury last time you visited')
                } else if (!docSnap.data().payment) {
                    navigate('/payment')
                    toast.success('you have booked slot obitury last time you visited')
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
        $('.sidebar-btn').on('click', function () {
            let data = $(this).attr('data-faq');
            $('.faq-tab-container').addClass('d-none');
            $(`#${data}`).removeClass('d-none');
            $('.sidebar-btn').removeClass('active');
            $(this).addClass('active');
        });

        // Cleanup event handlers when component unmounts
        return () => {
            $('.faq-h').off('click');
            $('.sidebar-btn').off('click');
        };
    }, []); // Empty dependency array ensures this runs only on component mount


    function fileUpload(event) {
        var file = event.target.files[0];
        if (file) {
            var reader = new FileReader();
            reader.onload = function (e) {
                const imgElement = new Image();
                imgElement.src = e.target.result
                imgElement.addEventListener('load', (e) => {
                    const { naturalWidth, naturalHeight } = e.currentTarget;
                    if (naturalWidth < 150 || naturalHeight < 150) {
                        setError('Image must be at least 150 x 150 pixels')
                        return setUploadImgSrc(" ")
                    }
                })
                // $('#boobit-up-img').attr('src', e.target.result);
                // console.log(e.target.result)
                setError('')
                setUploadImgSrc(e.target.result)

            }
            reader.readAsDataURL(file);
        }
    }

    function confirmDetails() {
        setConfirmToggle(true)
        // const auth = getAuth()
        // if (!auth.currentUser) {
        //     toast.error('You have to login first to create obituary')
        //     return false
        // }
        if(!prefix || !nameOfDeceased || !dateOfBirth || !dateOfDeath || !memoService || !serviceTimeStart || !serviceTimeEnd || !dateOfService || !serviceAddress || !griefPersonText1){
            toast.error('Please Fill all the fields')
            return false
        }
        else if(!griefPersonRelation1){
            toast.error('Please Select the relation with person in grief')
            return false
        }
        else if(!uploadImgSrc){
            toast.error('Please Upload a image of the person in grief')
            return false
        }
        const confirm = window.confirm("Please check everything before going forward");
        if (confirm) {
            document.querySelector('.boobit-img-container').style.transform = 'scale(1)';

            handleClick(); // Call the function or operation you want to perform
        } else {
            // toast.error('Please check all the details')
            return false
        }

    }
    function handleClick() {
        html2canvas(document.querySelector('#boobit-img'),
        {  scale: 2 }
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
                if(blobUrl){
                    setImgStored(true)
                }
                // Proceed with any other operations (e.g., navigating to /sign-in page)
                console.log("Image saved to localStorage");
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
                                        <p class="text-center mb-0 mb-sm-4">Share the details and upload a photo to craft a meaningful obituary. Simply complete the form below to get started.</p>
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
                                                                {dateOfBirth ? format(dateOfBirth, 'do MMMM, yyyy') : '20th April, 1883'}
                                                                {/* {dateOfBirth? dateOfBirth.toLocaleDateString('en-GB') : '20th April, 1883'} */}
                                                            </div>
                                                            <div class="">-</div>
                                                            <div class="boobit-date-of-death">
                                                                {dateOfDeath ? format(dateOfDeath, 'do MMMM, yyyy') : '19th April, 1945'}
                                                            </div>
                                                        </div>
                                                        <div class="boobit-service">{memoService ? memoService : 'Memorial Service'}</div>
                                                        <div class="boobit-details">
                                                            <div class="boobit-time">
                                                                {serviceTimeStart ? serviceTimeStart : '10:00am'}
                                                                &nbsp;-    {serviceTimeEnd ? serviceTimeEnd : '12:30pm'}
                                                            </div>
                                                            <div class="">|</div>
                                                            <div class="boobit-date">
                                                                {dateOfService ? format(dateOfService, 'do MMMM, yyyy') : '20th April, 1883'}
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
                                                        <option selected>Select prefix</option>
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
                                                        placeholder="Name of deceased" onChange={(prev) => setNameOfDeceased(prev.target.value)} />
                                                </div>
                                                <div className="mb-3">
                                                    <DatePickerWidgets
                                                        value={dateOfBirth}
                                                        onChange={setDateOfBirth}
                                                        editFormat="DD MMM, YYYY" // User can input the date in this format
                                                        parse={str => new Date(str)} // Parse the input into a Date object
                                                        placeholder="Date of birth"
                                                    />
                                                    {/* <DatePickerWidgets
                                                        // className='date form-control'
                                                        selected={dateOfBirth}
                                                        onChange={(date) => setDateOfBirth(date)}
                                                        // valueFormat={{ day: "numeric", month: "short", year: "numeric" }}
                                                        // dateFormat="dd MMM yyyy"  // This ensures the format is Day Month Year
                                                        placeholder='Date of birth' /> */}
                                                </div>
                                                <div className="mb-3">
                                                    <DatePickerWidgets
                                                        value={dateOfDeath}
                                                        onChange={setDateOfDeath}
                                                        editFormat="DD MMM, YYYY" // User can input the date in this format
                                                        parse={str => new Date(str)} // Parse the input into a Date object
                                                        placeholder="Date of death"
                                                    />
                                                    {/* <DatePickerWidgets
                                                        selected={dateOfDeath}
                                                        onChange={(date) => setDateOfDeath(date)}
                                                        // valueFormat={{ day: "numeric", month: "short", year: "numeric" }}
                                                        placeholder='Date of death' /> */}
                                                </div>
                                                <div class="mb-3">
                                                    <select class="form-select" id="service-select" value={memoService} onChange={(memo) => setMemoService(memo.target.value)}>
                                                        <option selected>Service</option>
                                                        <option value="Memorial">Memorial</option>
                                                        <option value="Death Anniversary">Death Anniversary</option>
                                                        <option value="Funeral Announcement">Funeral Announcement</option>
                                                        <option value="Condolence Message">Condolence Message</option>
                                                        <option value="Tribute">Tribute</option>
                                                    </select>
                                                </div>
                                                {/* <div class="mb-3">
                                                    <select class="form-select" id="service-time-select" value={serviceTimeStart} onChange={handleStartTimeChange}>
                                                        <option selected value="00">Time of service (start)</option>
                                                        <option value="5:30 AM">5:30 AM</option>
                                                        <option value="6:00 AM">6:00 AM</option>
                                                        <option value="6:30 AM">6:30 AM</option>
                                                        <option value="7:00 AM">7:00 AM</option>
                                                        <option value="7:30 AM">7:30 AM</option>
                                                        <option value="8:00 AM">8:00 AM</option>
                                                        <option value="8:30 AM">8:30 AM</option>
                                                        <option value="9:00 AM">9:00 AM</option>
                                                        <option value="9:30 AM">9:30 AM</option>
                                                        <option value="10:00 AM">10:00 AM</option>
                                                        <option value="10:30 AM">10:30 AM</option>
                                                        <option value="11:00 AM">11:00 AM</option>
                                                        <option value="11:30 AM">11:30 AM</option>
                                                        <option value="12:00 PM">12:00 PM</option>
                                                        <option value="12:30 PM">12:30 PM</option>
                                                        <option value="1:00 PM">1:00 PM</option>
                                                        <option value="1:30 PM">1:30 PM</option>
                                                        <option value="2:00 PM">2:00 PM</option>
                                                        <option value="2:30 PM">2:30 PM</option>
                                                        <option value="3:00 PM">3:00 PM</option>
                                                        <option value="3:30 PM">3:30 PM</option>
                                                        <option value="4:00 PM">4:00 PM</option>
                                                        <option value="4:30 PM">4:30 PM</option>
                                                        <option value="5:00 PM">5:00 PM</option>
                                                        <option value="5:30 PM">5:30 PM</option>
                                                        <option value="6:00 PM">6:00 PM</option>
                                                        <option value="6:30 PM">6:30 PM</option>
                                                        <option value="7:00 PM">7:00 PM</option>
                                                        <option value="7:30 PM">7:30 PM</option>
                                                        <option value="8:00 PM">8:00 PM</option>
                                                        <option value="8:30 PM">8:30 PM</option>
                                                        <option value="9:00 PM">9:00 PM</option>
                                                        <option value="9:30 PM">9:30 PM</option>
                                                        <option value="10:00 PM">10:00 PM</option>
                                                        <option value="10:30 PM">10:30 PM</option>
                                                        <option value="11:00 PM">11:00 PM</option>
                                                        <option value="11:30 PM">11:30 PM</option>
                                                    </select>
                                                </div>
                                                <div class="mb-3">
                                                    <select class="form-select" id="service-time-select" value={serviceTimeEnd} onChange={handleEndTimeChange}>
                                                        <option selected value="00">Time of service (End)</option>
                                                        <option value="5:30 AM">5:30 AM</option>
                                                        <option value="6:00 AM">6:00 AM</option>
                                                        <option value="6:30 AM">6:30 AM</option>
                                                        <option value="7:00 AM">7:00 AM</option>
                                                        <option value="7:30 AM">7:30 AM</option>
                                                        <option value="8:00 AM">8:00 AM</option>
                                                        <option value="8:30 AM">8:30 AM</option>
                                                        <option value="9:00 AM">9:00 AM</option>
                                                        <option value="9:30 AM">9:30 AM</option>
                                                        <option value="10:00 AM">10:00 AM</option>
                                                        <option value="10:30 AM">10:30 AM</option>
                                                        <option value="11:00 AM">11:00 AM</option>
                                                        <option value="11:30 AM">11:30 AM</option>
                                                        <option value="12:00 PM">12:00 PM</option>
                                                        <option value="12:30 PM">12:30 PM</option>
                                                        <option value="1:00 PM">1:00 PM</option>
                                                        <option value="1:30 PM">1:30 PM</option>
                                                        <option value="2:00 PM">2:00 PM</option>
                                                        <option value="2:30 PM">2:30 PM</option>
                                                        <option value="3:00 PM">3:00 PM</option>
                                                        <option value="3:30 PM">3:30 PM</option>
                                                        <option value="4:00 PM">4:00 PM</option>
                                                        <option value="4:30 PM">4:30 PM</option>
                                                        <option value="5:00 PM">5:00 PM</option>
                                                        <option value="5:30 PM">5:30 PM</option>
                                                        <option value="6:00 PM">6:00 PM</option>
                                                        <option value="6:30 PM">6:30 PM</option>
                                                        <option value="7:00 PM">7:00 PM</option>
                                                        <option value="7:30 PM">7:30 PM</option>
                                                        <option value="8:00 PM">8:00 PM</option>
                                                        <option value="8:30 PM">8:30 PM</option>
                                                        <option value="9:00 PM">9:00 PM</option>
                                                        <option value="9:30 PM">9:30 PM</option>
                                                        <option value="10:00 PM">10:00 PM</option>
                                                        <option value="10:30 PM">10:30 PM</option>
                                                        <option value="11:00 PM">11:00 PM</option>
                                                        <option value="11:30 PM">11:30 PM</option>
                                                    </select>
                                                </div> */}
                                                <div className="mb-3">
                                                    <select className="form-select" value={serviceTimeStart} onChange={(e) => setServiceTimeStart(e.target.value)}>
                                                        <option value="00">Time of service (start)</option>
                                                        {endTimeOptions.map(time => (
                                                            <option key={time} value={time}>{time}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                                <div className="mb-3">
                                                    <select className="form-select" value={serviceTimeEnd} onChange={(e) => setServiceTimeEnd(e.target.value)}>
                                                        <option value="00">Time of service (end)</option>
                                                        {endTimeOptions.map(time => (
                                                            <option key={time} value={time}>{time}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                                <div className="mb-3">
                                                    <DatePickerWidgets
                                                        value={dateOfService}
                                                        onChange={setDateOfService}
                                                        editFormat="DD MMM, YYYY" // User can input the date in this format
                                                        parse={str => new Date(str)} // Parse the input into a Date object
                                                        placeholder="Date of service"
                                                    />
                                                    {/* <DatePickerWidgets
                                                        selected={dateOfService}
                                                        min={new Date()}
                                                        onChange={(date) => setDateOfService(date)}
                                                        // valueFormat={{ day: "numeric", month: "short", year: "numeric" }}
                                                        placeholder='Date of service' /> */}
                                                </div>
                                                <div class="mb-3">
                                                    <input type="text" class="form-control" id="address" placeholder="Address of memorial service" value={serviceAddress}
                                                        maxLength="24" onChange={(addr) => setServiceAddress(addr.target.value)} />
                                                </div>
                                                <div class="">
                                                    <div class="greif">
                                                        <div class="d-flex gap-3 mb-3">
                                                            <input type="text" class="form-control greif-input" maxLength="15" value={griefPersonText1} onChange={(prev) => setGriefPersonText1(prev.target.value)} placeholder="Person in greif" />
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
                                                            <div class="form-control w-auto" onClick={() => { setGriefPerson1(true) }}><i
                                                                class="fal fa-plus fa-plus-icon"></i></div>
                                                        </div>
                                                        {griefPerson1 && (
                                                            <div class="d-flex gap-3 mb-3">
                                                                <input type="text" class="form-control greif-input" maxLength="15" value={griefPersonText2} onChange={(prev) => setGriefPersonText2(prev.target.value)} placeholder="Person in greif" />
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
                                                                <div class="form-control w-auto" onClick={() => { setGriefPerson2(true) }}><i
                                                                    class="fal fa-plus fa-plus-icon"></i></div>
                                                            </div>)}
                                                        {griefPerson2 && (
                                                            <div class="d-flex gap-3 mb-3">
                                                                <input type="text" class="form-control greif-input" maxLength="15" value={griefPersonText3} onChange={(prev) => setGriefPersonText3(prev.target.value)} placeholder="Person in greif" />
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
                                                                <div class="form-control w-auto" onClick={() => { setGriefPerson3(true) }}><i
                                                                    class="fal fa-plus fa-plus-icon"></i></div>
                                                            </div>)}
                                                        {griefPerson3 && (
                                                            <div class="d-flex gap-3 mb-3">
                                                                <input type="text" class="form-control greif-input" maxLength="15" value={griefPersonText4} onChange={(prev) => setGriefPersonText4(prev.target.value)} placeholder="Person in greif" />
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
                                                                <div class="form-control w-auto" onClick={() => { alert("You can not mention more than 4 person in grief") }}><i
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
                                                        <div className="crop-img">
                                                            <div className="crop-img-container">
                                                                <i class="fal fa-times" onClick={() => setUploadImgSrc('')}></i>
                                                                {error && (<p className='text-danger'>{error}</p>)}
                                                                <ReactCrop
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

                                    <div class="col-12 d-flex justify-content-center my-sm-4 order-md-2" onClick={confirmDetails}>
                                        <div class="th-btn fill">Proceed</div>
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
                                                <div className='sidebar-btn d-flex justify-content-between align-items-center active' data-faq='viewing-and-scheduling'>
                                                    <span className="posi-text">Viewing and Scheduling</span> <i class="far fa-angle-right"></i>
                                                </div>
                                            </li>
                                            <li>
                                                <div className='sidebar-btn d-flex justify-content-between align-items-center' data-faq='booking-and-submission'>
                                                    <span className="posi-text">Booking and Submission</span> <i class="far fa-angle-right"></i>
                                                </div>
                                            </li>
                                            <li>
                                                <div className='sidebar-btn d-flex justify-content-between align-items-center' data-faq='cancellations-and-edits'>
                                                    <span className="posi-text">Cancellations and Edits</span> <i class="far fa-angle-right"></i>
                                                </div>
                                            </li>
                                            <li>
                                                <div className='sidebar-btn d-flex justify-content-between align-items-center' data-faq='payment-and-refund-policy'>
                                                    <span className="posi-text">Payment and Refund Policy</span> <i class="far fa-angle-right"></i>
                                                </div>
                                            </li>
                                            <li>
                                                <div className='sidebar-btn d-flex justify-content-between align-items-center' data-faq='privacy-and-security'>
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
                                            <h5 className="m-0">Where can I see my obituary posting?
                                            </h5>
                                            <div className="faq-icon"><i className='fal fa-plus'></i></div>
                                        </div>
                                        <div className="faq-text">
                                            <p className="m-0">Your obituary post will be shared on our Instagram community page. (<a href='https://www.instagram.com/happeningin.agra/' target='_blank'>link</a>)
                                            </p>
                                        </div>
                                    </div>
                                    <div className='faq-box mb-3'>
                                        <div className="faq-h">
                                            <h5 className="m-0">When will my obituary be posted?
                                            </h5>
                                            <div className="faq-icon"><i className='fal fa-plus'></i></div>
                                        </div>
                                        <div className="faq-text">
                                            <p className="m-0">You can view the obituary on the posting date you selected during booking. It will be shared between 10:00 AM to 10:30 AM on our Instagram community page. (<a href='https://www.instagram.com/happeningin.agra/' target='_blank'>link</a>)
                                            </p>
                                        </div>
                                    </div>
                                    {/* <div className='faq-box mb-3'>
                                        <div className="faq-h">
                                            <h5 className="m-0">Can I request specific posting slots or dates?
                                            </h5>
                                            <div className="faq-icon"><i className='fal fa-plus'></i></div>
                                        </div>
                                        <div className="faq-text">
                                            <p className="m-0">While we try to accommodate preferred slots, we cannot guarantee availability. If your requested slot is unavailable, we will offer alternative options.
                                            </p>
                                        </div>
                                    </div> */}
                                </div>
                                <div id='booking-and-submission' className='faq-tab-container mt-5 mt-md-0 d-none'>
                                    <div className='faq-box mb-3'>
                                        <div className="faq-h">
                                            <h5 className="m-0">How do I book an obituary post with Happening In Agra?
                                            </h5>
                                            <div className="faq-icon"><i className='fal fa-plus'></i></div>
                                        </div>
                                        <div className="faq-text">
                                            <p className="m-0">You can book an obituary post by visiting our obituary registration form, providing the necessary details, and making the payment through Razorpay. Once the payment is confirmed, your slot is booked.
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
                                            <p className="m-0">You need to provide your name, email/phone number, and details about the deceased, including names of those in mourning. These details will be used to prepare the post.
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
                                            <p className="m-0">Yes, you can cancel your booking by emailing us at <a href="mailto:happeninginagra@gmail.com" className="d-inline text-decoration-underline" target='_blank'>happeninginagra@gmail.com</a>. However, please note that refunds are not applicable even if the booking is canceled.
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
                                            <p className="m-0">Yes, but you need to inform us of any changes via email at <a href="mailto:happeninginagra@gmail.com" className="d-inline text-decoration-underline" target='_blank'>happeninginagra@gmail.com</a> atleast 2 hours before the posting time. After this period, edits cannot be accommodated.
                                            </p>
                                        </div>
                                    </div>
                                    <div className='faq-box mb-3'>
                                        <div className="faq-h">
                                            <h5 className="m-0">What happens if I need to change the date of the obituary post?
                                            </h5>
                                            <div className="faq-icon"><i className='fal fa-plus'></i></div>
                                        </div>
                                        <div className="faq-text">
                                            <p className="m-0">If you need to reschedule, please inform us via email at least 16 hours before the original posting time. We will try our best to offer an alternative slot, subject to availability.
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
                                            <p className="m-0">We do not offer refunds once a slot is booked. Even if you choose to cancel your booking, refunds will not be provided.
                                            </p>
                                        </div>
                                    </div>
                                    <div className='faq-box mb-3'>
                                        <div className="faq-h">
                                            <h5 className="m-0">What payment methods do you accept?
                                            </h5>
                                            <div className="faq-icon"><i className='fal fa-plus'></i></div>
                                        </div>
                                        <div className="faq-text">
                                            <p className="m-0">Payments are processed securely through Razorpay, and we accept most major payment methods. Please note that all payments are subject to 18% GST taxation, billed by MediaX Digital Solutions.
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
                                            <p className="m-0">Yes, all payments are subject to 18% GST as required by law, which will be included in your final bill.
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
                                            <p className="m-0">We take data security seriously and implement measures to protect your information. Your payment is processed securely through Razorpay, and no payment information is stored on our servers.
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
                                            <p className="m-0">Yes, you can request the deletion of your personal data after the post by contacting us at <a href="mailto:happeninginagra@gmail.com" className="d-inline text-decoration-underline" target='_blank'>happeninginagra@gmail.com</a>. We will process your request in accordance with our privacy policy.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* <div className="col-md-9">
                                <div className={`faq-tab-container mt-5 mt-md-0 ${tabToggle === 1 ? '' : 'd-none'}`} >
                                    <div className={`faq-box mb-3 ${bookingToggle === 1 ? 'active' : ''}`}>
                                        <div className="faq-h" onClick={() => setBookingToggle(1)}>
                                            <h5 className="m-0">How do I book an obituary post with Happening In Agra?
                                            </h5>
                                            <div className="faq-icon"><i className={`fal ${bookingToggle === 1 ? 'fa-minus' : 'fa-plus'}`}></i></div>
                                        </div>
                                        <div className="faq-text">
                                            <p className="m-0">You can book an obituary post by visiting our obituary registration form, providing the necessary details, and making the payment through Razorpay. Once the payment is confirmed, your slot is booked.
                                            </p>
                                        </div>
                                    </div>
                                    <div className={`faq-box mb-3 ${bookingToggle === 2 ? 'active' : ''}`}>
                                        <div className="faq-h" onClick={() => setBookingToggle(2)}>
                                            <h5 className="m-0">What details are required to submit an obituary?
                                            </h5>
                                            <div className="faq-icon"><i className={`fal ${bookingToggle === 2 ? 'fa-minus' : 'fa-plus'}`}></i></div>
                                        </div>
                                        <div className="faq-text">
                                            <p className="m-0">You need to provide your name, email/phone number, and details about the deceased, including names of those in mourning. These details will be used to prepare the post.
                                            </p>
                                        </div>
                                    </div>
                                    <div className={`faq-box mb-3 ${bookingToggle === 3 ? 'active' : ''}`}>
                                        <div className="faq-h" onClick={() => setBookingToggle(3)}>
                                            <h5 className="m-0">Can I choose a specific format for my obituary post?
                                            </h5>
                                            <div className="faq-icon"><i className={`fal ${bookingToggle === 3 ? 'fa-minus' : 'fa-plus'}`}></i></div>
                                        </div>
                                        <div className="faq-text">
                                            <p className="m-0">No, we maintain a standard format for all obituary posts to ensure consistency and respect across our platform. Custom templates or formats are not available.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className={`faq-tab-container mt-5 mt-md-0 ${tabToggle === 2 ? '' : 'd-none'}`} >
                                    <div className={`faq-box mb-3 ${cancellationsToggle === 1 ? 'active' : ''}`}>
                                        <div className="faq-h" onClick={() => setCancellationsToggle(1)}>
                                            <h5 className="m-0">Can I cancel my booking?
                                            </h5>
                                            <div className="faq-icon"><i className={`fal ${cancellationsToggle === 1 ? 'fa-minus' : 'fa-plus'}`}></i></div>
                                        </div>
                                        <div className="faq-text">
                                            <p className="m-0">Yes, you can cancel your booking by emailing us at <a href="mailto:happeninginagra@gmail.com" className="d-inline text-decoration-underline" target='_blank'>happeninginagra@gmail.com</a>. However, please note that refunds are not applicable even if the booking is canceled.
                                            </p>
                                        </div>
                                    </div>
                                    <div className={`faq-box mb-3 ${cancellationsToggle === 2 ? 'active' : ''}`}>
                                        <div className="faq-h" onClick={() => setCancellationsToggle(2)}>
                                            <h5 className="m-0">Can I edit the obituary after submitting it?
                                            </h5>
                                            <div className="faq-icon"><i className={`fal ${cancellationsToggle === 2 ? 'fa-minus' : 'fa-plus'}`}></i></div>
                                        </div>
                                        <div className="faq-text">
                                            <p className="m-0">Yes, but you need to inform us of any changes via email at <a href="mailto:happeninginagra@gmail.com" className="d-inline text-decoration-underline" target='_blank'>happeninginagra@gmail.com</a> atleast 2 hours before the posting time. After this period, edits cannot be accommodated.
                                            </p>
                                        </div>
                                    </div>
                                    <div className={`faq-box mb-3 ${cancellationsToggle === 3 ? 'active' : ''}`}>
                                        <div className="faq-h" onClick={() => setCancellationsToggle(3)}>
                                            <h5 className="m-0">What happens if I need to change the date of the obituary post?
                                            </h5>
                                            <div className="faq-icon"><i className={`fal ${cancellationsToggle === 3 ? 'fa-minus' : 'fa-plus'}`}></i></div>
                                        </div>
                                        <div className="faq-text">
                                            <p className="m-0">If you need to reschedule, please inform us via email at least 16 hours before the original posting time. We will try our best to offer an alternative slot, subject to availability.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className={`faq-tab-container mt-5 mt-md-0 ${tabToggle === 3 ? '' : 'd-none'}`} >
                                    <div className={`faq-box mb-3 ${viewingToggle === 1 ? 'active' : ''}`}>
                                        <div className="faq-h" onClick={() => setViewingToggle(1)}>
                                            <h5 className="m-0">Where can I see my obituary posting?
                                            </h5>
                                            <div className="faq-icon"><i className={`fal ${viewingToggle === 1 ? 'fa-minus' : 'fa-plus'}`}></i></div>
                                        </div>
                                        <div className="faq-text">
                                            <p className="m-0">Your obituary post will be shared on our Instagram community page. (<a href='https://www.instagram.com/happeningin.agra/' target='_blank'>link</a>)
                                            </p>
                                        </div>
                                    </div>
                                    <div className={`faq-box mb-3 ${viewingToggle === 2 ? 'active' : ''}`}>
                                        <div className="faq-h" onClick={() => setViewingToggle(2)}>
                                            <h5 className="m-0">When will my obituary be posted?
                                            </h5>
                                            <div className="faq-icon"><i className={`fal ${viewingToggle === 2 ? 'fa-minus' : 'fa-plus'}`}></i></div>
                                        </div>
                                        <div className="faq-text">
                                            <p className="m-0">You can view the obituary on the posting date you selected during booking. It will be shared at 10:00 AM on our Instagram community page. If there are any changes to the schedule, we will notify you in advance.
                                            </p>
                                        </div>
                                    </div>
                                    <div className={`faq-box mb-3 ${viewingToggle === 3 ? 'active' : ''}`}>
                                        <div className="faq-h" onClick={() => setViewingToggle(3)}>
                                            <h5 className="m-0">Can I request specific posting slots or dates?
                                            </h5>
                                            <div className="faq-icon"><i className={`fal ${viewingToggle === 3 ? 'fa-minus' : 'fa-plus'}`}></i></div>
                                        </div>
                                        <div className="faq-text">
                                            <p className="m-0">While we try to accommodate preferred slots, we cannot guarantee availability. If your requested slot is unavailable, we will offer alternative options.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className={`faq-tab-container mt-5 mt-md-0 ${tabToggle === 4 ? '' : 'd-none'}`} >
                                    <div className={`faq-box mb-3 ${paymentToggle === 1 ? 'active' : ''}`}>
                                        <div className="faq-h" onClick={() => setPaymentToggle(1)}>
                                            <h5 className="m-0">What is your refund policy?
                                            </h5>
                                            <div className="faq-icon"><i className={`fal ${paymentToggle === 1 ? 'fa-minus' : 'fa-plus'}`}></i></div>
                                        </div>
                                        <div className="faq-text">
                                            <p className="m-0">We do not offer refunds once a slot is booked. Even if you choose to cancel your booking, refunds will not be provided.
                                            </p>
                                        </div>
                                    </div>
                                    <div className={`faq-box mb-3 ${paymentToggle === 2 ? 'active' : ''}`}>
                                        <div className="faq-h" onClick={() => setPaymentToggle(2)}>
                                            <h5 className="m-0">What payment methods do you accept?
                                            </h5>
                                            <div className="faq-icon"><i className={`fal ${paymentToggle === 2 ? 'fa-minus' : 'fa-plus'}`}></i></div>
                                        </div>
                                        <div className="faq-text">
                                            <p className="m-0">Payments are processed securely through Razorpay, and we accept most major payment methods. Please note that all payments are subject to 18% GST taxation, billed by MediaX Digital Solutions.
                                            </p>
                                        </div>
                                    </div>
                                    <div className={`faq-box mb-3 ${paymentToggle === 3 ? 'active' : ''}`}>
                                        <div className="faq-h" onClick={() => setPaymentToggle(3)}>
                                            <h5 className="m-0">Is there any additional cost apart from the listed price?
                                            </h5>
                                            <div className="faq-icon"><i className={`fal ${paymentToggle === 3 ? 'fa-minus' : 'fa-plus'}`}></i></div>
                                        </div>
                                        <div className="faq-text">
                                            <p className="m-0">Yes, all payments are subject to 18% GST as required by law, which will be included in your final bill.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className={`faq-tab-container mt-5 mt-md-0 ${tabToggle === 5 ? '' : 'd-none'}`} >
                                    <div className={`faq-box mb-3 ${privacyToggle === 1 ? 'active' : ''}`}>
                                        <div className="faq-h" onClick={() => setPrivacyToggle(1)}>
                                            <h5 className="m-0">How is my personal information protected?</h5>
                                            <div className="faq-icon"><i className='fal fa-plus'></i></div>
                                        </div>
                                        <div className="faq-text">
                                            <p className="m-0">We take data security seriously and implement measures to protect your information. Your payment is processed securely through Razorpay, and no payment information is stored on our servers.
                                            </p>
                                        </div>
                                    </div>
                                    <div className={`faq-box mb-3 ${privacyToggle === 2 ? 'active' : ''}`}>
                                        <div className="faq-h" onClick={() => setPrivacyToggle(2)}>
                                            <h5 className="m-0">Who has access to the obituary details I provide?
                                            </h5>
                                            <div className="faq-icon"><i className={`fal ${privacyToggle === 2 ? 'fa-minus' : 'fa-plus'}`}></i></div>
                                        </div>
                                        <div className="faq-text">
                                            <p className="m-0">Only authorized team members involved in processing and posting your obituary have access to the information you provide. We do not share your data with third parties except as necessary for payment processing.</p>
                                        </div>
                                    </div>
                                    <div className={`faq-box mb-3 ${privacyToggle === 3 ? 'active' : ''}`}>
                                        <div className="faq-h" onClick={() => setPrivacyToggle(3)}>
                                            <h5 className="m-0">Can I request the deletion of my data after the obituary post?</h5>
                                            <div className="faq-icon"><i className={`fal ${privacyToggle === 3 ? 'fa-minus' : 'fa-plus'}`}></i></div>
                                        </div>
                                        <div className="faq-text">
                                            <p className="m-0">Yes, you can request the deletion of your personal data after the post by contacting us at <a href="mailto:happeninginagra@gmail.com" className="d-inline text-decoration-underline" target='_blank'>happeninginagra@gmail.com</a>. We will process your request in accordance with our privacy policy.</p>
                                        </div>
                                    </div>
                                </div>
                            </div> */}
                        </div>
                        <div className="d-block d-md-none">
                            <div className="faq-btn-box">
                                <div className="policy-sidebar">
                                    <ul className='list-unstyled p-0 m-0'>
                                        <li>
                                            <div className='sidebar-btn d-flex justify-content-between align-items-center active' data-faq='viewing-and-scheduling'>
                                                <span className="posi-text" onClick={() => setPolicy1(prev => !prev)}>Viewing and Scheduling</span> <i class="far fa-angle-right"></i>
                                            </div>
                                            <div className="d-block d-md-none">
                                                <div id='viewing-and-scheduling' className={`faq-tab-container ${policy1 ? '' : 'd-none'}`} >
                                                    <div className='faq-box mb-3'>
                                                        <div className="faq-h">
                                                            <h5 className="m-0">Where can I see my obituary posting?
                                                            </h5>
                                                            <div className="faq-icon"><i className='fal fa-plus'></i></div>
                                                        </div>
                                                        <div className="faq-text">
                                                            <p className="m-0">Your obituary post will be shared on our Instagram community page. (<a href='https://www.instagram.com/happeningin.agra/' target='_blank'>link</a>)
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className='faq-box mb-3'>
                                                        <div className="faq-h">
                                                            <h5 className="m-0">When will my obituary be posted?
                                                            </h5>
                                                            <div className="faq-icon"><i className='fal fa-plus'></i></div>
                                                        </div>
                                                        <div className="faq-text">
                                                            <p className="m-0">You can view the obituary on the posting date you selected during booking. It will be shared between 10:00 AM to 10:30 AM on our Instagram community page. (<a href='https://www.instagram.com/happeningin.agra/' target='_blank'>link</a>)
                                                            </p>
                                                        </div>
                                                    </div>
                                                    {/* <div className='faq-box mb-3'>
                                        <div className="faq-h">
                                            <h5 className="m-0">Can I request specific posting slots or dates?
                                            </h5>
                                            <div className="faq-icon"><i className='fal fa-plus'></i></div>
                                        </div>
                                        <div className="faq-text">
                                            <p className="m-0">While we try to accommodate preferred slots, we cannot guarantee availability. If your requested slot is unavailable, we will offer alternative options.
                                            </p>
                                        </div>
                                    </div> */}
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <div className='sidebar-btn d-flex justify-content-between align-items-center' data-faq='booking-and-submission'>
                                                <span className="posi-text" onClick={() => setPolicy2(prev => !prev)}>Booking and Submission</span> <i class="far fa-angle-right"></i>
                                            </div>
                                            <div className="d-block d-md-none">
                                                <div id='booking-and-submission' className={`faq-tab-container ${policy2 ? '' : 'd-none'}`}>
                                                    <div className='faq-box mb-3'>
                                                        <div className="faq-h">
                                                            <h5 className="m-0">How do I book an obituary post with Happening In Agra?
                                                            </h5>
                                                            <div className="faq-icon"><i className='fal fa-plus'></i></div>
                                                        </div>
                                                        <div className="faq-text">
                                                            <p className="m-0">You can book an obituary post by visiting our obituary registration form, providing the necessary details, and making the payment through Razorpay. Once the payment is confirmed, your slot is booked.
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
                                                            <p className="m-0">You need to provide your name, email/phone number, and details about the deceased, including names of those in mourning. These details will be used to prepare the post.
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
                                            </div>
                                        </li>
                                        <li>
                                            <div className='sidebar-btn d-flex justify-content-between align-items-center' data-faq='cancellations-and-edits'>
                                                <span className="posi-text" onClick={() => setPolicy3(prev => !prev)}>Cancellations and Edits</span> <i class="far fa-angle-right"></i>
                                            </div>
                                            <div className="d-block d-md-none">
                                                <div id='cancellations-and-edits' className={`faq-tab-container ${policy3 ? '' : 'd-none'}`} >
                                                    <div className='faq-box mb-3'>
                                                        <div className="faq-h">
                                                            <h5 className="m-0">Can I cancel my booking?
                                                            </h5>
                                                            <div className="faq-icon"><i className='fal fa-plus'></i></div>
                                                        </div>
                                                        <div className="faq-text">
                                                            <p className="m-0">Yes, you can cancel your booking by emailing us at <a href="mailto:happeninginagra@gmail.com" className="d-inline text-decoration-underline" target='_blank'>happeninginagra@gmail.com</a>. However, please note that refunds are not applicable even if the booking is canceled.
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
                                                            <p className="m-0">Yes, but you need to inform us of any changes via email at <a href="mailto:happeninginagra@gmail.com" className="d-inline text-decoration-underline" target='_blank'>happeninginagra@gmail.com</a> atleast 2 hours before the posting time. After this period, edits cannot be accommodated.
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className='faq-box mb-3'>
                                                        <div className="faq-h">
                                                            <h5 className="m-0">What happens if I need to change the date of the obituary post?
                                                            </h5>
                                                            <div className="faq-icon"><i className='fal fa-plus'></i></div>
                                                        </div>
                                                        <div className="faq-text">
                                                            <p className="m-0">If you need to reschedule, please inform us via email at least 16 hours before the original posting time. We will try our best to offer an alternative slot, subject to availability.
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <div className='sidebar-btn d-flex justify-content-between align-items-center' data-faq='payment-and-refund-policy'>
                                                <span className="posi-text" onClick={() => setPolicy4(prev => !prev)}>Payment and Refund Policy</span> <i class="far fa-angle-right"></i>
                                            </div>
                                            <div className="d-block d-md-none">
                                                <div id='payment-and-refund-policy' className={`faq-tab-container ${policy4 ? '' : 'd-none'}`} >
                                                    <div className='faq-box mb-3'>
                                                        <div className="faq-h">
                                                            <h5 className="m-0">What is your refund policy?
                                                            </h5>
                                                            <div className="faq-icon"><i className='fal fa-plus'></i></div>
                                                        </div>
                                                        <div className="faq-text">
                                                            <p className="m-0">We do not offer refunds once a slot is booked. Even if you choose to cancel your booking, refunds will not be provided.
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className='faq-box mb-3'>
                                                        <div className="faq-h">
                                                            <h5 className="m-0">What payment methods do you accept?
                                                            </h5>
                                                            <div className="faq-icon"><i className='fal fa-plus'></i></div>
                                                        </div>
                                                        <div className="faq-text">
                                                            <p className="m-0">Payments are processed securely through Razorpay, and we accept most major payment methods. Please note that all payments are subject to 18% GST taxation, billed by MediaX Digital Solutions.
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
                                                            <p className="m-0">Yes, all payments are subject to 18% GST as required by law, which will be included in your final bill.
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <div className='sidebar-btn d-flex justify-content-between align-items-center' data-faq='privacy-and-security'>
                                                <span className="posi-text" onClick={() => setPolicy5(prev => !prev)}>Privacy and Security</span> <i class="far fa-angle-right"></i>
                                            </div>
                                            <div className="d-block d-md-none">
                                                <div id='privacy-and-security' className={`faq-tab-container ${policy5 ? '' : 'd-none'}`} >
                                                    <div className='faq-box mb-3'>
                                                        <div className="faq-h">
                                                            <h5 className="m-0">How is my personal information protected?</h5>
                                                            <div className="faq-icon"><i className='fal fa-plus'></i></div>
                                                        </div>
                                                        <div className="faq-text">
                                                            <p className="m-0">We take data security seriously and implement measures to protect your information. Your payment is processed securely through Razorpay, and no payment information is stored on our servers.
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
                                                            <p className="m-0">Yes, you can request the deletion of your personal data after the post by contacting us at <a href="mailto:happeninginagra@gmail.com" className="d-inline text-decoration-underline" target='_blank'>happeninginagra@gmail.com</a>. We will process your request in accordance with our privacy policy.</p>
                                                        </div>
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

                {/* <div className={`confirm-toggle position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center ${confirmToggle ? 'active' : ''}`}>
                    <div className="contirm-box">
                        <h4>Notice<span className="text-danger">!</span></h4>
                        <p>Please check every details you filled in and then go forward</p>
                        <div className="confirm-btn d-flex gap-3 justify-content-between">
                            <button className="th-btn backward">Check Again</button>
                            <button className="th-btn forward">Go Forward</button></div>
                    </div>
                </div> */}
            </main>

            {/* <!-- Footer Section Start --> */}
            <Footer />
            {/* <!-- Footer Section End --> */}

        </>
    )
}

export default Home
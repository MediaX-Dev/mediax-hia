import hiaLogo from '../assets/logo.png'
import adminImg from '../assets/admin.png'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react'
import { getAuth } from 'firebase/auth';
import { collection, getDocs, query, where, orderBy, limit, startAfter } from 'firebase/firestore';
import { db } from '../firebase.config'
import { useAuthAdmin } from "../hooks/useAuthAdmin";
import { toast } from 'react-toastify';
import axios from 'axios';
function Dashboard() {
    const navigate = useNavigate()
    const { chechAdmin } = useAuthAdmin()
    if (!chechAdmin) {
        /* toast.error('You are not Admin') */
        navigate('/')
    }
    const [allListingData, setAllListingData] = useState()
    const [navToggle, setNavToggle] = useState(false)
    const [monthSort, setMonthSort] = useState()
    const [fromDate, setFromDate] = useState()
    const [toDate, setToDate] = useState()
    const [dateOfDeath, setDateOfDeath] = useState()
    const [status, setStatus] = useState()
    const auth = getAuth()
    const [sortField, setSortField] = useState('dateOfPosting'); // Default sort by name
    const [searchTerm, setSearchTerm] = useState(''); // Search term
    const [responseState, setResponseState] = useState({});

    useEffect(() => {
        const fetchListings = async () => {
            const collRef = collection(db, 'listings');
            const q = query(collRef, where('listingCreated', '==', true))
            const collSnap = await getDocs(q); // use getDocs to fetch a collection
            const listings = [];
            collSnap.forEach((doc) => {
                listings.push({ id: doc.id, ...doc.data() }); // Collect each document's data
            });
            console.log(listings)
            setAllListingData(listings); // Update state with the fetched data
            console.log(allListingData)
        };

        fetchListings();
    }, []); // Add empty dependency array to run effect only once

    useEffect(() => {
        const fetchListings = async () => {
            const docRef = collection(db, 'listings')
            let q = query(
                docRef,
                orderBy(sortField, 'asc')
            );
            if (dateOfDeath) {
                const startOfMonth = new Date(dateOfDeath.getFullYear(), dateOfDeath.getMonth(), 1);
                const endOfMonth = new Date(dateOfDeath.getFullYear(), dateOfDeath.getMonth() + 1, 0);

                q = query(docRef, where('dateOfPosting', '>=', startOfMonth), where('dateOfPosting', '<=', endOfMonth));
            }
            if (fromDate) {
                q = query(
                    docRef,
                    where('dateOfPosting', '>=', fromDate),
                    where('dateOfPosting', '<=', fromDate)
                  );
            }
            const querySnapshot = await getDocs(q);
            const listings = [];
            querySnapshot.forEach((doc) => {
                listings.push({ id: doc.id, ...doc.data() }); // Collect each document's data
            });
            setAllListingData(listings);
        };

        fetchListings();
    }, [sortField, dateOfDeath, fromDate]);

    // useEffect(() => {
    //     const fetchListings = async () => {
    //         const querySnapshot = await getDocs(collection(db, 'listings'));
    //         const listings = [];
    //         querySnapshot.forEach((doc) => {
    //             listings.push({ id: doc.id, ...doc.data() }); // Collect each document's data
    //         });
    //         // Apply search filter here
    //         const filteredListings = listings.filter(listing =>
    //             listing.name && listing.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    //             listing.gmail && listing.gmail.toLowerCase().includes(searchTerm.toLowerCase())
    //             //  || listing.dateOfPosting.toLowerCase().includes(searchTerm.toLowerCase())
    //         );

    //         setAllListingData(filteredListings);
    //         // setAllListingData(listings);

    //     };

    //     fetchListings();
    // }, [searchTerm]);
    const formatDate = (timestamp) => {
        const date = timestamp.toDate(); // Convert Firestore timestamp to JavaScript Date
        const formattedDate = date.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short', // This gives abbreviated month (e.g., "Aug")
            year: 'numeric',
        });
        return formattedDate.replace(/\./g, ''); // To remove dots after month abbreviation
    };

    const paymentFetch = (e) => {
        e.preventDefault();
        const paymentId = e.target.paymentId.value;

        axios.get(`http://localhost:5000/payment/${paymentId}`)
            .then((response) => {
                console.log(response.data);
                setResponseState(response.data);
            })
            .catch((error) => {
                console.log('Error occurred', error);
                toast.error('Failed to fetch payment details.');
            });
    };
    // Usage
    /*  const formattedDate = formatDate(listingData.dateOfPosting);
     console.log(formattedDate); // e.g., "21-Aug-2024" */
    const logOutHandler = () => {
        auth.signOut()
        navigate('/admin/sign-in')
    }

    return (
        <>
            <section className="admin">
                <div className="row">
                    <div className="col-xl-2 p-0">
                        <div className={`admin-sidebar ${navToggle ? 'active' : 'notactive'}`}>
                            <div className="admin-left-box">
                                <div className="close" onClick={() => setNavToggle((pre) => !pre)}><i class="fas fa-times"></i></div>
                                <div className="admin-logo"><img src={hiaLogo} alt="" /></div>
                                <div className="ad-tab-box mt-3 p-3">
                                    <div className="ad-tab-btn active"><i class="fal me-3 fa-tachometer-alt-fast"></i><span>Dashboard</span></div>
                                    <div className="ad-tab-btn" onClick={logOutHandler}><i class="fal me-3 fa-power-off"></i><span>Logout</span></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-10 p-0">
                        <div className="admin-main">
                            <header className='d-flex justify-content-between align-items-center gap-4'>
                                <div className="nav-btn" onClick={() => setNavToggle((pre) => !pre)}><i class="fas fa-bars"></i></div>
                                <div className="nav-main d-flex align-items-center gap-4 gap-lg-5">
                                    <div className="nav-search">
                                        {/* <form>
                                            <i class="fal fa-search"></i>
                                            <input
                                                type="text"
                                                placeholder='Search'
                                                className='form-control inp-search'
                                                value={searchTerm}
                                                onChange={(e) => setSearchTerm(e.target.value)}
                                            />
                                            <select onChange={(e) => setSearchField(e.target.value)} value={searchField}>
                                                <option value="name">Name</option>
                                                <option value="email">Email</option>
                                                <option value="dateOfPosting">Date of Posting</option>
                                                <option value="payment">Payment</option>
                                                <option value="postStatus">Post Status</option>
                                            </select>
                                        </form> */}
                                    </div>
                                    <div className="nav-profile d-flex align-items-center gap-3">
                                        {/* <div className="napr-img"><img src={adminImg} alt="" /></div> */}
                                        <div className="napr-name">
                                            <div className="name">{auth.currentUser.displayName}</div><div className="admin">Admin</div>
                                        </div>
                                    </div>
                                </div>
                            </header>
                            <section className="post-listing">
                                <h1>Post list</h1>
                                <div className="sorting-feature">
                                    <div className="sort-by-date d-flex flex-wrap align-items-center gap-3 ps-3">
                                        <div className="sor-heading ">Sort By Month</div>
                                        <div className="sor-icon"><i class="fal fa-calendar-alt"></i></div>
                                        <div className="sor-date">
                                            <DatePicker
                                                selected={dateOfDeath}
                                                onChange={(date) => setDateOfDeath(date)}
                                                dateFormat="MMMM, yyyy"
                                                className='date form-control'
                                                placeholderText='Select Month'
                                                showMonthYearPicker
                                            // maxDate={new Date()}
                                            />
                                            <div class="sor-icon"><i class="far fa-chevron-down"></i></div>
                                        </div>
                                    </div>
                                    <div className="sor-border"></div>
                                    <div className="sort-by-date mid d-flex align-items-center gap-3">
                                        <div className="d-flex align-items-center flex-wrap gap-3">
                                            <div className="sor-heading">Sort By Date</div>
                                            <div className="sor-date">
                                                <DatePicker
                                                    selected={fromDate}
                                                    onChange={(date) => setFromDate(date)}
                                                    dateFormat="dd MMMM, yyyy"
                                                    className='date form-control'
                                                    placeholderText='Starting Date'
                                                    // showMonthYearPicker
                                                    showYearDropdown
                                                    showMonthDropdown
                                                    scrollableMonthYearDropdown
                                                // maxDate={new Date()}
                                                />
                                                <div class="sor-icon"><i class="far fa-chevron-down"></i></div>
                                            </div>
                                        </div>
                                        {/* <div className="d-flex align-items-center flex-wrap gap-3">
                                            <div className="sor-heading">To</div>
                                            <div className="sor-date">
                                                <DatePicker
                                                    selected={toDate}
                                                    onChange={(date) => setToDate(date)}
                                                    dateFormat="dd MMMM, yyyy"
                                                    className='date form-control'
                                                    placeholderText='Ending Date'
                                                    // showMonthYearPicker
                                                    showYearDropdown
                                                    showMonthDropdown
                                                    scrollableMonthYearDropdown
                                                // maxDate={new Date()}
                                                />
                                                <div class="sor-icon"><i class="far fa-chevron-down"></i></div>
                                            </div>
                                        </div> */}

                                    </div> 
                                    <div className="sor-border"></div>
                                    <form className="sort-by-date d-flex align-items-center gap-3 pe-3">
                                        <div className="d-flex align-items-center flex-wrap gap-3">
                                            <div className="sor-heading">Sort By Category:</div>
                                            <div className="sor-date">
                                                <select class="form-select" id="status-select" onChange={(e) => setSortField(e.target.value)} value={sortField}>
                                                    <option value="dateOfPosting">Date of Posting</option>
                                                    <option value="name">Name</option>
                                                    <option value="payment">Payment</option>
                                                    <option value="postStatus">Post Status</option>
                                                </select>
                                                {/* <select class="form-select" id="status-select" value={sortField} onChange={(sta) => setSortField(sta.target.value)}>
                                                    <option selected>Status</option>
                                                    <option value="Paid">Paid</option>
                                                    <option value="Unpaid">Unpaid</option>
                                                    <option value="Posted">Posted</option>
                                                    <option value="Not-Posted">Not Posted</option>
                                                </select> */}
                                            </div>
                                        </div>

                                        {/* <div className="">
                                            <button type='submit' className='th-btn fill'>Filter</button>
                                        </div> */}
                                    </form>
                                </div>
                                <div className="user-data-box mt-5">
                                    <div className="user-data-head">
                                        <div className="row">
                                            <div className="col-1">
                                                <div className="usdahe-text">Slot no.</div>
                                            </div>
                                            <div className="col-2">
                                                <div className="usdahe-text">Name/Phone</div>
                                            </div>
                                            <div className="col-1">
                                                <div className="usdahe-text">Date to post </div>
                                            </div>
                                            <div className="col-2">
                                                <div className="usdahe-text">Status</div>
                                            </div>
                                            <div className="col-2">
                                                <div className="usdahe-text">Payment</div>
                                            </div>
                                            <div className="col-2">
                                                <div className="usdahe-text">Payment Id</div>
                                            </div>
                                            <div className="col-2">
                                                <div className="usdahe-text">Action</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="user-data-list">
                                        {Array.isArray(allListingData) && allListingData.length > 0 ? (
                                            allListingData.map((data, index) => (
                                                <div className="user-data-list-item" key={index}>
                                                    <div className="row align-items-center">
                                                        <div className="col-1">
                                                            <div className="user-slot">
                                                                {data.slotNumber}
                                                            </div>
                                                        </div>
                                                        <div className="col-2">
                                                            <div className="user-name">
                                                                {data.name? data.name: data.number}
                                                            </div>
                                                        </div>
                                                        <div className="col-1">
                                                            <div className="user-date">
                                                                {data.dateOfPosting && formatDate(data.dateOfPosting)}
                                                                {!data.dateOfPosting && (<span>Not Booked</span>)}
                                                            </div>
                                                        </div>
                                                        <div className="col-2">
                                                            <div className={`user-status ${data.postStatus ? 'posted' : 'pending'}`}>
                                                                {data.postStatus ? 'Posted' : 'Pending'}
                                                            </div>
                                                        </div>
                                                        <div className="col-2">
                                                            <div className={`user-payment ${data.payment ? 'paid' : 'un-paid'}`}>
                                                                {data.payment ? 'Paid' : 'Unpaid'}
                                                            </div>
                                                        </div>
                                                        <div className="col-2">
                                                            <div className='user-date'>
                                                                {data.paymentResponseId}
                                                            </div>
                                                        </div>
                                                        <div className="col-2">
                                                            <div className="user-action d-flex gap-1 gap-xl-3 justify-content-center">
                                                                <div className="download-action">
                                                                    <a href={data.imageUrl} download="image.jpg" target='_blank'>
                                                                        <i className="fal fa-arrow-to-bottom"></i>
                                                                    </a>
                                                                </div>
                                                                <div className="edit-action">
                                                                    <Link to={`/admin/edit/${data.userId}`}>
                                                                        <i className="fal fa-edit"></i>
                                                                    </Link>
                                                                </div>
                                                                <div className="delete-action">
                                                                    <Link to={`/admin/delete/${data.userId}`}>
                                                                        <i className="fal fa-trash-alt"></i>
                                                                    </Link>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <div>No listings available</div>
                                        )}

                                        {/* {allListingData.map((data, index) => (
                                            <div className="user-data-list-item" key={index}>
                                                <div className="row align-items-center">
                                                    <div className="col-2">
                                                        <div className="user-slot">
                                                            {data.slotNumber}
                                                        </div>
                                                    </div>
                                                    <div className="col-2">
                                                        <div className="user-name">
                                                            {data.name}
                                                        </div>
                                                    </div>
                                                    <div className="col-2">
                                                        <div className="user-date">
                                                            {formatDate(data.dateOfPosting)}
                                                        </div>
                                                    </div>
                                                    <div className="col-2">
                                                        <div className={`user-status ${data.postStatus ? 'posted' : 'pending'}`}>
                                                            {data.postStatus ? 'Posted' : 'Pending'}
                                                        </div>
                                                    </div>
                                                    <div className="col-2">
                                                        <div className={`user-payment ${data.payment ? 'paid' : 'un-paid'}`}>
                                                            {data.payment ? 'Paid' : 'Unpaid'}
                                                        </div>
                                                    </div>
                                                    <div className="col-2">
                                                        <div className="user-action d-flex gap-1 gap-xl-3 justify-content-center">
                                                            <div className="download-action">
                                                                <a href={data.imageUrl} download="image.jpg">
                                                                <i className="fal fa-arrow-to-bottom"></i>
                                                                </a>
                                                            </div>
                                                            <div className="edit-action">
                                                                <Link to={`/admin/edit/${auth.currentUser.uid}`}>
                                                                    <i className="fal fa-edit"></i>
                                                                </Link>
                                                            </div>
                                                            <div className="delete-action">
                                                                <Link to={`/admin/delete/${auth.currentUser.uid}`}>
                                                                    <i className="fal fa-trash-alt"></i>
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))} */}
                                    </div>
                                </div>
                            </section>
                            <section className='bg-white'>
                            <hr className='my-5' />
                                <div className="container-xxl bg-white">
                                    <div className="row justify-content-center">
                                        <div className="col-md-5 text-center">
                                            <form onSubmit={paymentFetch}>
                                                <h2>Check Payment Method</h2>
                                                <input type="text" name='paymentId' id='paymentId' className='form-control p-3 mb-3' />
                                                <button className="th-btn fill w-100" type='submit'> Fetch Payment</button>
                                                <div className='mt-4'>
                                                    <ul className='list-unstyled'>
                                                        <li>Amount: {responseState.amount / 100} Rs.</li>
                                                        <li>Currency: {responseState.currency}</li>
                                                        <li>Status: {responseState.status}</li>
                                                        <li>Method: {responseState.method}</li>
                                                    </ul>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                                <hr className='my-5' />
                            </section>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Dashboard

import Header from '../component/Header'
import Footer from '../component/Footer'
import heartImg from '../assets/heart.png'
import { Link } from 'react-router-dom'
function Thankyou() {
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
                            <p className="mb-0 mt-3">Your details for the obituary registration have been successfully submitted. It will be posted on the date you specified.</p>
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

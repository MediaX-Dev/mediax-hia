import React from 'react'
import Header from '../component/Header'
import Footer from '../component/Footer'

function ContactUs() {
    return (
        <>
            <Header />
            <section className='contact-us'>
                <div className="container-xxl">
                    <div className="row">
                        <div className="col-md-5 p-0">
                            <div className="con-left">
                                <h3>Get in touch </h3>
                                <p>Have a question or need assistance? Drop us a message on <a className='d-inline text-white text-decoration-underline' href="https://wa.me/9027572020" target='_blank'>WhatsApp</a> and we will get back to you.</p>
                                <ul className="list-unstyled p-0 m-0 d-flex flex-column gap-3 gap-md-4 mt-3">
                                    <li>
                                        <a href="https://maps.app.goo.gl/mzocpyAVLZDiZK8W8" target='_blank'>
                                            <span className="con-icon">
                                                <i class="fas fa-map-marker-alt"></i>
                                            </span>
                                            <span className="con-text">
                                                <p className='m-0'>
                                                    <b>Address:</b> First Floor, 4 & 5, Block No: S-17, Sanjay Place, Agra, Uttar Pradesh:- 282002
                                                </p>
                                            </span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="tel:+919027572020" target='_blank'>
                                            <span className="con-icon">
                                                <i class="fas fa-phone-alt"></i>
                                            </span>
                                            <span className="con-text">
                                                <p className='m-0'>
                                                    <b>Phone:</b>+91 90275 72020
                                                </p>
                                            </span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="mailto:happeninginofficial@gmail.com">
                                            <span className="con-icon">
                                                <i class="fas fa-paper-plane"></i>
                                            </span>
                                            <span className="con-text">
                                                <p className="m-0"> <b>Email:</b> happeninginofficial@gmail.com</p>
                                            </span>
                                        </a>
                                    </li>
                                    {/* <li>
                                        <a href="https://mediax.co.in/" target='_blank'>
                                            <span className="con-icon">
                                                <i class="fas fa-globe-americas"></i>
                                            </span>
                                            <span className="con-text">
                                                <p className="m-0"> <b>Website:</b> www.mediax.co.in</p>
                                            </span>
                                        </a>
                                    </li> */}
                                </ul>
                            </div></div>
                        <div className="col-md-7 p-0">
                            <div className="con-right">
                                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3548.6635528710085!2d78.00531017600849!3d27.19830934775782!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x397477bd7ab9d7cb%3A0x7d3a09f1400c3413!2sMediaX%20%7C%20Creative%20Growth%20Agency!5e0!3m2!1sen!2sin!4v1726215171196!5m2!1sen!2sin" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    )
}

export default ContactUs

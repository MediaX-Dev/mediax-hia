import React from 'react'
import Header from '../component/Header'
import Footer from '../component/Footer'
import { Link } from 'react-router-dom'

function PrivacyPolicy() {
  return (
    <>
      <Header />

      <main>
        <section className="policy">
          <div className="container-xxl">
            <div className="row">
              <div className="col-sm-3">
                <div className="policy-sidebar">
                  <ul className='list-unstyled p-0 m-0'>
                    <li><Link to='/privacy-policy' className='d-flex justify-content-between align-items-center active'><span className="posi-text">Privacy policy</span> <i class="far fa-angle-right"></i></Link></li>
                    <li><Link to='/refund-policy' className='d-flex justify-content-between align-items-center'><span className="posi-text">Refund & Cancellation Policy</span> <i class="far fa-angle-right"></i></Link></li>
                    <li><Link to='/terms-n-conditions' className='d-flex justify-content-between align-items-center'><span className="posi-text">Terms & conditions</span> <i class="far fa-angle-right"></i></Link></li>
                  </ul>
                </div>
              </div>
              <div className="col-sm-9 mt-4 mt-sm-0">
                <div className="policy-main">
                  <div className="mb-3 mb-md-5">
                    <h2>Privacy Policy</h2>
                    <p>Your privacy is of utmost importance to us. This privacy policy outlines how we collect, use, and safeguard your personal information.</p>
                  </div>
                  <div className="mb-3 mb-md-5">
                    <h3>Information Collection</h3>
                    <p>We collect personal information such as your name, email address, phone number, and details of the deceased, including the names of people in mourning, when you complete the obituary registration form.</p>
                  </div>
                  <div className="mb-3 mb-md-5">
                    <h3>Use of Information</h3>
                    <ul>
                      <li>
                        <p>The information collected is used exclusively to process the obituary registration and post it on Happening in Agra platforms, including but not limited to Instagram, our website, and YouTube channel.</p>
                      </li>
                      <li>
                        <p>We may use your email address or phone number to contact you regarding your submission.</p>
                      </li>
                      <li>
                        <p>We may use the collected data to run retargeting campaigns.</p>
                      </li>
                    </ul>
                  </div>
                  <div className="mb-3 mb-md-5">
                    <h3>Sharing of Information</h3>
                    <p>We do not share your personal information with third parties, except as necessary to process payments or comply with legal obligations.</p>
                  </div>

                  <div className="mb-3 mb-md-5">
                    <h3>Data Security</h3>
                    <ul>
                      <li>
                        <p>We implement appropriate technical and organizational measures to protect your personal information from unauthorized access, disclosure, alteration, or destruction.</p>
                      </li>
                      <li>
                        <p>Payment information is processed securely through Cashfree, and we do not store any payment details on our servers.</p>
                      </li>
                    </ul>
                  </div>
                  <div className="mb-3 mb-md-5">
                    <h3>Your Rights</h3>
                    <p>You have the right to access, correct, or delete your personal information. To exercise these rights, please contact us at <a href="mailto:happeninginofficial@gmail.com" className="d-inline text-decoration-underline" target='_blank'>happeninginofficial@gmail.com</a>.</p>
                  </div>
                  <div className="">
                    <h3>Contact Information</h3>
                    <p className='m-0'>For any questions regarding the privacy policy, please contact us at <a href="mailto:happeninginofficial@gmail.com" className="d-inline text-decoration-underline" target='_blank'>happeninginofficial@gmail.com</a>.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </>
  )
}

export default PrivacyPolicy

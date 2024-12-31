import React from 'react'
import { Link } from 'react-router-dom'
import Footer from '../component/Footer'
import Header from '../component/Header'

function TermsAndConditions() {
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
                  <li><Link to='/privacy-policy' className='d-flex justify-content-between align-items-center'><span className="posi-text">Privacy policy</span> <i class="far fa-angle-right"></i></Link></li>
                  <li><Link to='/refund-policy' className='d-flex justify-content-between align-items-center'><span className="posi-text">Refund & Cancellation Policy</span> <i class="far fa-angle-right"></i></Link></li>
                  <li><Link to='/terms-n-conditions' className='d-flex justify-content-between align-items-center active'><span className="posi-text">Terms & conditions</span> <i class="far fa-angle-right"></i></Link></li>
                </ul>
              </div>
            </div>
            <div className="col-sm-9 mt-4 mt-sm-0">
              <div className="policy-main">
                <div className="mb-3 mb-md-5">
                  <h2>Terms and Conditions</h2>
                  <p>By using the obituary registration service provided by Happening in Agra, you agree to the following terms and conditions:</p>
                </div>
                <div className="mb-3 mb-md-5">
                  <h3>Service Description</h3>
                  <p>Our service allows users to submit obituary details to be posted on our Instagram community page.</p>
                </div>
                <div className="mb-3 mb-md-5">
                  <h3>User Responsibilities</h3>
                  <ul>
                    <li>
                      <p>Users must provide accurate and complete information when filling out the obituary registration form.</p>
                    </li>
                    <li>
                      <p>Users are responsible for reviewing the details before final submission.</p>
                    </li>
                    <li>
                      <p>If you wish to request changes to any information provided for publication, you must email us at <a href="mailto:happeninginofficial@gmail.com" className="d-inline text-decoration-underline" target='_blank'>happeninginofficial@gmail.com</a> by 12:00 PM on the scheduled day of posting (at least 2 hours
before the content goes live). Requests received after this deadline may not be accommodated</p>
                    </li>
                  </ul>
                </div>
                <div className="mb-3 mb-md-5">
                  <h3>Content Submission</h3>
                  <ul>
                    <li>
                      <p>Submitted content must be respectful and not violate any laws or the rights of others.</p>
                    </li>
                    <li>
                      <p>We reserve the right to refuse or remove any content that we deem inappropriate.</p>
                    </li>
                  </ul>
                </div>
                <div className="mb-3 mb-md-5">
                  <h3>Payment</h3>
                  <ul>
                    <li>
                      <p>Users must make a payment through Cashfree to confirm their slot for the obituary posting.</p>
                    </li>
                    <li>
                      <p>All payments are subject to our refund policy.</p>
                    </li>
                    <li>
                      <p>All payments are subject to 18% GST taxation as required by law, and will be billed by MediaX Digital Solutions, the parent company of Happening in Agra.</p>
                    </li>
                  </ul>
                </div>
                <div className="mb-3 mb-md-5">
                  <h3>Disclaimers</h3>
                  <ul>
                    <li>
                      <p>We are not responsible for any errors or omissions in the submitted content.</p>
                    </li>
                    <li>
                      <p>We do not guarantee the availability of specific slots and will provide alternatives if necessary.
                      </p>
                    </li>
                  </ul>
                </div>
                <div className="mb-3 mb-md-5">
                  <h3>Limitation of Liability</h3>
                  <p>To the fullest extent permitted by law, Happening in Agra shall not be liable for any indirect, incidental, special, or consequential damages arising out of or in connection with the use of our services.</p>
                </div>
                <div className="mb-3 mb-md-5">
                  <h3>Changes to Terms</h3>
                  <p>We reserve the right to update these terms and conditions at any time without prior notice.</p>
                </div>
                <div className="mb-3 mb-md-5">
                  <h3>Contact Information</h3>
                  <p> For any questions regarding the terms and conditions, please contact us at <a href="mailto:happeninginofficial@gmail.com" className="d-inline text-decoration-underline" target='_blank'>happeninginofficial@gmail.com</a>.</p>
                </div>

                {/* 
                
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
                      <p>Payment information is processed securely through Razorpay, and we do not store any payment details on our servers.</p>
                    </li>
                  </ul>
                </div>
                <div className="mb-3 mb-md-5">
                  <h3>Your Rights</h3>
                  <p>You have the right to access, correct, or delete your personal information. To exercise these rights, please contact us at happeninginofficial@gmail.com.</p>
                </div>
                <div className="">
                  <h3>Contact Information</h3>
                  <p className='m-0'>For any questions regarding the privacy policy, please contact us at happeninginofficial@gmail.com.</p>
                </div> */}
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

export default TermsAndConditions

import React from 'react'
import { Link } from 'react-router-dom'
import Header from '../component/Header'
import Footer from '../component/Footer'

function RefundPolicy() {
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
                  <li><Link to='/refund-policy' className='d-flex justify-content-between align-items-center active'><span className="posi-text">Refund & Cancellation Policy</span> <i class="far fa-angle-right"></i></Link></li>
                  <li><Link to='/terms-n-conditions' className='d-flex justify-content-between align-items-center'><span className="posi-text">Terms & conditions</span> <i class="far fa-angle-right"></i></Link></li>
                </ul>
              </div>
            </div>
            <div className="col-sm-9 mt-4 mt-sm-0">
              <div className="policy-main">
                <div className="mb-3 mb-md-5">
                  <h2>Refund & Cancellation Policy</h2>
                  <p>At Happening in Agra, we aim to ensure a seamless and respectful experience for users registering obituaries on our Instagram community page. Please review our refund policy thoroughly:
                  </p>
                </div>
                <div className="mb-3 mb-md-5">
                  <h3>Refund Eligibility</h3>
                  <p>Once a slot is booked, refunds are not applicable.
                  </p>
                </div>
                <div className="">
                  <h3>Cancellation</h3>
                  <p className='m-0'>To cancel your slot, please email us at <a href="mailto:happeninginagra@gmail.com" className="d-inline text-decoration-underline" target='_blank'>happeninginagra@gmail.com</a>. Note that no refunds will be issued in this case.</p>
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

export default RefundPolicy

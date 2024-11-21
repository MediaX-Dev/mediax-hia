import Logo from '../assets/logo.png'
import HiaInsta from '../assets/hia-insta.png'
import Instagram from '../assets/instagram.png'
import Youtube from '../assets/youtube.png'
import Facebook from '../assets/facebook.png'
import Moj from '../assets/moj.png'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer>
      <div className="container-xxl">
        <div className="row">
          <div className="col-md-4">
            <div className="">
              <div className="foot-brand">
                <Link to='/'><img src={Logo} alt="" className="w-100" /></Link>
              </div>
              {/* <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit.</p> */}
              <div className="hia-insta mt-3">
                <ul className='d-flex m-0 p-0 gap-1 align-align-items-center list-unstyled'>
                  <li><a href="https://www.instagram.com/happeningin.agra/" target='_blank'><img src={Instagram} alt="" className="w-100" /></a></li>
                  <li><a href="https://www.youtube.com/@happeninginagra" target='_blank'><img src={Youtube} alt="" className="w-100" /></a></li>
                  <li><a href="https://www.facebook.com/happeningin.agra" target='_blank'><img src={Facebook} alt="" className="w-100" /></a></li>
                  <li><a href="https://www.instagram.com/happeningin.agra/" target='_blank'><img src={Moj} alt="" className="w-100" /></a></li>
                </ul>
              </div>
              <p className='mt-5'>
                Happening In Agra Is A Product By <a href="https://mediax.co.in/" className='d-inline text-white text-decoration-underline' target='_blank'>MediaX</a>
              </p>
            </div>
          </div>
          <div className="mt-4 mt-sm-5 col-md-4 col-sm-6 d-sm-flex justify-content-center">
            <div className="foot-link">
              <h4>Important Links</h4>
              <ul>
                <li><Link to='/contact-us'><i class="far fa-angle-right"></i> Contact Us</Link></li>
                <li><Link to='/privacy-policy'><i class="far fa-angle-right"></i> Privacy policy</Link></li>
                <li><Link to='/refund-policy'><i class="far fa-angle-right"></i> Refund and cancellation policy</Link></li>
                <li><Link to='/terms-n-conditions'><i class="far fa-angle-right"></i> Terms & conditions</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-4 mt-sm-5 col-md-4 col-sm-6 d-sm-flex justify-content-center">
            <div className="foot-link">
              <h4>Connect</h4>
              <ul>
                <li>
                  <a className='d-flex gap-2 align-items-center' href='tel:+91 9027572020' target='_blank'>
                    <div className="">
                      <i class="fas fa-phone-alt"></i>
                    </div>
                    <div className="">+91 9027572020</div>
                  </a>
                </li>
                <li>
                  <a className='d-flex gap-2 align-items-center' href='https://happeninginagra.com/' target='_blank'>
                    <div className="">
                      <i class="fas fa-globe"></i>
                    </div>
                    <div className="">happeninginagra.com</div>
                  </a>
                </li>
                <li><a className='d-flex gap-2 align-items-center' href='https://maps.app.goo.gl/Ps2SXdYNkQiH3pLB6' target='_blank'>
                  <div className="">
                    <i class="fas fa-map-marker-alt"></i>
                  </div>
                  <div className="">
                    First Floor, 4 & 5, Block No: S-17,
                    Sanjay Place, Agra, Uttar Pradesh:- 282002 
                  </div>
                  V.1, V.2, V.3
                </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

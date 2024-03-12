import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return <>
    <footer className='text1 main-bg-black text-center pb-3'>
      <div className="row row-cols-lg-4 row-cols-md-3 row-cols-sm-2 m-0 gy-5">
        <div>
          <h3 className='ms-0 h5 mb-3'>Exclusive</h3>
          <p className=''>Subscribe</p>
          <div className='d-flex gap-4 justify-content-center mt-2'>
            <a href='#' aria-label='facebook'><i className="text-white fa-brands fa-facebook-f"></i></a>
            <a href='#' aria-label='twitter'><i className="text-white fa-brands fa-twitter"></i></a>
            <a href='#' aria-label='linkedin'><i className="text-white fa-brands fa-linkedin"></i></a>
            <a href='#' aria-label='youtube'><i className="text-white fa-brands fa-youtube"></i></a>
          </div>
        </div>
        <div>
          <h4 className='ms-0 h6 mb-3'>Support</h4>
          <p className='fs-14'>111 Bijoy sarani, Dhaka, DH 1515, Bangladesh.</p>
          <p className='fs-14 my-2'>exclusive@gmail.com</p>
          <p className='fs-14'>+88015-88888-9999</p>
        </div>
        <div>
          <h4 className='ms-0 h6 mb-3'>Account</h4>
          <Link to={'/account/myProfile'} className='text1 fs-14 mainHover'>My Account</Link>
          <Link to={'/signUp'} className='text1 fs-14 my-2 d-block mainHover'>Login / Register</Link>
          <Link to={'/cart'} className='text1 fs-14 mainHover'>Cart</Link>
        </div>
        <div>
          <h4 className='ms-0 h6 mb-3'>Quick Links</h4>
          <Link to={'/contact'} className='fs-14 text1 mainHover'>Contact</Link>
          <p className='fs-14 my-2'>Terms Of Use</p>
          <p className='fs-14'>Privacy Policy</p>
        </div>
      </div>
      <h5 className='h6 mt-5 fs-14'>Made With <i className="fa-solid fa-heart fa-beat text-danger"></i> by <span className='LogoColor '>Abdelrahman Atef</span></h5>
      <h6 className='fs-12 mt-3 text-secondary'>Designed by Rimel. All right reserved</h6>
    </footer>
  </>
  
}

import React from 'react'
import Slider from 'react-slick'
import { Link } from 'react-router-dom'
import img1 from '../../../assets/poster1.webp'
import img2 from '../../../assets/poster2.webp'
import img3 from '../../../assets/poster3.webp'
import style from '.././home.module.css'


export default function Section1() {
  var settings = {
    fade: true,
    infinite: true,
    arrows: false,
    speed: 400,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true
  };  
  return <>
    <div className={`row mb-4 flex-md-row flex-column-reverse`}>
      <div className={`${style.section1} col-lg-2 col-md-3 pt-4 `}>
        <ul>
        <li>
            <Link to={'/products/Men\'sFashion'}>Men's Fashion <i className="fas fa-angle-right ms-auto"></i></Link>
          </li>
          <li>
            <Link to={'/products/Women\'sFashion'}>Women's Fashion <i className="fas fa-angle-right ms-auto"></i></Link>
          </li>
          <li>
            <Link to={'/products/Electronics'}>Electronics</Link>
          </li>
          <li>
            <a href='#'>Home & Lifestyle</a>
          </li>
          <li>
            <a href='#'>Baby's & Toys</a>
          </li>
          <li>
            <a href='#'>Health & Beauty</a>
          </li>
          <li>
            <a href='#'>Sports & Outdoor</a>
          </li>

        </ul>
      </div>
      <div className="col-md-9 pt-4 offset-lg-1">
        <Slider {...settings}>
          <div className='position-relative'>
            <img src={img1} className='w-100' alt='poster image1' />
          </div>
          <div className='position-relative'>
            <img src={img2} className='w-100' alt='poster image2' />
          </div>
          <div className='position-relative'>
            <img src={img3} className='w-100' alt='poster image3' />
          </div>
        </Slider>
      </div>
    </div>
  </>
}

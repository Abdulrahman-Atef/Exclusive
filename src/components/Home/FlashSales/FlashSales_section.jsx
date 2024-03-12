import React from 'react'
import DownCount from './DownCount'
import style from './flash.module.css'
import FlashSlider from './FlashSlider'
import { NavLink } from 'react-router-dom'
export default function FlashSales_section() {
  return <section className={style.flash}>
    <h4 className='homeHeaderBefore text-secondry3 fs-6 fw-semibold position-relative ps-30 text-start'>Today's</h4>
    <div className='flex-wrap pt-2 d-flex gap-sm-5 gap-3 align-items-center mb-4'>
      <h3 className='h2 ff-inter fw-semibold mainLs mb-0 mt-3 me-md-4'>Flash Sales:</h3>
      <DownCount />
    </div>
    <FlashSlider />
    <NavLink to={'/products/allProducts'} className='border-0 d-inline-block rounded-2 px-3 button2 p-2 text-white mt-5 fw-medium'>View All Products</NavLink>
  </section>
}

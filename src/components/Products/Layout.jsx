import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import style from './layout.module.css'

export default function Products() {
  return <>
    <ul className={`${style.links} d-flex gap-md-5 row-gap-3 flex-wrap text-center justify-content-center my-5`}>
      <li>
        <NavLink className='position-relative' to={'/products/allproducts'}>All Products</NavLink>
      </li>
      <li>
        <NavLink className='position-relative' to={'/products/Men\'sFashion'}>Men's Fashion</NavLink>
      </li>
      <li>
        <NavLink className='position-relative' to={'/products/Women\'sFashion'}>Women's Fashion</NavLink>
      </li>
      <li>
        <NavLink className='position-relative' to={'/products/Electronics'}>Electronics</NavLink>
      </li>
    </ul>
    <Outlet></Outlet>
  </>
}

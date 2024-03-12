import React from 'react'
import { useSelector } from 'react-redux'
import { Link, NavLink, Outlet } from 'react-router-dom'
import style from './account.module.css'
import { Helmet } from 'react-helmet';


export default function Account() {

  const {userData} = useSelector((state)=> state.userToken);

  return <>
  <Helmet>
    <title>My Account</title>
  </Helmet>
    <div className="py-5 fs-14 d-flex justify-content-between">
      <div>
        <Link to={'/'} className="text3 opacity-50 me-2"> Home</Link>/
        <span className='ms-2'> My Account </span>
      </div>
      {userData?<h4 className='fs-14'>Welcome! <span className='text-secondry3'>{userData?.name}</span></h4>:''}
    </div>
    <div className="row g-md-5">
      <div className={`${style.sideBar} col-md-4 mb-5 pb-5`}>
          <h5 className='fs-6 mb-4'>Manage My Account</h5>
          <ul>
            <li><NavLink to={'/account/myProfile'}>My Profile</NavLink></li>
            <li><NavLink to={'/account/updateMyData'}>Update My Data</NavLink></li>
            <li><NavLink to={'/account/changePassword'}>Change The Password</NavLink></li>
            <li><NavLink to={'/account/myAddresses'}>My Addresses</NavLink></li>
          </ul>
      </div>
      <div className="col-md-7 mb-5 py-4 rounded-2" style={{boxShadow:'0px 1px 13px 0px rgba(0, 0, 0, 0.05)'}}>
        <Outlet></Outlet>
      </div>
    </div>
  </>
}

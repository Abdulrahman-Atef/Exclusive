import React, { useEffect, useState } from 'react'
import style from './UserSection.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { setUserToken } from '../../../../redux/userSlice';

export default function UserSection() {
  let dispatch = useDispatch();
  let navigation = useNavigate();
  const [active, setActive] = useState(false);
  const [exitMessage, setExitMessage] = useState(false);

  function exit(){
    localStorage.removeItem('userToken');
    localStorage.removeItem('userData');
    dispatch(setUserToken(null));
    navigation('/login');
  }

  function toggle() {
    if (active) {
      document.getElementById('profileList').classList.add('d-none')
      document.getElementById('profileIcon').classList.remove('bg-danger', 'text-white')
      setActive(false);
    }
    else{
      document.getElementById('profileList').classList.remove('d-none')
      document.getElementById('profileIcon').classList.add('bg-danger', 'text-white')
      setActive(true);
    }
  }
  
  return <>
    <li onClick={toggle} className={`${style.list} profileIconss`}>
      <i id='profileIcon' className="fa-regular fa-user fs-6 cursor-pointer d-flex justify-content-center align-items-center rounded-circle" style={{width:'32px',height:'32px'}}></i>
      <ul id='profileList' className='d-none'>
        <Link to={'/account/myProfile'} className='d-flex align-items-center gap-2 py-2'><i className="fa-regular fa-user text-white"></i> <p>Manage My Account</p></Link>
        <Link to={'/allorders'} className='d-flex align-items-center gap-2 py-2 my-1'><i className="bi bi-handbag  text-white"></i><p>My Orders</p></Link>
        <li onClick={ ()=>setExitMessage(!exitMessage) }><i className="fa-solid fa-right-from-bracket py-2 text-white"></i><p className='text-white'>Logout</p></li>
      </ul>
    </li>
    {exitMessage && <div className='w-100 h-100 z-3 position-fixed top-0 start-0 d-flex justify-content-center align-items-center bg-dark bg-opacity-75'>
      <div className='py-4 bg-white rounded-2' style={{position:'relative', bottom:'30px'}}>
        <div style={{ borderBottom:'1px solid #00000070', padding:'0px 24px' }}>
          <h3 className='h5 mb-3'>Sign out</h3>
        </div>
        <p className='p-4 py-4 my-1'>Are you sure you want to sign out ?</p>
        <div className='px-4'>
        <button onClick={exit} className='button2 text1 p-1 px-4 border-0 rounded-1 me-3'>Yes</button>
        <button onClick={()=> setExitMessage(false)} className='bg-body-secondary text-secondary-emphasis p-1 px-3 border-0 rounded-1'>Cancel</button>
        </div>
      </div>
    </div>}
  </>
}

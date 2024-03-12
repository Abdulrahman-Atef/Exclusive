import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAddress } from '../../../redux/userAddressesSlice';
import style from '../account.module.css'
import Loader from '../../Loader/Loader'
export default function MyProfile() {

  let dispatch = useDispatch();
  const {userData} = useSelector((state)=> state.userToken)

  const {userAddresses, getLoading} = useSelector((state)=>state.userAddresses)


  useEffect(()=>{
    dispatch(getAddress())
  },[])

  return <div>
        {getLoading?<Loader/>:<>
          <div>
            <label className='opacity-50 fs-14 mb-2' htmlFor="name">Name*</label>
            <input  id='name' type="text" className='border-0 secondry1 px-2 rounded-1 sign_in_out_inputs' value={`${userData?.name}`} disabled/>
          </div>
          <div>
            <label className='opacity-50 fs-14 mb-2 mt-4' htmlFor="email">Email*</label>
            <input id='email' name='details' type="text" className='border-0 secondry1 px-2 rounded-1 sign_in_out_inputs' value={`${userData?.email}`} disabled/>
          </div>
          <div>
            <label className='opacity-50 fs-14 mb-2 mt-4' htmlFor="Role">Role*</label>
            <input id='Role' name='details' type="text" className='border-0 secondry1 px-2 rounded-1 sign_in_out_inputs' value={`${userData?.role}`} disabled/>
          </div>

          <div className='mt-5'>
            {userAddresses?.map((address, index)=> <div className='secondry1 mb-3 p-2 rounded-1' key={address._id}>
                <div className='d-flex justify-content-between'>
                  <h6 className='m-0 mb-2'>Address ({index + 1})</h6>
                </div>
                <div className={`${style.addressSec} row row-cols-md-2  rounded-1`}>
                  <p>Address: {address.name}</p>
                  <p>Address Details: {address.details}</p>
                  <p>City: {address.city}</p>
                  <p>Phone: {address.phone}</p>
                </div>
            </div>)}
          </div>
        </>}
  </div>
}

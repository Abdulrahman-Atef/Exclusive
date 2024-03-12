import React, { useEffect } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useDispatch, useSelector} from 'react-redux'
import { addAddress, deleteAddress, getAddress } from '../../../redux/userAddressesSlice';
import style from '../account.module.css'
import Loader from '../../Loader/Loader';
export default function MyAddresses() {

  let dispatch = useDispatch();


  function changeSubmit(values) {
    dispatch(addAddress(values))
  }

  const {userAddresses, isLoading, isError, getLoading} = useSelector((state)=>state.userAddresses)
  // console.log(userAddresses);


  useEffect(()=>{
    dispatch(getAddress())
  },[])

  let validation = Yup.object({
    name:Yup.string().min(3,'MinLength is 3').max(25,'maxLength is 25').required('Address is Required'),
    details:Yup.string().min(5,'MinLength is 5').max(25,'maxLength is 25').required('Address Details is Required'),
    phone:Yup.string().matches(/^01[0-2][0-9]{8}$/,'Phone Number is InValid').required('Phone Number is required'),
    city:Yup.string().min(4,'MinLength is 4').max(15,'maxLength is 15').required('city is Required'),
  })

  let formik = useFormik({
    initialValues:{
      name:'',
      details:'',
      phone:'',
      city:'', 
    },
    validationSchema:validation,
    onSubmit:changeSubmit
  })


  return <>
    {getLoading?<Loader/>:''}
    <form className='mb-4 mb-5 pb-5 pt-2 row row-cols-md-2 justify-content-center g-4 border-bottom' onSubmit={formik.handleSubmit}>
        <div>
          <label className='fs-14 mb-2' htmlFor="name">Address*</label>
          <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.name} id='name' name='name' type="text" className='border-0 secondry1 px-2 rounded-1 sign_in_out_inputs' />
          {formik.errors.name && formik.touched.name?<p className=" text-danger fs-14 my-1">{formik.errors.name}</p>:''}
        </div>
        <div>
          <label className='fs-14 mb-2' htmlFor="details">Address Details*</label>
          <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.details} id='details' name='details' type="text" className='border-0 secondry1 px-2 rounded-1 sign_in_out_inputs' />
          {formik.errors.details && formik.touched.details?<p className=" text-danger fs-14 my-1">{formik.errors.details}</p>:''}
        </div>
        <div>
          <label className='fs-14 mb-2' htmlFor="Phone">Phone*</label>
          <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.phone} id='Phone' name='phone' type="tel" className='border-0 secondry1 px-2 rounded-1 sign_in_out_inputs' />
          {formik.errors.phone && formik.touched.phone?<p className=" text-danger fs-14 my-1">{formik.errors.phone}</p>:''}
        </div>
        <div>
          <label className='fs-14 mb-2' htmlFor="city">City*</label>
          <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.city} id='city' name='city' type="tel" className='border-0 secondry1 px-2 rounded-1 sign_in_out_inputs' />
          {formik.errors.city && formik.touched.city?<p className=" text-danger fs-14 my-1">{formik.errors.city}</p>:''}
        </div>
        <div className='d-flex justify-content-between align-items-center'>
          {isLoading?<button className='button2 text1 p-2 w-100 px-4 border-0 rounded-1'><i className="fa fa-spinner fa-spin"></i></button>
          :
          <input type="submit" className='button2 text1 p-2 w-100 px-4 border-0 rounded-1' value='Add Address' />}
        </div>
        {isError?<div className="text-danger m-0 text-center">{isError}</div>:''}
    </form>
    <div>
      {userAddresses?.map((address, index)=> <div className='secondry1 mb-3 p-2 rounded-1' key={address._id}>
          <div className='d-flex justify-content-between'>
            <h6 className='m-0 mb-2'>Address ({index + 1})</h6>
            <i onClick={()=>dispatch(deleteAddress(address._id))} className='bi p-2 bi-trash  text-danger cursor-pointer'></i>
          </div>
          <div className={`${style.addressSec} row row-cols-md-2  rounded-1`}>
            <p>Address: {address.name}</p>
            <p>Address Details: {address.details}</p>
            <p>City: {address.city}</p>
            <p>Phone: {address.phone}</p>
          </div>
      </div>)}
    </div>
  
  </>
}

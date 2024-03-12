import React, { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { useDispatch} from 'react-redux'
import { setUserData } from '../../../redux/userSlice'
export default function UpdateMyData() {

  let dispatch = useDispatch();

  const [isLoading, setisLoading] = useState(false)
  const [isError, setisError] = useState(null)
  const [isSuccess, setSuccess] = useState(false)

  async function changeSubmit(values) {
    const headers = {
      token:localStorage.getItem('userToken')
    }
    setisLoading(true);
    try {
      let {data} = await axios.put(`https://ecommerce.routemisr.com/api/v1/users/updateMe/`, values , {headers})
      if(data.message == 'success'){
        dispatch(setUserData(data.user))
        localStorage.setItem('userData', JSON.stringify(data.user));
        setSuccess(true);
        setisError(false);
      }
    } catch (error) {
      console.log(error);
      setisError(error.response.data.errors.msg);
      setSuccess(false);
    }
    setisLoading(false);
  }

  let validation = Yup.object({
    name:Yup.string().min(3,'MinLength is 3').max(15,'maxLength is 15').required('Name is Required'),
    email:Yup.string().email('This Is InValid Email').required('Email is Required'),
    phone:Yup.string().matches(/^01[0-2][0-9]{8}$/,'Phone Number is InValid').required('Phone Number is required')
  })

  let formik = useFormik({
    initialValues:{
      name:'',
      email:'',
      phone:'',
    },
    validationSchema:validation,
    onSubmit:changeSubmit
  })


  return <>
  
  <form className='mt-4 pt-2 d-flex flex-column gap-4' onSubmit={formik.handleSubmit}>
  <div>
          <label className='fs-14 mb-2' htmlFor="name">New Name*</label>
          <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.name} id='name' name='name' type="text" className='border-0 secondry1 px-2 rounded-1 sign_in_out_inputs' />
          {formik.errors.name && formik.touched.name?<p className=" text-danger fs-14 my-1">{formik.errors.name}</p>:''}
        </div>
        <div>
          <label className='fs-14 mb-2' htmlFor="email">New Email*</label>
          <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} id='email' name='email' type="email" className='border-0 secondry1 px-2 rounded-1 sign_in_out_inputs' />
          {formik.errors.email && formik.touched.email?<p className=" text-danger fs-14 my-1">{formik.errors.email}</p>:''}
        </div>
        <div>
          <label className='fs-14 mb-2' htmlFor="Phone">New Phone*</label>
          <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.phone} id='Phone' name='phone' type="tel" className='border-0 secondry1 px-2 rounded-1 sign_in_out_inputs' />
          {formik.errors.phone && formik.touched.phone?<p className=" text-danger fs-14 my-1">{formik.errors.phone}</p>:''}
        </div>
        <div className='d-flex justify-content-between align-items-center'>
          {isLoading?<button className='button2 text1 p-2 w-100 px-4 border-0 rounded-1'><i className="fa fa-spinner fa-spin"></i></button>
          :
          <input type="submit" className='button2 text1 p-2 w-100 px-4 border-0 rounded-1' value='Change The Data' />}
        </div>
        {isError?<div className="text-danger m-0 text-center">{isError}</div>:''}
        {isSuccess?<div className="text-success m-0 text-center">Your Account Data Updated Successfully</div>:''}
    </form>
  
  </>
}

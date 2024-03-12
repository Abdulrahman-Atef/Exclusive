import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { Helmet } from 'react-helmet'
import { Link, useNavigate } from 'react-router-dom'
import * as Yup from 'yup'

export default function ForgetPassword() {
  const BaseUrl = 'https://ecommerce.routemisr.com';
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setError] = useState(null);
  const navigate = useNavigate();
  /* ----------------------------------------------------------------------- */
  async function EnterEmail (val){
    try {
      setIsLoading(true)
      const {data} = await axios.post(`${BaseUrl}/api/v1/auth/forgotPasswords`, val);
      if (data.statusMsg == "success") {
        document.getElementById('resetCode').classList.remove('d-none')
        document.getElementById('forgetPassword').classList.add('d-none')
      }
      console.log(data);
      setIsLoading(false);
      setError(null);
    } catch (error) {
      console.log(error.response.data.message);
      setError(error.response.data.message)
      setIsLoading(false)
    }
  }
  let validation = Yup.object({
    email:Yup.string().email('This Is InValid Email').required('Email is Required')
  })
  
  let formik = useFormik({
    initialValues:{
      email:'',
    },
    validationSchema:validation,
    onSubmit:EnterEmail
  })
  /* ----------------------------------------------------------------------- */
  async function resetCode (val){
    try {
      setIsLoading(true)
      const {data} = await axios.post(`${BaseUrl}/api/v1/auth/verifyResetCode`, val);
      if (data.status == "Success") {
        localStorage.setItem('AuthorizedToResetPasswordPage','Authorized');
        navigate('/ResetPassword');
        setIsLoading(false);
        setError(null);
      }
    } catch (error) {
      setError(error.response.data.message)
      setIsLoading(false);
    }
  }
  let validation2 = Yup.object({
    resetCode:Yup.string().matches(/^[0-9]+$/,'The Code is InValid').required('The Code is required')

  })
  
  let formik2 = useFormik({
    initialValues:{
      resetCode:'',
    },
    validationSchema:validation2,
    onSubmit:resetCode
  })
  /* ----------------------------------------------------------------------- */


  return <>
  <Helmet>
    <title>Forget Password</title>
  </Helmet>
    <div className="row my-5 py-5 justify-content-center">
      <div className="col-md-5 shadow px-4 py-5">
        <form onSubmit={formik.handleSubmit} id='forgetPassword'>
          <div>
            <label className='fs-14 mb-3' htmlFor="email">Please enter your email address:</label>
            <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} id='email' name='email' type="email" className='border-0 secondry1 px-2 rounded-1 sign_in_out_inputs' />
            {formik.errors.email && formik.touched.email?<p className=" text-danger fs-14 my-1">{formik.errors.email}</p>:''}
          </div>
          <div className='d-flex gap-3 align-items-center mt-4'>
            {isLoading?<button className='button2 text1 p-2 px-4 border-0 rounded-1'><i className="fa fa-spinner fa-spin"></i></button>
            :
            <input type="submit" className='button2 text1 p-2 px-4 border-0 rounded-1' value='Submit' />}
            <Link to={'/login'} className='bg-body-secondary text-secondary-emphasis p-2 px-4 border-0 rounded-1'>Cancel</Link>
          </div>
          {isError?<p className=" text-danger fs-14 mt-4 text-center">{isError}</p>:''}
        </form>
        {/* ----------------------------------------------------------------------------------------------------- */}
        <form onSubmit={formik2.handleSubmit} className='d-none' id='resetCode'>
          <div>
            <label className='fs-14 mb-3' htmlFor="resetCode">Please check your emails for a message with your code. Your code is 6 numbers long.</label>
            <input onChange={formik2.handleChange} onBlur={formik2.handleBlur} value={formik2.values.resetCode} id='resetCode' name='resetCode' type="text" className='border-0 secondry1 px-2 rounded-1 sign_in_out_inputs' />
            {formik2.errors.resetCode && formik2.touched.resetCode?<p className=" text-danger fs-14 my-1">{formik2.errors.resetCode}</p>:''}
          </div>
          <div className='d-flex gap-3 align-items-center mt-4'>
            {isLoading?<button className='button2 text1 p-2 px-4 border-0 rounded-1'><i className="fa fa-spinner fa-spin"></i></button>
            :
            <input type="submit" className='button2 text1 p-2 px-4 border-0 rounded-1' value='Continue' />}
            <Link to={'/login'} className='bg-body-secondary text-secondary-emphasis p-2 px-4 border-0 rounded-1'>Cancel</Link>
          </div>
          {isError?<p className=" text-danger fs-14 mt-4 text-center">{isError}</p>:''}
        </form>
      </div>
    </div>
  </>
}

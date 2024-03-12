import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { Helmet } from 'react-helmet'
import {toast} from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom'
import * as Yup from 'yup'


export default function ResetPassword() {

  const BaseUrl = 'https://ecommerce.routemisr.com';
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setError] = useState(null);
  const navigate = useNavigate();
  /* ----------------------------------------------------------------------- */
  async function changePassword (val){
    try {
      setIsLoading(true)
      const {data} = await axios.put(`${BaseUrl}/api/v1/auth/resetPassword`, val);
      if (data.token) {
        navigate('/login');
        localStorage.removeItem('AuthorizedToResetPasswordPage');
        toast.success('Your Password Changed Successfully',{
          className:'text-center'
        })
        setIsLoading(false);
        setError(null);
      }
    } catch (error) {
      // console.log(error);
      setError(error.response.data.message)
      setIsLoading(false);
    }
  }
  let validation2 = Yup.object({
    email:Yup.string().email('This Is InValid Email').required('Email is Required'),
    newPassword:Yup.string().min(6 ,'MinLength is 6').max(12 ,'maxLength is 12').required('Password is Required'),
  })
  
  let formik = useFormik({
    initialValues:{
      email:'',
      newPassword:'',
    },
    validationSchema:validation2,
    onSubmit:changePassword
  })

  const [hidePassword, setHidePassword] = useState(false)
  const HandlepassVisability = () => {
    hidePassword ? setHidePassword(false) : setHidePassword(true);
  }

  return <>
    <Helmet>
      <title>Reset Password</title>
    </Helmet>
    <div className="row my-5 py-5 justify-content-center">
      <div className="col-md-5 shadow px-4 py-5">
        <form onSubmit={formik.handleSubmit}>
          <div>
            <label className='fs-14 mb-3' htmlFor="email">Please enter your email address:</label>
            <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} id='email' name='email' type="email" className='border-0 secondry1 px-2 rounded-1 sign_in_out_inputs' />
            {formik.errors.email && formik.touched.email?<p className=" text-danger fs-14 my-1">{formik.errors.email}</p>:''}
          </div>
          <div>
            <label className='fs-14 my-3 mt-4' htmlFor="newPassword">Please enter your new Password:</label>
            <div className='position-relative'>
              <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.newPassword} id='newPassword' name='newPassword' type={hidePassword? 'text' : 'password'} className='border-0 secondry1 px-2 rounded-1 sign_in_out_inputs' />
              <span className='position-absolute cursor-pointer opacity-75' onClick={()=>HandlepassVisability()} style={{right: '9px', top: '7px'}}><i className={`fa-solid ${hidePassword? 'fa-eye-slash' : 'fa-eye'}`}></i></span>
            </div>
            {formik.errors.newPassword && formik.touched.newPassword?<p className=" text-danger fs-14 my-1">{formik.errors.newPassword}</p>:''}
          </div>
          <div className='d-flex gap-3 align-items-center mt-4'>
            {isLoading?<button className='button2 text1 p-2 px-4 border-0 rounded-1'><i className="fa fa-spinner fa-spin"></i></button>
            :
            <input type="submit" className='button2 text1 p-2 px-4 border-0 rounded-1' value='Confirm' />}
            <Link to={'/login'} className='bg-body-secondary text-secondary-emphasis p-2 px-4 border-0 rounded-1'>Cancel</Link>
          </div>
          {isError?<p className=" text-danger fs-14 mt-4 text-center">{isError}</p>:''}
        </form>
      </div>
    </div>
  </>
}

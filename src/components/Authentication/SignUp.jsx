import React, { useState } from 'react'
import image from '../../assets/Sign_In_Out.png'
import { Link } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { Helmet } from 'react-helmet'
export default function SignUp() {

  const [isLoading, setisLoading] = useState(false)
  const [isError, setisError] = useState(false)
  const [Success, setSuccess] = useState(false)

  async function register(values) {
    setisLoading(true);
    try {
      let data = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, values)
      if(data.data.message == 'success'){
        setisError(false);
        setSuccess(true)
      }
    } catch (error) {
      setSuccess(false)
      setisError(error.response.data.message);
    }
    setisLoading(false);
  }

  let validation = Yup.object({
    name:Yup.string().min(3,'MinLength is 3').max(15,'maxLength is 15').required('Name is Required'),
    email:Yup.string().email('This Is InValid Email').required('Email is Required'),
    password:Yup.string().min(6 ,'MinLength is 6').max(12 ,'maxLength is 12').required('Password is Required'),
    rePassword:Yup.string().oneOf([Yup.ref("password")],'Not Equal to password').required('rePassword is Required'),
    phone:Yup.string().matches(/^01[0-2][0-9]{8}$/,'Phone Number is InValid').required('Phone Number is required')
  })

  let formik = useFormik({
    initialValues:{
      name:'',
      email:'',
      password:'',
      rePassword:'',
      phone:'',
    },
    validationSchema:validation,
    onSubmit:register
  })

  const [hidePassword, setHidePassword] = useState(false);
  const [hidePassword2, setHidePassword2] = useState(false);

  return <>
  <Helmet>
    <title>Sign Up</title>
  </Helmet>
  <section className="row my-5 g-5 align-items-center">
    <div className="loginImage col-md-6">
      <img src={image} className='w-100 p-xl-5' alt='login Image' />
    </div>
    <div className="col-md-6 ps-md-5 px-4" style={{maxWidth:'500px'}}>
      <h2 className='fs-2 text3 fw-medium ff-inter'>Create an account</h2>
      <p className="text3 fs-6 fw-normal m-0 py-2">Enter your details below</p>

      <form className='mt-4 pt-2 d-flex flex-column gap-4' onSubmit={formik.handleSubmit}>
        <div>
        <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.name} name='name' type="text" className='sign_in_out_inputs' placeholder='Name' />
        {formik.errors.name && formik.touched.name?<p className=" text-danger fs-14 my-1">{formik.errors.name}</p>:''}
        </div>
        <div>
        <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} name='email' type="email" className='sign_in_out_inputs' placeholder='Email or Phone Number' />
        {formik.errors.email && formik.touched.email?<p className=" text-danger fs-14 my-1">{formik.errors.email}</p>:''}
        </div>
        <div className='position-relative'>
        <input id='passInput' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password} name='password' type={hidePassword? 'text' : 'password'} className='sign_in_out_inputs' placeholder='Password' />
        <span className='position-absolute cursor-pointer end-0 opacity-75' onClick={()=>setHidePassword(!hidePassword)}><i className={`fa-solid ${hidePassword? 'fa-eye-slash' : 'fa-eye'}`}></i></span>
        {formik.errors.password && formik.touched.password?<p className=" text-danger fs-14 my-1">{formik.errors.password}</p>:''}
        </div>
        <div className='position-relative'>
        <input id='rePassInput' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.rePassword} name='rePassword' type={hidePassword2? 'text' : 'password'} className='sign_in_out_inputs' placeholder='RePassword' />
        <span className='position-absolute cursor-pointer end-0 opacity-75' onClick={()=>setHidePassword2(!hidePassword2)}><i className={`fa-solid ${hidePassword2? 'fa-eye-slash' : 'fa-eye'}`}></i></span>
        {formik.errors.rePassword && formik.touched.rePassword?<p className=" text-danger fs-14 my-1">{formik.errors.rePassword}</p>:''}
        </div>
        <div>
        <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.phone} name='phone' type="tel" className='sign_in_out_inputs' placeholder='Phone' />
        {formik.errors.phone && formik.touched.phone?<p className=" text-danger fs-14 my-1">{formik.errors.phone}</p>:''}
        </div>
        <div className='d-flex justify-content-between align-items-center'>
          {isLoading?<button className='button2 text1 p-2 w-100 px-4 border-0 rounded-1'><i className="fa fa-spinner fa-spin"></i></button>
          :
          <input type="submit" className='button2 text1 p-2 w-100 px-4 border-0 rounded-1' value='Create Account' />}
          
        </div>
        {isError?<div className="text-danger m-0 text-center">{isError}</div>:''}
        {Success?<div className="text-success m-0 text-center">Register Done</div>:''}
        
      </form>

      <p className='fs-14 text-center mt-4'>Already have account? <Link to={'/login'} className='text-secondry3 ms-1'>Log in</Link></p>
    </div>
  </section>
</>
}

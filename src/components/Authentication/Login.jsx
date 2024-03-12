import React, { useContext, useState } from 'react'
import image from '../../assets/Sign_In_Out.png'
import { Link, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { setUserData, setUserToken } from '../../redux/userSlice'
import { useDispatch} from 'react-redux'
import { Helmet } from 'react-helmet'

export default function Login() {
  let navigate = useNavigate();
  let dispatch = useDispatch();
  const [isLoading, setisLoading] = useState(false)
  const [isError, setisError] = useState(false);

  async function loginSubmit(values) {
    setisLoading(true);
    try {
      let data = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, values)
      if(data.data.message == 'success'){
        navigate('/')
        localStorage.setItem('userToken', data.data.token);
        localStorage.setItem('userData', JSON.stringify(data.data.user));
        dispatch(setUserToken(data.data.token));
        dispatch(setUserData(data.data.user));
        setisError(false);
      }
    } catch (error) {
      setisError(error.response.data.message);
    }
    setisLoading(false);
  }

  let validation = Yup.object({
    email:Yup.string().email('This Is InValid Email').required('Email is Required'),
    password:Yup.string().min(6 ,'MinLength is 6').max(12 ,'maxLength is 12').required('Password is Required'),
  })

  let formik = useFormik({
    initialValues:{
      email:'',
      password:'',
    },
    validationSchema:validation,
    onSubmit:loginSubmit
  })

  const [hidePassword, setHidePassword] = useState(false);
  
  return <>
    <Helmet>
      <title>Login</title>
    </Helmet>
    <section className="row my-5 g-5 align-items-center">
      <div className="loginImage col-md-6">
        <img src={image} className='w-100 p-xl-5' alt='login Image' />
      </div>
      <div className="col-md-6 ps-md-5 px-4" style={{maxWidth:'500px'}}>
        <h2 className='fs-2 text3 fw-medium ff-inter'>Log in to Exclusive</h2>
        <p className="text3 fs-6 fw-normal m-0 py-2">Enter your details below</p>
        <form className='mt-4 pt-2 d-flex flex-column gap-4' onSubmit={formik.handleSubmit}>
        <div>
        <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} name='email' type="email" className='sign_in_out_inputs' placeholder='Email or Phone Number' />
        {formik.errors.email && formik.touched.email?<p className=" text-danger fs-14 my-1">{formik.errors.email}</p>:''}
        </div>
        <div className='position-relative'>
        <input id='passInput' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password} name='password' type={hidePassword? 'text' : 'password'} className='mb-2 sign_in_out_inputs' placeholder='Password' />
        <span className='position-absolute cursor-pointer end-0 opacity-75' onClick={()=>setHidePassword(!hidePassword)}><i id='showIcon' className={`fa-solid ${hidePassword? 'fa-eye-slash' : 'fa-eye'}`}></i></span>
        {formik.errors.password && formik.touched.password?<p className=" text-danger fs-14 my-1">{formik.errors.password}</p>:''}
        </div>
        <div className='d-flex justify-content-between align-items-center'>
          {isLoading?<button className='button2 text1 p-2 px-4 border-0 rounded-1'><i className="fa fa-spinner fa-spin"></i></button>
          :
          <input type="submit" className='button2 text1 p-2 px-4 border-0 rounded-1' value='Log In' />}
          <Link to={'/ForgetPassword'} className='text-secondry3 ms-1 fs-14'>Forget Password?</Link>
        </div>
        {isError?<div className="text-danger m-0 text-center">{isError}</div>:''}
      </form>
        <p className='fs-14 text-center mt-5'>Don't have an account? <Link to={'/signUp'} className='text-secondry3 ms-1'>Sign Up</Link></p>
      </div>
    </section>
  </>
}

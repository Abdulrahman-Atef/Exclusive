import React, { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { setUserToken } from '../../../redux/userSlice'
import { useDispatch } from 'react-redux'

export default function ChangePassword() {
  let dispatch = useDispatch();
  const [isLoading, setisLoading] = useState(false)
  const [isError, setisError] = useState(false)
  const [isSucces, setisSucces] = useState(false)
  
  async function changeSubmit(values) {
    const headers = {
      token:localStorage.getItem('userToken')
    }
    setisLoading(true);
    try {
      let data = await axios.put(`https://ecommerce.routemisr.com/api/v1/users/changeMyPassword`, values , {headers})
      if (data.data.message == "success") {
        dispatch(setUserToken(data.data.token));
        localStorage.setItem('userToken', data.data.token)
        console.log(data);
        setisSucces(true);
        setisError(false);
      }
    } catch (error) {
      console.log(error);
      setisError(error.response.data.errors.msg);
      setisSucces(false);
    }
    setisLoading(false);
  }

  let validation = Yup.object({
    currentPassword:Yup.string().min(6 ,'MinLength is 6').max(12 ,'maxLength is 12').required('Current Password is Required'),
    password:Yup.string().min(6 ,'MinLength is 6').max(12 ,'maxLength is 12').required('Password is Required'),
    rePassword:Yup.string().oneOf([Yup.ref("password")],'Not Equal to password').required('rePassword is Required'),
  })

  let formik = useFormik({
    initialValues:{
      currentPassword:'',
      password:'',
      rePassword:'',
    },
    validationSchema:validation,
    onSubmit:changeSubmit
  })

  const [hidePassword, setHidePassword] = useState(false);
  const [hidePassword2, setHidePassword2] = useState(false);
  const [hidePassword3, setHidePassword3] = useState(false);

  return <>
  
  <form className='mt-4 pt-2 d-flex flex-column gap-4' onSubmit={formik.handleSubmit}>
      <div className='position-relative'>
        <label className='fs-14 mb-2' htmlFor="currentPassword">CurrentPassword*</label>
        <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.currentPassword} id='currentPassword' name='currentPassword' type={hidePassword? 'text' : 'password'} className='border-0 secondry1 px-2 rounded-1 sign_in_out_inputs' />
        <span className='position-absolute cursor-pointer end-0 opacity-75 mt-2 me-2' onClick={()=>setHidePassword(!hidePassword)}><i className={`fa-solid ${hidePassword? 'fa-eye-slash' : 'fa-eye'}`}></i></span>
        {formik.errors.currentPassword && formik.touched.currentPassword?<p className=" text-danger fs-14 my-1">{formik.errors.currentPassword}</p>:''}
      </div>
      <div className='position-relative'>
        <label className='fs-14 mb-2' htmlFor="password">New Password*</label>
        <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password} id='password' name='password' type={hidePassword2? 'text' : 'password'} className='border-0 secondry1 px-2 rounded-1 sign_in_out_inputs' />
        <span className='position-absolute cursor-pointer end-0 opacity-75 mt-2 me-2' onClick={()=>setHidePassword2(!hidePassword2)}><i className={`fa-solid ${hidePassword2? 'fa-eye-slash' : 'fa-eye'}`}></i></span>
        {formik.errors.password && formik.touched.password?<p className=" text-danger fs-14 my-1">{formik.errors.password}</p>:''}
      </div>
      <div className='position-relative'>
        <label className='fs-14 mb-2' htmlFor="rePassword">rePassword*</label>
        <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.rePassword} id='rePassword' name='rePassword' type={hidePassword3? 'text' : 'password'} className='border-0 secondry1 px-2 rounded-1 sign_in_out_inputs' />
        <span className='position-absolute cursor-pointer end-0 opacity-75 mt-2 me-2' onClick={()=>setHidePassword3(!hidePassword3)}><i className={`fa-solid ${hidePassword3? 'fa-eye-slash' : 'fa-eye'}`}></i></span>
        {formik.errors.rePassword && formik.touched.rePassword?<p className=" text-danger fs-14 my-1">{formik.errors.rePassword}</p>:''}
      </div>
      <div className='d-flex justify-content-between align-items-center'>
        {isLoading?<button className='button2 text1 p-2 w-100 px-4 border-0 rounded-1'><i className="fa fa-spinner fa-spin"></i></button>
        :
        <input type="submit" className='button2 text1 p-2 w-100 px-4 border-0 rounded-1' value='Change The Password' />}
      </div>
      {isError?<div className="text-danger m-0 text-center">{isError}</div>:''}
      {isSucces?<div className="text-success m-0 text-center">The password changed Successfully</div>:''}
    </form>
  
  </>
}

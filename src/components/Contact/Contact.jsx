import { Link } from 'react-router-dom'
import React, { useRef, useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import emailjs from '@emailjs/browser';
import {toast} from 'react-toastify'
import { Helmet } from 'react-helmet'
export default function Contact() {

  const [isLoading, setisLoading] = useState(false)
  const [isError, setisError] = useState(false)
  const form = useRef();

  async function changeSubmit(values) {
    setisLoading(true);
    emailjs.send('service_2rjhn0k','template_ii7bsd5', values, '1zi1cFTlTLKpRhA3b')
	.then((response) => { 
    if (response.text == "OK") {
      toast.success('You sent The Email Successfully', {position:'bottom-right'})
      // console.log('SUCCESS!', response);
      setisLoading(false);
    }
	}, (err) => {
    toast.error('There is error', {position:'bottom-right'})
    console.log('FAILED...', err);
    setisLoading(false);
	});
  }

  let validation = Yup.object({
    name:Yup.string().min(3,'MinLength is 3').max(15,'maxLength is 15').required('Name is Required'),
    email:Yup.string().email('This Is InValid Email').required('Email is Required'),
    phone:Yup.string().matches(/^01[0-2][0-9]{8}$/,'Phone Number is InValid').required('Phone Number is required'),
    message:Yup.string().min(5,'MinLength is 5').max(100,'maxLength is 100').required('Message is Required'),
  })

  let formik = useFormik({
    initialValues:{
      name:'',
      email:'',
      phone:'',
      message:'',
    },
    validationSchema:validation,
    onSubmit:changeSubmit
  })

  return <>
  <Helmet>
    <title>Contact</title>
  </Helmet>
    <div className="py-5 fs-14">
      <Link to={'/'} className="text3 opacity-50 me-2"> Home</Link>/
      <span className='ms-2'> Contact </span>
    </div>
    <div className="row g-md-4 gy-5">
      <div className='col-xl-4 col-md-4 h-100'>
          <div className='p-4' style={{boxShadow:'0px 1px 13px 0px rgba(0, 0, 0, 0.05)'}}>
            <div className='border-bottom border-black border-opacity-25 pb-4'>
            <i className="bi bi-telephone fs-4 bg-danger text-white rounded-circle" style={{padding:'5px 11px'}}></i>
            <p className='d-inline-block ms-2 fw-medium mb-4'>Call To Us</p>
            <p className='fs-14 mb-3'>We are available 24/7, 7 days a week.</p>
            <p className='fs-14'>Phone: +8801611112222</p>
            </div>
            <div className='pt-4'>
            <i className="bi bi-envelope fs-4 bg-danger text-white rounded-circle" style={{padding:'6px 11px'}}></i>
            <p className='d-inline-block ms-2 fw-medium mb-4'>Write To US</p>
            <p className='fs-14 mb-3'>Fill out our form and we will contact you within 24 hours.</p>
            <p className='fs-14 mb-3'>Emails: customer@exclusive.com</p>
            <p className='fs-14'>Emails: support@exclusive.com</p>
            </div>
          </div>
      </div>
      <div className="col-md-8 mb-5 mb-md-0">
        <div className='p-sm-4 h-100' style={{boxShadow:'0px 1px 13px 0px rgba(0, 0, 0, 0.05)'}}>
          <form ref={form} onSubmit={formik.handleSubmit}>
            <div className="row row-cols-1 row-cols-sm-3 gy-3">
            <div>
              <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.name} id='name' name='name' type="text" placeholder='Your Name *' className='border-0 fs-14 px-3 py-2 secondry1 rounded-1 sign_in_out_inputs' />
              {formik.errors.name && formik.touched.name?<p className=" text-danger fs-14 my-1">{formik.errors.name}</p>:''}
            </div>
            <div>
              <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} id='email' name='email' type="email" placeholder='Your Email *' className='border-0 fs-14 px-3 py-2 secondry1 rounded-1 sign_in_out_inputs' />
              {formik.errors.email && formik.touched.email?<p className=" text-danger fs-14 my-1">{formik.errors.email}</p>:''}
            </div>
            <div>
              <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.phone} id='Phone' name='phone' type="tel" placeholder='Your Phone *' className='border-0 fs-14 px-3 py-2 secondry1 rounded-1 sign_in_out_inputs' />
              {formik.errors.phone && formik.touched.phone?<p className=" text-danger fs-14 my-1">{formik.errors.phone}</p>:''}
            </div>
            </div>
            <textarea onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.message} name='message' className='p-3 fs-14 border-0 secondry1 rounded-1 sign_in_out_inputs mt-3' placeholder='Your Message' rows="8"></textarea>
            {formik.errors.message && formik.touched.message?<p className=" text-danger fs-14 my-1">{formik.errors.message}</p>:''}
            <div className='d-flex justify-content-between align-items-center mt-3'>
              {isLoading?<button className='button2 text1 p-2 px-4 border-0 rounded-1'><i className="fa fa-spinner fa-spin"></i></button>
              :
              <input type="submit" className='button2 text1 p-2 px-4 border-0 rounded-1 fs-14' value='Send Massage' />}
            </div>
            {isError?<div className="text-danger m-0 text-center">{isError}</div>:''}
          </form>
        </div>
      </div>
    </div>
  </>
}

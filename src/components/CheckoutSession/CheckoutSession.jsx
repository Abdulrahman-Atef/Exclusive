import { useFormik } from 'formik';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import style from '../Cart/cart.module.css';
import img1 from '../../assets/bkash logo.png';
import img2 from '../../assets/visa logo.png';
import img3 from '../../assets/masterCard logo.png';
import img4 from '../../assets/alpha logo.png';
import { createCashOrder, createOnlineOrder } from '../../redux/uesrOrdersSlice';
import { updateCartId, updateCartList, updateNumOfCartItems } from '../../redux/cartSlice';
import * as Yup from 'yup';
import Loader from '../Loader/Loader';


export default function CheckoutSession() {
  let dispatch = useDispatch();
  let navigate = useNavigate();
  const {cartId, cartList, isLoading} = useSelector((state=> state.cart));
  const [cash, setCash] = useState(false);
  const [Loading, setLoading] = useState(false);

  async function placeOrder(values) {
    if (cash) {
      setLoading(true);
      let res = await dispatch(createCashOrder({cartId, values}));
      if (res.payload.data.status == "success") {
        dispatch(updateCartId(null));
        dispatch(updateCartList(null));
        dispatch(updateNumOfCartItems(0));
        navigate('/allorders');
      }
      setLoading(false);
    }
    else {
      setLoading(true);
      let res = await dispatch(createOnlineOrder({cartId, values}));
      // console.log(res);
      if (res.payload.data.status == "success") {
        window.location.href = res.payload.data.session.url;
      }
      setLoading(false);
    }
  }

  let validationSchema = Yup.object({
    details:Yup.string().min(3,'MinLength is 3').max(15,'maxLength is 15').required('Address is Required'),
    city:Yup.string().min(3,'MinLength is 3').max(15,'maxLength is 15').required('city is Required'),
    phone:Yup.string().matches(/^01[0-2][0-9]{8}$/,'Phone Number is InValid').required('Phone Number is required')
  })

  let formik = useFormik({
    initialValues:{
      details:'',
      phone:'',
      city:'',
    },
    validationSchema,
    onSubmit:placeOrder
  })

    return <>
    <div className="my-5 fs-14">
      <Link to={'/'} className="text3 opacity-50 me-2"> Home</Link>/
      <Link to={'/cart'} className="text3 opacity-50 me-2"> Cart</Link>/
      <span className='ms-2'> Checkout Session </span>
    </div>
    {isLoading?<Loader/>:
    <>
      {cartId?<div className="row mb-5 align-items-center">
        <div className="col-md-5">
          <h2 className='ff-inter py-4'>Billing Details</h2>
          <form className='mt-4 pt-2 d-flex flex-column gap-4' >
            <div>
              <label className='opacity-50 fs-14 mb-2' htmlFor="name">First Name*</label>
              <input  id='name' type="text" className='border-0 secondry1 px-2 rounded-1 sign_in_out_inputs' />
            </div>
            <div>
              <label className='opacity-50 fs-14 mb-2' htmlFor="Address">Street Address*</label>
              <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.details} id='Address' name='details' type="text" className='border-0 secondry1 px-2 rounded-1 sign_in_out_inputs' />
              {formik.errors.details && formik.touched.details?<p className=" text-danger fs-14 my-1">{formik.errors.details}</p>:''}
            </div>
            <div>
              <label className='opacity-50 fs-14 mb-2' htmlFor="Town/City">Town/City*</label>
              <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.city} id='Town/City' name='city' type="text" className='border-0 secondry1 px-2 rounded-1 sign_in_out_inputs' />
              {formik.errors.city && formik.touched.city?<p className=" text-danger fs-14 my-1">{formik.errors.city}</p>:''}
            </div>
            <div>
              <label className='opacity-50 fs-14 mb-2' htmlFor="Phone">Phone*</label>
              <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.phone} id='Phone' name='phone' type="tel" className='border-0 secondry1 px-2 rounded-1 sign_in_out_inputs' />
              {formik.errors.phone && formik.touched.phone?<p className=" text-danger fs-14 my-1">{formik.errors.phone}</p>:''}
            </div>
          </form>
        </div>
        <div className="col-md-5 offset-md-2 px-lg-5">
          {cartList?.data?.products.map((product)=> <div key={product._id} className={`d-flex justify-content-between  text-center my-3`}>
              <div className='d-flex justify-content-start align-items-center gap-3'>
                <img src={product.product.imageCover} width={54} alt={product.product.title} />
                <span>{product.product.title.split(' ').slice(0,2).join(' ')}</span>
              </div>
              <p className='py-4 mb-0'>${Math.round(product.price * product.count / 31)}</p>
          </div>)}
          <div className={`${style.cartTotal} border-0 p-0 mt-5 mb-4`}>
            <div>
              <h6>Subtotal:</h6>
              <p>${Math.round((cartList?.data?.totalCartPrice) /31 )}</p>
            </div>
            <div>
              <h6>Shipping:</h6>
              <p>Free</p>
            </div>
            <div>
              <h6>Total:</h6>
              <p>${Math.round((cartList?.data?.totalCartPrice) /31 )}</p>
            </div>
          </div>
          <div className='d-flex justify-content-between'>
            <div className='d-flex align-items-center gap-1 mb-3 '>
              <input type="radio" id='Bank' name='method' className='bg-black cursor-pointer' defaultChecked onClick={()=>setCash(false)} style={{accentColor: "black" , height: "20px" , width:'20px'}}/>
              <label htmlFor="Bank" className='cursor-pointer'>Bank</label>
            </div>
            <div className='d-flex gap-2'>
              <img src={img1} alt={'paymentLogo'} style={{width: '35px' ,height: '28px', padding: '5.6px 2.1px'}} />
              <img src={img2} alt={'paymentLogo'} style={{width: '35px' ,height: '28px', padding: '8.4px 2.1px'}} />
              <img src={img3} alt={'paymentLogo'} style={{width: '35px' ,height: '28px', padding: '1.4px'}} />
              <img src={img4} alt={'paymentLogo'} style={{width: '35px' ,height: '28px', padding: '4.9px 1.4px'}} />
            </div>
          </div>
          <div className='d-flex align-items-center gap-1'>
            <input type="radio" id='Cash' name='method' className='bg-black cursor-pointer' onClick={()=>setCash(true)} style={{accentColor: "black" , height: "20px" , width:'20px'}}/>
            <label htmlFor="Cash" className='cursor-pointer'>Cash on delivery</label>
          </div>
          <form onSubmit={formik.handleSubmit} className='d-flex justify-content-between align-items-center my-4'>
            {Loading?<button className='secondry3 text1 p-2 w-100 px-4 border-0 rounded-1'><i className='fa fa-spinner fa-spin'></i></button>:
            <input type="submit" className='button2 text1 p-2 w-100 px-4 border-0 rounded-1' value='Place Order' />
            }
            
          </form>
        </div>
      </div>:<h2 className='h4 text-center'>There are no items in your cart</h2>}
    </>
    }
  </>
}
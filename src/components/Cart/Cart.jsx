import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearCart, deleteCart, getCart, updateCartList } from '../../redux/cartSlice'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import style from './cart.module.css'
import Loader from '../Loader/Loader'
import { Helmet } from 'react-helmet'

export default function Cart() {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const {userToken} = useSelector((state)=>state.userToken)
  const {cartList, isLoading, delLoading} = useSelector((state=> state.cart))
  const [updateLoading, setUpdateLoading] = useState(false)
  // console.log(cartList);

  async  function updateCart ( id, count ) {
    if (count > 0) {
      setUpdateLoading(true);
    const headers = {
      token: localStorage.getItem('userToken')
    }
    try {
      const {data} = await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, { count }, { headers });
      dispatch(updateCartList(data))
      setUpdateLoading(false);
    } catch (error) {
      console.log(error);
      setUpdateLoading(false);
    }
    }
  }

  function CheckoutNavigation() {
    navigate('/cart/checkout')
  }

  useEffect(()=>{
    if (userToken) {
      dispatch(getCart())
    }
  },[])

  return <>
  <Helmet>
    <title>Cart</title>
  </Helmet>
    <div className="py-5 fs-14">
      <Link to={'/'} className="text3 opacity-50 me-2"> Home</Link>/
      <span className='ms-2'> Cart </span>
    </div>
    <>
      {isLoading?<Loader />:<>
      {updateLoading?<Loader/>:''}
      {delLoading?<Loader/>:''}
      {userToken && cartList && cartList.numOfCartItems>0?<>
      <div className={`${style.cartHeader} row row-cols-5 text-center px-lg-5 py-3 mx-lg-5 my-3`} style={{boxShadow:'0px 1px 13px 0px rgba(0, 0, 0, 0.05)'}} >
          <p className='text-start m-0'>Product</p>
          <p className='m-0'>Price</p>
          <p className='m-0'>Quantity</p>
          <p className='m-0'>Subtotal</p>
          <p className='m-0'>Remove</p>
        </div>
        {cartList?.data?.products.map((product)=> <div key={product._id} className={`${style.cartItem} row row-cols-5 text-center px-lg-5 mx-lg-5 my-3`} style={{boxShadow:'0px 1px 13px 0px rgba(0, 0, 0, 0.05)'}}>
          <div className='d-flex justify-content-start align-items-center gap-3'>
            <img src={product.product.imageCover} width={54} alt={product.product.title} />
            <span>{product.product.title.split(' ').slice(0,2).join(' ')}</span>
          </div>
          <p className='py-4 mb-0'>${Math.round(product.price / 31)}</p>
          <div className=" mt-3 d-flex justify-content-center align-items-center rounded-1" style={{height:'44px'}}>
            <button className=" border-0 h-100 px-3 rounded-start-1" onClick={()=>updateCart(product.product._id, product.count - 1)}>-</button>
            <p className=" border-top border-bottom m-0 d-flex justify-content-center align-items-center h-100" style={{width:'80px'}}>{product.count}</p>
            <button className=" px-3 border-0 h-100 rounded-end-1" onClick={()=>updateCart(product.product.id, product.count + 1)}>+</button>
          </div>
          <p className='py-4 mb-0 text-secondry3'>${Math.round(product.price * product.count / 31)}</p>
          <span className='py-4'><i onClick={()=> dispatch(deleteCart(product.product.id))} className='fa fa-trash-can text-danger cursor-pointer p-2 fs-5'></i></span>
    </div>)}
    <div className={`${style.section3} d-flex justify-content-between align-items-start mb-5 pb-5 mx-lg-5 mt-4`}>
    <button onClick={()=>dispatch(clearCart())} className='text3 border border-opacity-50 border-black rounded-1 my-4 my-sm-0 bg-white px-3 py-2'>Return To Shop</button>
    <div className={style.cartTotal} style={{width:'470px'}}>
      <h4 className='fs-5 mb-4 fw-meduim'>Cart Total</h4>
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
      <button onClick={CheckoutNavigation} className='border-0 d-inline-block rounded-2 px-3 button2 p-2 text-white fw-medium'>Procees to checkout</button>
    </div>
    </div>
        </>:<h5 className='my-80 text-center '>
        <i className="bi bi-cart3 d-block mb-3" style={{fontSize:'150px'}}></i>
          You Don't Have Any Products In Your Cart
          </h5>}
      </>}
        
    </>
  </>
}

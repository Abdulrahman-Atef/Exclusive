import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getUserOrders } from '../../redux/uesrOrdersSlice'
import Loader from '../Loader/Loader';
import Emptyorders from '../../assets/empty-box_2.png'
import { Helmet } from 'react-helmet';


export default function MyOrders() {
  let dispatch = useDispatch();
  const {orders, isLoading} = useSelector((state)=> state.userOrders)

  useEffect(() => {
    dispatch(getUserOrders());
  }, [])

  return <>
    <Helmet>
      <title>My Orders</title>
    </Helmet>
    <div className="my-5 fs-14">
      <Link to={'/'} className="text3 opacity-50 me-2"> Home</Link>/
      <span className='ms-2'> My Orders </span>
    </div>
    {isLoading?<Loader/>:
      <>
        {orders?.length > 0?<div className="row g-4 row-cols-md-2 mb-5">
        {orders?.map((order, index)=> <div key={order._id}>
          <div className='p-3 border h-100' style={{boxShadow:'0px 1px 13px 0px rgba(0, 0, 0, 0.05)'}}>
            <h3 className='h5 mb-3'>Order({index + 1})</h3>
            <h4 className='h6'>Order Id: {order.id}</h4>
            <p className='mb-2'>order Date: {order.createdAt.split('T').slice(0,1)}</p>
            <p className='mb-3'>total Order Price: <span className='text-danger'>${Math.round(order.totalOrderPrice / 31)}</span></p>
            <div className='border-bottom border-top py-3'>
              {order.cartItems.map((item, index)=> <div key={index} className='d-flex justify-content-between align-items-center'>
                <div className='d-flex justify-content-start align-items-center gap-3'>
                  <img src={item.product.imageCover} width={54} alt={item.product.title} />
                  <span>{item.product.title.split(' ').slice(0,2).join(' ')}</span>
                </div>
                <div className='text-center'>
                  <span>${Math.round(item.price / 31)}</span>
                  <span className='opacity-50 d-block'>Qty: {item.count}</span>
                </div>
              </div>)}
            </div>
            <div className='d-flex justify-content-between pt-3'>
              <h6 className='mb-0'>Payment Method: <span className=' text-secondary'>{order.paymentMethodType}</span></h6>
              {order?.shippingAddress?<div>
                <h6>Dilevery:</h6>
                <p className='opacity-50'>Address</p>
                <p>{order?.shippingAddress?.details}</p>
                <p>{order?.shippingAddress?.city}</p>
                <p>Phone: {order?.shippingAddress?.phone}</p>
              </div>:''}
            </div>
          </div>
        </div>)}
      </div>:
        <div>
          <div className='d-flex justify-content-center align-items-center flex-column gap-5'>
            <img src={Emptyorders} className='w-100' style={{maxWidth:'450px'}}/>
            <p className='fw-bold fs-4'>There Are No Orders For You</p>
          </div>
        </div>
      }
        
      </>
      
      }
    
  </>
}

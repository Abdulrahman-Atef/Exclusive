import React, { useContext, useState } from 'react'
import { ProductsContext } from '../../Context/ProductsContext'
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToWishList, removeFromWishList, setwishListIds } from '../../redux/wishListSlice';
import { addToCart } from '../../redux/cartSlice';
import Loader from '../Loader/Loader';
import { Helmet } from 'react-helmet';

export default function WomenProducts() {

  let {checkRating, getProductsByCategory} = useContext(ProductsContext);
  
  const [page, setPage] = useState(1)
  let {userToken} = useSelector((state)=>state.userToken);
  let {wishListIds} = useSelector((state)=> state.wishList);
  let dispatch = useDispatch();

  function checkWishList(id) {
    return wishListIds?.includes(id)
  }
  
  async function getAllproducts() {
    let womenId = '6439d58a0049ad0b52b9003f';
    let {data} = await getProductsByCategory(page, 40, womenId)
    return data
  }


  async function handleRemoveFromWishList(productId) {
    const {payload} = await dispatch(removeFromWishList(productId))
    dispatch(setwishListIds(payload.data))
  }
  
  async function handleAddToWishList(productId) {
    const {payload} = await dispatch(addToWishList(productId))
    dispatch(setwishListIds(payload.data))
  }

  let {data, isLoading} = useQuery('womenProducts', getAllproducts)

  return <>
  <Helmet>
    <title>Women's Products</title>
  </Helmet>
    {!data?<Loader/>:<div className="row g-4 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 my-5  pb-5">
    {data?.map((product , index)=> 
      <div key={index}>
        <div className='productCard mx-2 border rounded-2 d-block text-start'>
          <div className=' position-relative'>
            <img src={product.imageCover} alt={product.title} className='w-100 p-5 p-sm-4' />
            <button onClick={()=>dispatch(addToCart(product._id))} className='addToCart btn text1 rounded-bottom-0 w-100 main-bg-black position-absolute'>Add To Cart <i className="fa-solid fa-cart-shopping ms-1 fs-6"></i></button>
            <div className='addCheckCard d-flex flex-column position-absolute gap-1'>
            {checkWishList(product.id) && userToken?
            <Link onClick={()=>handleRemoveFromWishList(product._id)} className='secondry1 rounded-circle p-1 px-2 d-flex justify-content-center align-items-center'><i className="bi bi-heart-fill text-danger"></i></Link>
            :
            <Link onClick={()=>handleAddToWishList(product._id)} className='secondry1 rounded-circle p-1 px-2 d-flex justify-content-center align-items-center'><i className="bi bi-heart"></i></Link>
            }
            
            <Link to={`/productDetails/${product.id}`} className='secondry1 rounded-circle p-1 px-2 d-flex justify-content-center align-items-center'><i className="bi bi-eye"></i></Link>
            </div>
            {product.priceAfterDiscount>0?
            <span className='secondry3 text-white rounded-2 fs-12 p-1 px-2 position-absolute' style={{left:'10px', top:'10px'}}>{- Math.round((((product.price - product.priceAfterDiscount)/product.price)*100))}% </span>:''}
            
          </div>
          <div className='secondry1 p-2 rounded-bottom-2'>
            <h3 className='h6 fw-medium m-0'>{product.title.split(' ').slice(0,2).join(' ')}</h3>
            {product.priceAfterDiscount==0  || product.priceAfterDiscount == undefined?
            <span className='fw-medium m-0 text-secondry3 my-1 d-inline-block'>${Math.round(product.price / 31)}</span>:
            <>
              <span className='fw-medium m-0 text-secondry3 my-1 d-inline-block'>${Math.round(product.priceAfterDiscount / 31)}</span>
              <del className='ms-3 fw-medium m-0 text3 opacity-50 my-1 d-inline-block'>${Math.round(product.price / 31)}</del>
            </>}
            <div className='d-flex align-items-center gap-2'>
              {checkRating(product.ratingsAverage)} <span className='text3 opacity-50 pt-1 fs-12'>({product.ratingsQuantity})</span>
            </div>
          </div>  
        </div>
      </div>)}
  </div>}
  </>
  
}


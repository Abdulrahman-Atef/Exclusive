import 'react-toastify/dist/ReactToastify.css';
import React, { useContext, useState } from 'react'
import { ProductsContext } from '../../Context/ProductsContext'
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addToWishList, removeFromWishList, setwishListIds } from '../../redux/wishListSlice';
import { addToCart } from '../../redux/cartSlice';
import Loader from '../Loader/Loader';
import { Helmet } from 'react-helmet';

export default function AllProducts() {

  let {checkRating} = useContext(ProductsContext);
  let {userToken} = useSelector((state)=>state.userToken);
  let {wishListIds} = useSelector((state)=> state.wishList);
  const [page, setpage] = useState(2);
  let dispatch = useDispatch();

  function checkWishList(id) {
    return wishListIds?.includes(id)
  }

  async function getProducts() {
    let {data} = await axios.get(`https://route-ecommerce.onrender.com/api/v1/products?page=${page}&limit=35`)
    return data;
  }

  async function handleRemoveFromWishList(productId) {
    const {payload} = await dispatch(removeFromWishList(productId))
  dispatch(setwishListIds(payload.data))
}

async function handleAddToWishList(productId) {
  const {payload} = await dispatch(addToWishList(productId))
  dispatch(setwishListIds(payload.data))
}

  let {isLoading, data} = useQuery({
    queryKey: ['products', page],
    queryFn: () => getProducts(page),
    keepPreviousData : true
  });
  return <>
  <Helmet>
    <title>All Products</title>
  </Helmet>
  {data?<>
    <div className="row g-4 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 my-5">
    {data?.data.map((product , index)=> 
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
    </div>
    <div className='d-flex gap-3 justify-content-center mb-5'>
      <button className='bg-body-secondary text-secondary-emphasis p-2 px-4 border-0 rounded-1' onClick={()=>setpage(2)}>Previous Page</button>
      <button className='bg-body-secondary text-secondary-emphasis p-2 px-4 border-0 rounded-1' onClick={()=>setpage(1)}>Next Page</button>
    </div>
  </>:<Loader/>}
  </>
  
}

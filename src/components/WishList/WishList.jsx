import React, { useContext, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getWishList, removeFromWishList, setWishList, setwishListIds } from '../../redux/wishListSlice'
import { Link } from 'react-router-dom';
import { ProductsContext } from '../../Context/ProductsContext';
import { addToCart } from '../../redux/cartSlice';
import Loader from '../Loader/Loader'
import wishEmpty from '../../assets/empty_wishlist.png'
import { Helmet } from 'react-helmet';

export default function WishList() {
  let dispatch = useDispatch();
  let {wishList, isLoading} = useSelector((state)=> state.wishList);
  let {userToken} = useSelector((state)=> state.userToken);
  const {checkRating} = useContext(ProductsContext)


  async function handleRemoveFromWishList(productId) {
    const arr = [];
    const {payload} = await dispatch(removeFromWishList(productId));
    dispatch(setwishListIds(payload.data));
    for (let i = 0; i <= wishList.length; i++) {
      if((payload.data).includes(wishList[i]?.id)){
        arr.push(wishList[i])
      }
    }
    dispatch(setWishList(arr));
  }

  useEffect(()=>{
    if (localStorage.getItem('userToken')) {
      dispatch(getWishList());
    }
  },[])

  return <>
  <Helmet>
    <title>WishList</title>
  </Helmet>
  <div className="py-5 fs-14">
      <Link to={'/'} className="text3 opacity-50 me-2"> Home</Link>/
      <span className='ms-2'> WishList </span>
    </div>
  {userToken?<>
  {isLoading?<Loader/>:<>
  {wishList?.length>0 ?<>
    <div className="my-5 fs-5">
      <span> WishList ({wishList?.length}) </span>
    </div>
    <div className="row g-4 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 my-5 pb-5">
      {wishList?.map((product , index)=>
        <div key={index}>
          <div className='productCard mx-2 border rounded-2 d-block text-start'>
              <div className=' position-relative'>
                <img src={product.imageCover} alt={product.title} className='w-100 p-5 p-sm-4' />
                <button onClick={()=>dispatch(addToCart(product._id))} className='addToCart btn text1 rounded-bottom-0 w-100 main-bg-black position-absolute'>Add To Cart <i className="fa-solid fa-cart-shopping ms-1 fs-6"></i></button>
                <div className='addCheckCard d-flex flex-column position-absolute gap-1'>
                <Link onClick={()=>handleRemoveFromWishList(product.id)} className='secondry1 rounded-circle p-1 px-2 d-flex justify-content-center align-items-center'><i className="bi bi-trash"></i></Link>
                <Link to={`/productDetails/${product.id}`} className='secondry1 rounded-circle p-1 px-2 d-flex justify-content-center align-items-center'><i className="bi bi-eye"></i></Link>
                </div>
                {product.priceAfterDiscount>0?
                <span className='secondry3 text-white rounded-2 fs-12 p-1 px-2 position-absolute' style={{left:'10px', top:'10px'}}>{- Math.round((((product.price - product.priceAfterDiscount)/product.price)*100))}% </span>:''}
                
              </div>
              <div className='secondry1 p-2 rounded-bottom-2'>
                <h3 className='h6 fw-medium m-0'>{product.title.split(' ').slice(0,2).join(' ')}</h3>
                {product.priceAfterDiscount==0 || product.priceAfterDiscount == undefined?
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
        </div>)
      }
    </div>
  </>:<div className='d-flex justify-content-center align-items-center'>
        <img src={wishEmpty} className='w-100' style={{maxWidth:'450px'}}/>
      </div>}
  </>}
  </>:<div className='d-flex justify-content-center align-items-center'>
        <img src={wishEmpty} className='w-100' style={{maxWidth:'450px'}}/>
      </div>}
    
  </>
}

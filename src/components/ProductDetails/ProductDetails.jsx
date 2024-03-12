import React, { useContext, useState } from "react";
import { Link, useParams } from 'react-router-dom'
import axios from "axios";
import { useQuery } from "react-query";
import ProductSlider from './Slider'
import { ProductsContext } from "../../Context/ProductsContext";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/cartSlice";
import { addToWishList, removeFromWishList, setwishListIds } from "../../redux/wishListSlice";
import {toast} from "react-toastify";
import { Helmet } from "react-helmet";

export default function ProductDetails() {
  const {id} = useParams();
  const dispatch = useDispatch();
  let {wishListIds} = useSelector((state)=> state.wishList);
  let {userToken} = useSelector((state)=>state.userToken);
  const {checkRating} = useContext(ProductsContext);
  const [productNum, setNum] = useState(1)
  
  function checkWishList(id) {
    return wishListIds?.includes(id)
  }

  async function handleRemoveFromWishList(productId) {
    const {payload} = await dispatch(removeFromWishList(productId))
    dispatch(setwishListIds(payload.data))
}

async function handleAddToWishList(productId) {
  if (userToken) {
  const {payload} = await dispatch(addToWishList(productId))
  dispatch(setwishListIds(payload.data))
  }
  else{
    toast.info('You have To login First', {position:'bottom-right'})
  }
}

  function setproductNum(term){
    if(productNum + term >= 1){
      setNum(productNum + term)
    }
  }

  async  function updateCart ( id, count ) {
    let headers = {
      token: localStorage.getItem('userToken')
    }
    try {
      let {data} = await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, { count }, { headers });
      // console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleAddToCart(id){
    if (userToken) {
      await dispatch(addToCart(id));
      updateCart(id, productNum);
    }
    else{
      toast.info('You have To login First', {
        position:'bottom-right'
      })
    }
  }
  async function getSpeceficProduct() {
  
    let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
    return data.data
  }
  
  let {data, isLoading} = useQuery('getSpeceficProduct', getSpeceficProduct);
  // console.log(data);
  return <>
    <Helmet>
      <title>{data?.title.split(' ').slice(0,3).join(' ')}</title>
    </Helmet>
    {data?<>
        <div className="py-5 fs-14">
          <Link to={'/'} className="text3 opacity-50 me-2"> Home</Link>/
          <Link to={`/products/${(data.category.name).split(" ").join("")}`} className="text3 opacity-50 me-2"> {data.category.name}</Link>/
          <span className='ms-2'> {data.title.split(' ').slice(0,4).join(' ')} </span>
        </div>
        <div className="row algin-items-center g-md-5 gy-5 mb-5 pb-sm-5 pb-4">
          <div className={`productDetailsSlider col-md-6`}>
            <ProductSlider id={id} data={data}/>
          </div>
          <div className="col-md-6">
            <p className="text3 fs-5 fw-semibold fw-inter m-0 py-2">{data.title}</p>
            <div className="d-flex align-items-center">
              {checkRating(data.ratingsAverage)}<span className='text3 opacity-50 ms-2 pt-1 fs-12'>({data.ratingsQuantity} Reviews)</span>
              <span className="ps-3 fs-5 opacity-50">|</span>
              <span className="button1-text opacity-50 text-teal fs-14 m-0 px-3 py-2">In Stock</span>
            </div>
            {data.priceAfterDiscount == 0 || data.priceAfterDiscount == undefined?
                  <p className='text3 fs-4 fw-normal fw-inter m-0 py-2'>${(data.price / 31).toFixed() }</p>:
                  <div className="d-flex align-items-center gap-3 my-2">
                    <p className='text-secondry3 m-0 d-inline-block fs-4 fw-normal fw-inter'>${(data.priceAfterDiscount / 31).toFixed() }</p>
                    <del className='fw-medium text3 opacity-50 d-inline-block fw-inter fs-5'>${(data.price / 31).toFixed() }</del>
                  </div>}
            <p className="text3 fs-14 fw-normal m-0 py-2">{data.description}</p>
            <div className="border border-1 border-black opacity-25 my-3"></div>
            <div className="d-flex gap-3 align-items-center mt-2">
              <p className="text3 fs-5 fw-normal fw-inter m-0 py-2">Size:</p>
              <label htmlFor="sm">
                <input type="radio" id="sm" className="sizeCheckBox d-none" name="size"/>
                <div>S</div>
              </label>
              <label htmlFor="md">
                <input type="radio" id="md" className="sizeCheckBox d-none" name="size" defaultChecked/>
                <div>M</div>
              </label>
              <label htmlFor="lg">
                <input type="radio" id="lg" className="sizeCheckBox d-none" name="size"/>
                <div>L</div>
              </label>
              <label htmlFor="xl">
                <input type="radio" id="xl" className="sizeCheckBox d-none" name="size"/>
                <div>XL</div>
              </label>
            </div>
            <div className="d-flex align-items-center gap-3 my-3">
              <div className="border d-flex align-items-center rounded-1" style={{height:'44px'}}>
                <button className="fs-14 border-0 h-100 px-3 rounded-start-1" onClick={()=>setproductNum(-1)}>-</button>
                <p className=" m-0 d-flex justify-content-center align-items-center h-100" style={{width:'80px'}}>{productNum}</p>
                <button className="fs-14 button2 px-3 text1 border-0 h-100 rounded-end-1" onClick={()=>setproductNum(1)}>+</button>
              </div>
              <div className="d-flex gap-2 gap-sm-3">
                <button onClick={()=>handleAddToCart(data.id)} className="border-0 rounded-2 button2 text-white text1 btn-sm p-sm-2 fs-14 px-sm-3">Add To Card</button>
                {checkWishList(data.id) && userToken?
                <button onClick={()=>handleRemoveFromWishList(data.id)} className="border border-1 border-black border-opacity-50 bg-white d-flex justify-content-center align-items-center rounded-1" style={{width:'40px',height:'40px'}}><i className="bi fs-5 pt-1 bi-heart-fill text-danger"></i></button>
                :
                <button onClick={()=>handleAddToWishList(data.id)} className="border border-1 border-black border-opacity-50 bg-white d-flex justify-content-center align-items-center rounded-1" style={{width:'40px',height:'40px'}}><i className="bi fs-5 pt-1 bi-heart"></i></button>
                }
              </div>
            </div>
          </div>
        </div>
      </>:''}
      
      
    </>
}
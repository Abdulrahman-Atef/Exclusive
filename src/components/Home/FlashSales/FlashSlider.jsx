import React, { useRef, useContext } from "react";
import Slider from "react-slick";
import { ProductsContext } from '../../../Context/ProductsContext'
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { addToCart } from "../../../redux/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { addToWishList, removeFromWishList, setwishListIds } from "../../../redux/wishListSlice";
import Loader from "../../Loader/Loader";

export default function FlashSlider() {
  let dispatch = useDispatch();
  const sliderRef = useRef(null);
  let {userToken} = useSelector((state)=>state.userToken);
  let {getProducts, checkRating} = useContext(ProductsContext);
  let {wishListIds} = useSelector((state)=> state.wishList);

  function checkWishList(id) {
    return wishListIds?.includes(id);
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
  }

  const settings = {
    // dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      {
        breakpoint: 970,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  const next = () => {
    sliderRef.current.slickNext();
  };

  const previous = () => {
    sliderRef.current.slickPrev();
  };

// 
  
async function getAllproducts() {
  
  let array =[];
    let {data} = await getProducts(2, 35);
    for (let i = 0; i < data.length; i++) {
      if(data[i].priceAfterDiscount > 0 ){
        array.push(data[i]);
      }
    }
    // console.log(array);
    return array;
}

let {data, isLoading} = useQuery('flashSales', getAllproducts);
// 
// console.log(data);
  return <>
  {isLoading?<Loader/>:<div>
      <div className=" text-end mb-3">
        <button className="btn secondry1 rounded-circle me-2" onClick={previous} aria-label="Previous Button">
        <i className="fa-solid fa-arrow-left"></i>
        </button>
        <button className="btn secondry1 rounded-circle" onClick={next} aria-label="Next Button">
        <i className="fa-solid fa-arrow-right"></i>
        </button>
      </div>
      <Slider ref={sliderRef} {...settings}>
        {data?.map((product , index)=> 
          <div key={index}>
            <div className='productCard mx-2 border rounded-2 d-block text-start'>
              <div className=' position-relative'>
                <img src={product?.imageCover} alt={product.title} className='w-100 p-5 p-sm-4' />
                <button onClick={()=>dispatch(addToCart(product._id))} className='addToCart btn text1 rounded-bottom-0 w-100 main-bg-black position-absolute'>Add To Cart <i className="fa-solid fa-cart-shopping ms-1 fs-6"></i></button>
                <div className='addCheckCard d-flex flex-column position-absolute gap-1'>
                {checkWishList(product.id) && userToken?
                <Link onClick={()=>handleRemoveFromWishList(product._id)} className='secondry1 rounded-circle p-1 px-2 d-flex justify-content-center align-items-center' aria-label="heart"><i className="bi bi-heart-fill text-danger"></i></Link>
                :
                <Link onClick={()=>handleAddToWishList(product._id)} className='secondry1 rounded-circle p-1 px-2 d-flex justify-content-center align-items-center' aria-label="heart"><i className="bi bi-heart"></i></Link>
                }
                
                <Link to={`/productDetails/${product.id}`} className='secondry1 rounded-circle p-1 px-2 d-flex justify-content-center align-items-center' aria-label="discover"><i className="bi bi-eye"></i></Link>
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
      </Slider>
    </div>}
    
  </>
}
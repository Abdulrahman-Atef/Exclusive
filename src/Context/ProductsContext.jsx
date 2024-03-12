import axios from "axios";
import { createContext } from "react";

export let ProductsContext = createContext();

export default function ProductsContextProvider({children}){

  async function getProducts(page=2, limit=40) {
    let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/products?page=${page}&limit=${limit}`);
    return data;
  }
  async function getProductsByCategory(page=1, limit=40, cat) {
    let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/products?page=${page}&limit=${limit}&category[in]=${cat}`);
    return data;
  }

  function checkRating(num){
    // console.log('checkRating');
    if(num >= 4.3 && num <4.5){
      return <span>
        <i className='fas fa-star text-warning'></i>
        <i className='fas fa-star text-warning'></i>
        <i className='fas fa-star text-warning'></i>
        <i className='fas fa-star text-warning'></i>
        <i className='fas fa-star text-3 opacity-25'></i>
      </span>
    }
    else if(num <= 4.3){
      return <span>
        <i className='fas fa-star text-warning'></i>
        <i className='fas fa-star text-warning'></i>
        <i className='fas fa-star text-warning'></i>
        <i className='fas fa-star text-3 opacity-25'></i>
        <i className='fas fa-star text-3 opacity-25'></i>
      </span>
    }
    else if(num >= 4.5){
      return <span>
        <i className='fas fa-star text-warning'></i>
        <i className='fas fa-star text-warning'></i>
        <i className='fas fa-star text-warning'></i>
        <i className='fas fa-star text-warning'></i>
        <i className='fas fa-star text-warning'></i>
      </span>
    }
  }

  return <>
    <ProductsContext.Provider value={{getProducts, checkRating, getProductsByCategory}}>
      {children}
    </ProductsContext.Provider>
  </>
}
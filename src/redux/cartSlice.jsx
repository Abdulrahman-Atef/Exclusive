import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {toast} from "react-toastify";


export const getCart = createAsyncThunk('cart/getCart',

  async() => {
    let headers ={
      token:localStorage.getItem('userToken')
    }
    let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/cart`, {headers})
    return data
  }

)
export const addToCart = createAsyncThunk('cart/addToCart',

  async(productId) => {
    let headers ={
      token:localStorage.getItem('userToken')
    }
    if (localStorage.getItem('userToken')) {
      try {
        let {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/cart` , {productId}, {headers});
        if (data.message == "Product added successfully to your cart") {
          toast.success('Product added successfully to your cart', {
            className:'text-center',
            position:'bottom-right'
          })
          // console.log(data);
          return data;
        }
      } catch (error) {
        console.log(error);
        return error
      }
    }
    else{
      toast.info('You have To login First', {
        position:'bottom-right'
      })
    }
  }

)

export const deleteCart = createAsyncThunk('cart/deleteCart',

  async(id) => {
    let headers ={
      token:localStorage.getItem('userToken')
    }
    try {
      let {data} = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {headers});
      return data;
    } catch (error) {
      console.log(error);
      return error
    }
  }

)
export const clearCart = createAsyncThunk('cart/clearCart',

  async() => {
    let headers ={
      token:localStorage.getItem('userToken')
    }
    try {
      let {data} = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/`, {headers});
      console.log(data);  
      return data;
    } catch (error) {
      console.log(error);
      return error
    }
  }

)


const initialState = {cartList:null , cartNum:0, numOfCartItems:0, cartId:null, isLoading:false, delLoading:false}

const cartSlice = createSlice({
  name:'cartSlice',
  initialState,
  reducers:{
    updateCartList:(state, action)=>{
      state.cartList = action.payload
    },
    updateCartId:(state, action)=>{
      state.cartId = action.payload
    },
    updateNumOfCartItems:(state, action)=>{
      state.numOfCartItems = action.payload
    }
  },
  extraReducers: (builder)=>{
    builder.addCase(getCart.fulfilled, (state, action) => {
      state.numOfCartItems = action.payload?.numOfCartItems;
      state.cartList = action.payload;
      state.cartId = action.payload.data._id;
      state.isLoading = false;
    })
    builder.addCase(getCart.pending, (state) => {
      state.isLoading = true;
    })
    builder.addCase(getCart.rejected, (state) => {
      state.numOfCartItems = null;
      state.cartList = null;
      state.cartId = null;
      state.isLoading = false;
    })
    builder.addCase(deleteCart.fulfilled, (state, action) => {
      state.numOfCartItems = action.payload.numOfCartItems
      state.cartList = action.payload
      state.delLoading = false;
    })
    builder.addCase(deleteCart.pending, (state) => {
      state.delLoading = true;
    })
    builder.addCase(deleteCart.rejected, (state) => {
      state.delLoading = false;
    })
    builder.addCase(addToCart.fulfilled, (state, action) => {
      if (localStorage.getItem('userToken')) {
        state.numOfCartItems = action.payload.numOfCartItems
        state.cartList = action.payload.data.products
      }
    })
    builder.addCase(clearCart.fulfilled, (state, action) => {
      if (localStorage.getItem('userToken')) {
        state.numOfCartItems = 0;
        state.cartList = null;
      }
    })
  }
})

export let cartSliceReducer = cartSlice.reducer
export let {updateCartList, updateCartId, updateNumOfCartItems} = cartSlice.actions

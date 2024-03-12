import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import jwtDecode from 'jwt-decode'

const BaseUrl = 'https://ecommerce.routemisr.com';

export let createCashOrder = createAsyncThunk('ordersSlice/createCashOrder',

  async({cartId, values})=>{
    let headers ={
      token:localStorage.getItem('userToken')
    }

    return axios.post(`${BaseUrl}/api/v1/orders/${cartId}`, {
      shippingAddress: values
    } , {headers})
    .then((res)=> res)
    .catch((err)=> console.log(err))
  }
)
export let createOnlineOrder = createAsyncThunk('ordersSlice/createOnlineOrder',

  async({cartId, values})=>{
    let headers ={
      token:localStorage.getItem('userToken')
    }

    return axios.post(`${BaseUrl}/api/v1/orders/checkout-session/${cartId}?url=${encodeURIComponent('https://abdo-tech.me/Exclusive/#')}`, {
      shippingAddress: values
    } , {headers})
    .then((res)=> res)
    .catch((err)=> console.log(err))
  }
)
export let getUserOrders = createAsyncThunk('ordersSlice/getUserOrders',

  async()=>{
    const decoded = jwtDecode(localStorage.getItem('userToken'));
    return axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${decoded.id}`)
    .then((res)=> res.data)
    .catch((err)=> console.log(err))
  }
)


const initialState = {orders:null, isLoading:false}


const ordersSlice = createSlice({
name:'ordersSlice',
initialState,
extraReducers:(builder)=>{
  builder.addCase(getUserOrders.fulfilled, (state, action)=>{
    state.orders = action.payload;
    state.isLoading = false;
  })
  builder.addCase(getUserOrders.rejected, (state)=>{
    state.isLoading = false;
  })
  builder.addCase(getUserOrders.pending, (state)=>{
    state.isLoading = true;
  })
}
});

export let ordersSliceReducer = ordersSlice.reducer;
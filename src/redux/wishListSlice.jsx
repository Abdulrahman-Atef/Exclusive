import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BaseUrl = 'https://ecommerce.routemisr.com'

export const getWishList = createAsyncThunk('getWishList', 
  async()=>{
    try {
      const headers = {
        token: localStorage.getItem('userToken')
      };
    let {data} = await axios.get(`${BaseUrl}/api/v1/wishlist`, {headers});
    // console.log(data);
    return data.data
    } catch (error) {
      console.log(error);
    }
  }
)
export const addToWishList = createAsyncThunk('addToWishList', 
  async(productId)=>{
    try {
      const headers = {
        token: localStorage.getItem('userToken')
      };
    let {data} = await axios.post(`${BaseUrl}/api/v1/wishlist`, {productId}, {headers});
    // console.log(data);
    return data
    } catch (error) {
      console.log(error);
    }
  }
)

export const removeFromWishList = createAsyncThunk('removeFromWishList', 
  async(id)=>{
    try {
      const headers = {
        token: localStorage.getItem('userToken')
      };
    let {data} = await axios.delete(`${BaseUrl}/api/v1/wishlist/${id}`, {headers});
    // console.log(data);
    return data
    } catch (error) {
      console.log(error);
    }
  }
)

const initialState = {wishList:null, wishListNum:0, wishListIds:[], isLoading:false}

let wishListSlice = createSlice({
  name:"wishListSlice",
  initialState,
  reducers:{
    setWishList:(state, action)=>{
      state.wishList = action.payload
      state.isLoading = false
    },
    setwishListIds:(state, action)=>{
      state.wishListIds = action.payload
    }
  },
  extraReducers:(builder)=>{
    builder.addCase(getWishList.fulfilled , (state, action)=>{
      const arr = [];
      state.wishList = action.payload
      for (let i = 0; i < (action.payload).length; i++) {
        arr.push((action.payload)[i].id)
      }
      state.wishListIds = arr;
      state.isLoading = false;
    })
    builder.addCase(getWishList.pending , (state)=>{
      state.isLoading = true
    })
    builder.addCase(getWishList.rejected , (state)=>{
      state.isLoading = false
    })
  }
})

export let wishListSliceReducer = wishListSlice.reducer;
export let {setWishList, setwishListIds} =  wishListSlice.actions;
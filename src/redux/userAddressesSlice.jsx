import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {toast} from 'react-toastify';


const BaseUrl = 'https://ecommerce.routemisr.com';

export let getAddress = createAsyncThunk('userAddressesSlice/getAddress',

  async()=>{
    const headers = {
      token:localStorage.getItem('userToken')
    }
    try {
      let {data} = await axios.get(`${BaseUrl}/api/v1/addresses`, {headers})
        // console.log(data);
        return data;
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message ,{
        position:'bottom-right',
        className:'text-center'
      })
    }
  }
)
export let addAddress = createAsyncThunk('userAddressesSlice/addAddress',

  async(values)=>{
    const headers = {
      token:localStorage.getItem('userToken')
    }
    try {
      let {data} = await axios.post(`${BaseUrl}/api/v1/addresses`, values , {headers})
      if(data.message == "Address added successfully"){
        // console.log(data);
        return data;
      }
    } catch (error) {
      console.log(error);
    }
  }
)
export let deleteAddress = createAsyncThunk('userAddressesSlice/deleteAddress',

  async(id)=>{
    const headers = {
      token:localStorage.getItem('userToken')
    }
    try {
      let {data} = await axios.delete(`${BaseUrl}/api/v1/addresses/${id}`, {headers})
      if(data.message == "Address removed successfully"){
        console.log(data);
        return data;
      }
    } catch (error) {
      console.log(error);
    }
  }
)

const initialState = {userAddresses:null, isLoading:false, isError:false ,getLoading:false}


const userAddressesSlice = createSlice({
name:'userAddressesSlice',
initialState,
extraReducers:(builder)=>{
  builder.addCase(getAddress.fulfilled, (state, action)=>{
    state.userAddresses = action.payload?.data;
    state.getLoading = false;
  })
  builder.addCase(getAddress.pending, (state)=>{
    state.getLoading = true;
  })
  builder.addCase(getAddress.rejected, (state)=>{
    state.getLoading = true;
  })
  /*-----------------------------------------------------------*/
  builder.addCase(addAddress.fulfilled, (state, action)=>{
    state.userAddresses = action.payload?.data;
    state.isLoading = false;
  })
  builder.addCase(addAddress.pending, (state)=>{
    state.isLoading = true;
  })
  builder.addCase(addAddress.rejected, (state)=>{
    state.isLoading = false;
  })
  /*-----------------------------------------------------------*/
  builder.addCase(deleteAddress.fulfilled, (state, action)=>{
    state.userAddresses = action.payload?.data;
  })
}
});

export let userAddressesSliceReducer = userAddressesSlice.reducer;
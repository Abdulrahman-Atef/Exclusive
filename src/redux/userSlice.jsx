import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userToken: localStorage.getItem('userToken') , 
  userData: JSON.parse(localStorage.getItem('userData'))
};

export const userSlice = createSlice({
  name:'user',
  initialState,
  reducers:{
    setUserToken:(state,action)=>{
      state.userToken = action.payload;
    },
    setUserData:(state,action)=>{
      state.userData = action.payload;
    }
  }
})

export let userSliceReducer = userSlice.reducer;
export let {setUserToken, setUserData} = userSlice.actions;
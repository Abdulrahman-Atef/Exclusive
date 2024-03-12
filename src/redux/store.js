import { configureStore } from '@reduxjs/toolkit'
import { userSliceReducer } from './userSlice'
import { cartSliceReducer } from './cartSlice'
import { wishListSliceReducer } from './wishListSlice'
import { ordersSliceReducer } from './uesrOrdersSlice'
import { userAddressesSliceReducer } from './userAddressesSlice'

export const store = configureStore({
  reducer: {
    userToken:userSliceReducer,
    cart:cartSliceReducer,
    wishList:wishListSliceReducer,
    userOrders:ordersSliceReducer,
    userAddresses:userAddressesSliceReducer,
  },
})
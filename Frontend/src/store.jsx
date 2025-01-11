import { configureStore } from "@reduxjs/toolkit";
import profileReducer from './Slice'


 export const store = configureStore({

     reducer:{
      profile: profileReducer,
     }
   })
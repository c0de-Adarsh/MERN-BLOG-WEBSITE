import { configureStore } from "@reduxjs/toolkit";
import profileReducer from './slice'


 export const store = configureStore({

     reducer:{
      profile: profileReducer,
     }
   })
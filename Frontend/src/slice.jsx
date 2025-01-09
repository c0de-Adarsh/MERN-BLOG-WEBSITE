import {createSlice} from '@reduxjs/toolkit'


 const Profileslice = createSlice({
     name:'Profile',
     initialState:{
        user:false,
        regAlert:false,
        logAlert:false,
        logOutAlert:false,
        postDelAlert:false,
        userDelAlert:false,
        postCreAlert:false
     },
     reducers:{
        setUserTrue: (state)=>{
            state.user = true
        },
        setUserFalse: (state)=>{
            state.user = false
        },
        setRegAlertTrue: (state)=>{
            state.regAlert = true
        },
        setRegAlertFalse: (state)=>{
            state.regAlert = false
        },
        setLogAlertTrue: (state)=>{
            state.logAlert = true
        },
        setLogAlertFalse: (state)=>{
            state.logAlert = false
        },
        setPostDelAlertTrue: (state)=>{
            state.postDelAlert = true
        },
        setPostDelAlertFalse: (state)=>{
            state.postDelAlert = false
        },
        setPostCreAlertTrue: (state)=>{
            state.postCreAlert = false
        },
        setPostCreAlertFalse: (state)=>{
            state.postCreAlert = false
        }
     }
 })

 export const {
    setUserTrue,setUserFalse,setLogAlertTrue,setLogAlertFalse,setRegAlertTrue,setRegAlertFalse,setPostCreAlertTrue,setPostDelAlertFalse,setPostDelAlertTrue,setPostCreAlertFalse
 } = Profileslice.actions

 export default Profileslice.reducer;
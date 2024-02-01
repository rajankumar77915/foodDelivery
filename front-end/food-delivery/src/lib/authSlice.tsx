"use client";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    token:typeof window === 'object'
    ? localStorage?.getItem("token")?.replace(/"/g, "")
    : null,
    // token:getCookie('token'),
    signupData:null,
    loading:false,
  };

  export const authSlice=createSlice({
    name:'auth',
    initialState:initialState,
    reducers:{
        Settoken(state,value){
             state.token=value.payload;
             console.log("loding....",state.token)
        },
        SetsignupData(state,value){
            state.signupData=value.payload;
            console.log("signupdata ",state.signupData)
        },
        Setloading(state,value){
            state.loading=value.payload
        }
    }
  })


  export const {Settoken,SetsignupData,Setloading}= authSlice.actions;
  export default authSlice.reducer
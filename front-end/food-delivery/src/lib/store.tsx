"use client";
import { combineReducers, configureStore  } from "@reduxjs/toolkit";
import counterReducer from "./counterSlice";
import authSlice from "./authSlice";
import profileSlice from "./profileSlice"
import cartSlice from "./cartSlice";


const rootReducer = combineReducers({
  counter: counterReducer,
  auth:authSlice,
  profile: profileSlice,
  cart:cartSlice
  //add all your reducers here
},);

export const store = configureStore({
  reducer: rootReducer,

 });
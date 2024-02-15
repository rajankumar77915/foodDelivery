"use client";
import { combineReducers, configureStore  } from "@reduxjs/toolkit";
import counterReducer from "./counterSlice";
import authSlice from "./authSlice";
import profileSlice from "./profileSlice"
import cartSlice from "./cartSlice";
import foodSlice from "./foodSlice";
import viewCourseSlice from "./viewCourseSlice";


const rootReducer = combineReducers({
  counter: counterReducer,
  auth:authSlice,
  profile: profileSlice,
  cart:cartSlice,
  food:foodSlice,
  viewCourse:viewCourseSlice

  //add all your reducers here
},);

export const store = configureStore({
  reducer: rootReducer,

 });
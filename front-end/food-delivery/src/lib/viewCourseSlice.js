import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  foodSectionData: [],
  foodEntireData: [],
  completedLectures: [],
  totalNoOfLectures: 0,
}

const viewFoodSlice = createSlice({
  name: "viewFood",
  initialState,
  reducers: {
    setFoodSectionData: (state, action) => {
      state.foodSectionData = action.payload
    },
    setEntireFoodData: (state, action) => {
      state.foodEntireData = action.payload
    },
    setTotalNoOfLectures: (state, action) => {
      state.totalNoOfLectures = action.payload
    },
    setCompletedLectures: (state, action) => {
      state.completedLectures = action.payload
    },
    updateCompletedLectures: (state, action) => {
      state.completedLectures = [...state.completedLectures, action.payload]
    },
  },
})

export const {
  setFoodSectionData,
  setEntireFoodData,
  setTotalNoOfLectures,
  setCompletedLectures,
  updateCompletedLectures,
} = viewFoodSlice.actions

export default viewFoodSlice.reducer
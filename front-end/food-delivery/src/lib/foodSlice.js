import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  step: 1,
  food: null,
  editFood: false,
  paymentLoading: false,
  foodContent:{}
}

const foodSlice = createSlice({
  name: "food",
  initialState,
  reducers: {
    setStep: (state, action) => {
      state.step = action.payload
    },
    setFood: (state, action) => {
      state.food = action.payload
    },
    setEditFood: (state, action) => {
      state.editFood = action.payload
    },
    setPaymentLoading: (state, action) => {
      state.paymentLoading = action.payload
    },
    resetFoodState: (state) => {
      state.step = 1
      state.food = null
      state.editFood = false
    },
  },
})

export const {
  setStep,
  setFood,
  setEditFood,
  setPaymentLoading,
  resetFoodState,
} = foodSlice.actions

export default foodSlice.reducer
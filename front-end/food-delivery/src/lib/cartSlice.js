'use client'
import { createSlice } from "@reduxjs/toolkit"
import { toast } from "react-hot-toast"

const initialState = {
  cart:typeof window === 'object' && localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [],
  total:typeof window === 'object'&& localStorage.getItem("total") //price
    ? JSON.parse(localStorage.getItem("total"))
    : 0,
  totalItems: typeof window === 'object' && localStorage.getItem("totalItems")
    ? JSON.parse(localStorage.getItem("totalItems"))
    : 0,
}

 export const cartSlice= createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const food = action.payload
      const index = state.cart.findIndex((item) => item._id === food._id)
      if (index >= 0) {
        console.log("om")
        // If the food is already in the cart, do not modify the quantity
        toast.error("food already in cart")
        return
      }
      // If the food is not in the cart, add it to the cart
      state.cart.push(food)
      // Update the total qu antity and price
      state.totalItems++
      state.total += food.price
      // Update to localstorage
      localStorage.setItem("cart", JSON.stringify(state.cart))
      localStorage.setItem("total", JSON.stringify(state.total))
      localStorage.setItem("totalItems", JSON.stringify(state.totalItems))
      // show toast
      toast.success("food added to cart")
    },
    removeFromCart: (state, action) => {
      const foodId = action.payload
      const index = state.cart.findIndex((item) => item._id === foodId)

      if (index >= 0) {
        // If the food is found in the cart, remove it
        state.totalItems--
        state.total -= state.cart[index].price
        state.cart.splice(index, 1)
        // Update to localstorage
        localStorage.setItem("cart", JSON.stringify(state.cart))
        localStorage.setItem("total", JSON.stringify(state.total))
        localStorage.setItem("totalItems", JSON.stringify(state.totalItems))
        // show toast
        toast.success("food removed from cart")
      }
    },
    resetCart: (state) => {
      state.cart = []
      state.total = 0
      state.totalItems = 0
      // Update to localstorage
      localStorage.removeItem("cart")
      localStorage.removeItem("total")
      localStorage.removeItem("totalItems")
    },


    updateCartItemQuantity: (state, action) => {
      const { foodId, quantity } = action.payload;
      const index = state.cart.findIndex((item) => item._id === foodId);
    
      if (index >= 0) {
        // Update the quantity of the item in the cart
        state.cart[index].quantity = quantity;
    
        // Recalculate total and totalItems based on the updated quantity
        state.total = state.cart.reduce((acc, curr) => acc + curr.price * curr.quantity, 0);
        state.totalItems = state.cart.reduce((acc, curr) => acc + curr.quantity, 0);
    
        // Update localStorage
        localStorage.setItem("cart", JSON.stringify(state.cart));
        localStorage.setItem("total", JSON.stringify(state.total));
        localStorage.setItem("totalItems", JSON.stringify(state.totalItems));
      }
    }
  },
})

export const { addToCart, removeFromCart, resetCart,updateCartItemQuantity } = cartSlice
.actions

export default cartSlice.reducer
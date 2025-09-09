import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [], // each item = {id, name, price, quantity}
    totalQuantity: 0,
    totalPrice: 0,
  },
  reducers: {
    addItemToCart: (state, action) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        //vanilla(older) redux => don't mutate state ,and returning was mandatory
        //const newstate = {...state};
        // newstate.items.push(action.payload);
        //return newstate;

        //redux toolkit give us power to to direct muted state and we have to do this
        state.items.push({ ...action.payload, quantity: 1 });
      }
      // We use the spread operator to clone the item from action.payload and add quantity without mutating the original object.

      // If the item already exists in items, we increase its quantity.

// If it's a new item, we push it into items and add quantity: 1 using the spread operator to copy all other properties from action.payload.

// So quantity is not coming from the payload; it’s added by you when pushing a new item.

      state.totalQuantity += 1;
      state.totalPrice += action.payload.price;
    },

    removeItemFromCart: (state, action) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );

      if (existingItem) {
        if (existingItem.quantity > 1) {
          existingItem.quantity -= 1;
        } else {
          state.items = state.items.filter(
            (item) => item.id !== action.payload.id
          );
        }

        state.totalQuantity -= 1;
        state.totalPrice -= action.payload.price;
      }
    },

    clearCart: (state) => {
      // Clear all items and reset totals
      //state =[]
      //this update the local state directlt
      //to modify global object we return [] ,

      
      state.items = [];
     
      
      state.totalQuantity = 0;
      state.totalPrice = 0;
    },

    
  },
});

export const { addItemToCart, removeItemFromCart, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;

//here we export reducer not reducers 

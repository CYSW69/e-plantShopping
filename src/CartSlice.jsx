import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
  },
  reducers: {
    addItem: (state, action) => {
      const { name, image, cost } = action.payload || {};
      if (!name || !image || !cost) {
        console.error('Invalid payload for addItem:', action.payload);
        return;
      }
      const existingItem = state.items.find(item => item.name === name);
      if (existingItem) {
        existingItem.quantity++;
      } else {
        state.items.push({ name, image, cost, quantity: 1 });
      }
    },
    removeItem: (state, action) => {
      const name = action.payload;
      if (typeof name !== 'string') {
        console.error('Invalid payload for removeItem:', action.payload);
        return;
      }
      state.items = state.items.filter(item => item.name !== name);
    },
    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload || {};
      if (!name || typeof quantity !== 'number' || quantity < 0) {
        console.error('Invalid payload for updateQuantity:', action.payload);
        return;
      }
      const itemToUpdate = state.items.find(item => item.name === name);
      if (itemToUpdate) {
        itemToUpdate.quantity = quantity;
      } else {
        console.warn(`Item ${name} not found in cart`);
      }
    },
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

export default CartSlice.reducer;

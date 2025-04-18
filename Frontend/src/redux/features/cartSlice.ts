
import {  createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { IProduct } from "@/types/product";

export interface CartProduct extends IProduct {
  orderQuantity: number;
  stock: number

}

interface InitialState {
  products: CartProduct[];
  shippingAddress: string;
}

const initialState: InitialState = {
  products: [],
  shippingAddress: "",
};


const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct: (state, action) => {

      const productToAdd = state.products.find(
        (product) => product._id === action.payload._id
      );

      if (productToAdd) {
        productToAdd.orderQuantity += 1;
        return;
      }

      state.products.push({ ...action.payload, orderQuantity: 1 });
    },
    incrementOrderQuantity: (state, action) => {
      const productToIncrement = state.products.find(
        (product) => product._id === action.payload
      );

      if (productToIncrement) {
        productToIncrement.orderQuantity += 1;
        return;
      }
    },
    decrementOrderQuantity: (state, action) => {
      const productToIncrement = state.products.find(
        (product) => product._id === action.payload
      );

      if (productToIncrement && productToIncrement.orderQuantity > 1) {
        productToIncrement.orderQuantity -= 1;
        return;
      }
    },
    removeProduct: (state, action) => {
      state.products = state.products.filter(
        (product) => product._id !== action.payload
      );
    },

    updateShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
    },

    clearCart: (state) => {
      state.products = [];
      state.shippingAddress = "";
    },
  },
});

//* Products

export const orderedProductsSelector = (state: RootState) => {
  return state.cart.products;
};

export const orderSelector = (state: RootState) => {
  return {
    products: state.cart.products.map((product) => ({
      product: product._id,
      quantity: product.orderQuantity,
    })),
    shippingAddress: `${state.cart.shippingAddress} `,

    paymentMethod: "Online",
  };
};

export const shippingAddressSelector = (state: RootState) => {
  return state.cart.shippingAddress;
};

export const subTotalSelector = (state: RootState) =>
  state.cart.products.reduce((acc, product) => acc + product.price * product.orderQuantity, 0);

export const {
  addProduct,
  incrementOrderQuantity,
  decrementOrderQuantity,
  removeProduct,
  updateShippingAddress,
  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
// const cart =JSON.parse(localStorage.getItem("cart"));
export const sliceCart = createSlice({
    name: "cart",
    initialState: {
        dataCart: [],
    },
    reducers: {
        addToCartReducers: (state, action) => {
            const cart = action.payload;
            state.dataCart.push(cart);
        },
    },
});

const { actions, reducer } = sliceCart;
export const { addToCartReducers } = actions;
export default reducer;

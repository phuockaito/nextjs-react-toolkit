import { createSlice } from "@reduxjs/toolkit";
import { message, notification } from "antd";

const getCart = () => {
    if (typeof window !== "undefined") return JSON.parse(window.localStorage.getItem("cart")) || [];
};

export const sliceCart = createSlice({
    name: "cart",
    initialState: {
        dataCart: getCart(),
    },
    reducers: {
        addToCartReducers: (state, action) => {
            const { dataCart } = state;
            const { product, quantity } = action.payload;
            const sizeCart = action.payload.product.size;
            const fileIndex = (product, size, id) => {
                let result = -1;
                product.forEach((productCart, index) => {
                    if (productCart.product.size === size && productCart.product._id === id) {
                        result = index;
                    }
                });
                return result;
            };
            const index = fileIndex(dataCart, sizeCart, product._id);
            if (index !== -1) {
                if (dataCart[index].quantity < 5) {
                    if (quantity > 5) {
                        dataCart[index].quantity = 5;
                    } else {
                        let newQuantity = dataCart[index].quantity + quantity;
                        if (newQuantity > 5) {
                            dataCart[index].quantity = 5;
                        } else {
                            dataCart[index].quantity += quantity;
                        }
                    }
                    message.success("Cập nhật Số Lượng Thành Công", 2);
                } else {
                    notification["error"]({
                        message: "Thông báo",
                        description: "Bạn được phép thêm tối đa số lượng là 5",
                    });
                }
            } else {
                dataCart.unshift({
                    product,
                    quantity: quantity > 5 ? 5 : quantity,
                });
                message.success("Đã Thêm Vào Vỏ Hàng Thành Công", 2);
            }
            localStorage.setItem("cart", JSON.stringify(dataCart));
        },
        updateCartProduct: (state, action) => {
            const { dataCart } = state;
            const { index, quantity } = action.payload;
            const indexState = dataCart.findIndex((product, indexCart) => indexCart === index);
            if (indexState !== -1) {
                dataCart[indexState].quantity = quantity;
            }
            message.success("Cập Nhật Thành Công", 1.5);
            localStorage.setItem("cart", JSON.stringify(dataCart));
        },
        deleteCartProduct: (state, action) => {
            const { dataCart } = state;
            const index = action.payload;
            const indexState = dataCart.findIndex((product, indexCart) => indexCart === index);
            if (indexState !== -1) {
                dataCart.splice(indexState, 1);
            }
            message.success("Xóa Thành Công", 1.5);
            localStorage.setItem("cart", JSON.stringify(dataCart));
        },
    },
});

const { actions, reducer } = sliceCart;
export const { addToCartReducers, updateCartProduct, deleteCartProduct } = actions;
export default reducer;

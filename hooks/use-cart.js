import * as React from "react";

import { useSelector, useDispatch } from "react-redux";
import { addToCartReducers, updateCartProduct, deleteCartProduct } from "@/app/slices";
import { selectCart } from "@/selector";

export const useCart = () => {
    const dispatch = useDispatch();
    const storeCart = useSelector(selectCart);

    const handleAddToCartReducers = React.useCallback((product) => dispatch(addToCartReducers(product)), [dispatch]);
    const handleUpdateCartReducers = React.useCallback((product) => dispatch(updateCartProduct(product)), [dispatch]);
    const handleDeleteCartReducers = React.useCallback((index) => dispatch(deleteCartProduct(index)), [dispatch]);
    return { handleAddToCartReducers, handleUpdateCartReducers, handleDeleteCartReducers, storeCart };
};

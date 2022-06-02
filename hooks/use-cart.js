import * as React from "react";

import { useSelector, useDispatch } from "react-redux";
import { addToCartReducers } from "@/app/slices";
import { selectCart } from "@/selector";

export const useCart = () => {
    const dispatch = useDispatch();
    const storeCart = useSelector(selectCart);

    const handleAddToCartReducers = React.useCallback((product) => dispatch(addToCartReducers(product)), [dispatch]);
    return { handleAddToCartReducers, storeCart };
};

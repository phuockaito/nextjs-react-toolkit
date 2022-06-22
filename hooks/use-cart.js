import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import useSWR from "swr";

import { addToCartReducers, updateCartProduct, deleteCartProduct, getCartAPI, postCartAPI } from "@/app/slices";
import { selectCart } from "@/selector";

const options = { revalidateOnFocus: false, dedupingInterval: 60 * 60 * 1000 };

export const useCart = (props) => {
    const dispatch = useDispatch();
    const storeCart = useSelector(selectCart);

    const { data: dataCity } = useSWR("city", () =>
        fetcherCity("https://provinces.open-api.vn/api/p/", { ...options })
    );

    const { data: dataDistrict } = useSWR(
        ["district", props?.code_district],
        () => fetcherCity(`https://provinces.open-api.vn/api/p/${props?.code_district}?depth=2`),
        { ...options, revalidateOnMount: !!props?.code_district }
    );

    const { data: dataCommune } = useSWR(
        ["commune", props?.code_commune],
        () => fetcherCity(`https://provinces.open-api.vn/api/d/${props?.code_commune}?depth=2`),
        { ...options, revalidateOnMount: !!props?.code_commune }
    );

    const handleAddToCartReducers = React.useCallback((product) => dispatch(addToCartReducers(product)), [dispatch]);
    const handleUpdateCartReducers = React.useCallback((product) => dispatch(updateCartProduct(product)), [dispatch]);
    const handleDeleteCartReducers = React.useCallback((index) => dispatch(deleteCartProduct(index)), [dispatch]);
    const handlePostCart = React.useCallback((cart) => dispatch(postCartAPI(cart)), [dispatch]);
    const handlegetCart = React.useCallback(() => dispatch(getCartAPI()), [dispatch]);

    return {
        handleAddToCartReducers,
        handleUpdateCartReducers,
        handleDeleteCartReducers,
        handlePostCart,
        handlegetCart,
        storeCart,
        dataCity,
        dataDistrict,
        dataCommune,
    };
};

const fetcherCity = (url) => fetch(url).then((res) => res.json());

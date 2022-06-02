import { axiosClient } from "./axios-client";

export const apiProduct = {
    getProduct: (params) => {
        const url = "/products/get-product";
        return axiosClient.get(url, { params });
    },
    getProductById: (id) => {
        const url = `/products/get-one-product?id=${id}`;
        return axiosClient.get(url);
    },
    getProductNSX: (params) => {
        const url = "/products/nsx";
        return axiosClient.get(url, { params });
    },
    getProductType: (params) => {
        const url = "/products/type";
        return axiosClient.get(url, { params });
    },
};

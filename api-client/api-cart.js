import { axiosClient } from "./axios-client";

export const apiCart = {
    postCart: (data) => {
        const url = "/cart/add-cart";
        return axiosClient.post(url, data);
    },
    getCart: () => {
        const url = "/cart/get-cart";
        return axiosClient.get(url);
    },
    deleteCart: (id) => {
        const url = `/cart/delete-cart?id_cart=${id}`;
        return axiosClient.delete(url);
    },
};

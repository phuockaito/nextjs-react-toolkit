import { axiosClient } from "./axios-client";

export const apiCart = {
    postCart: (data) => {
        const url = "/cart/add-cart";
        return axiosClient.post(url, data);
    },
};

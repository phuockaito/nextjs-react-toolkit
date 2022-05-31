import { axiosClient } from "./axios-client";

export const apiMenu = {
    getMenu: () => {
        const url = "/menu";
        return axiosClient.get(url);
    },
};
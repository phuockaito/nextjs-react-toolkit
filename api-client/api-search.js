import { axiosClient } from "./axios-client";

export const apiSearch = {
    search: (params) => {
        const url = "search";
        return axiosClient.get(url, { params });
    },
};

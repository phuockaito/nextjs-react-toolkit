import { axiosClient } from "./axios-client";
export const apiAccount = {
    login: (data) => {
        const url = "user/login";
        return axiosClient.post(url, data);
    },
    getProfile: () => {
        const url = "user/profile";
        return axiosClient.get(url);
    },
    logout: () => {
        const url = "user/logout";
        return axiosClient.post(url);
    },
    register: (data) => {
        const url = "user/register";
        return axiosClient.post(url, data);
    }
};
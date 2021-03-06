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
        const url = "user/registers";
        return axiosClient.post(url, data);
    },
    googleLogin: (tokenId) => {
        const url = "user/google-login";
        return axiosClient.post(url, tokenId);
    },
    changePassword: (password) => {
        const url = "user/change-password";
        return axiosClient.post(url, password);
    },
};

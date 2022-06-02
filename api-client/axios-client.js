import axios from "axios";
import getConfig from "next/config";
import queryString from "query-string";
const { publicRuntimeConfig } = getConfig();

const hasWindow = () => {
    return typeof window === "object";
};

export const axiosClient = axios.create({
    baseURL: hasWindow() ? "/api" : publicRuntimeConfig.backendUrl + "/api",
    headers: {
        "Content-Type": "application/json",
    },
    paramsSerializer: (params) => queryString.stringify(params),
});

axiosClient.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => Promise.reject(error)
);

axiosClient.interceptors.response.use(
    (response) => {
        if (response && response.data) {
            return response.data;
        }
        return response;
    },
    (error) => {
        throw error;
    }
);

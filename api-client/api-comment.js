import { axiosClient } from "./axios-client";

export const apiComment = {
    getCommentProductId: (params) => {
        const url = "comments/get-comments";
        return axiosClient.get(url, { params });
    },
    postComment: (payload) => {
        const url = "comments/create-comments";
        return axiosClient.post(url, payload);
    },
};

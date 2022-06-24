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
    deleteComment: (params) => {
        const url = "comments/delete-comments";
        return axiosClient.delete(url, { params });
    },
    updateComment: (payload) => {
        const url = "comments/update-comments";
        return axiosClient.put(url, payload);
    },
};

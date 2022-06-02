import useSWR from "swr";

export const useComment = (url) => {
    const { data } = useSWR(url);

    return {
        dataComment: data,
    };
};

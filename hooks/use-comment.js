import * as React from 'react';
import useSWR from "swr";

export const useComment = (url) => {
    const { data } = useSWR(url);
    const [dataComment, setDataComment] = React.useState(data);

    React.useEffect(() => {
        if (data) {
            setDataComment(data);
        };
    }, [data]);
    return {
        dataComment
    };
};

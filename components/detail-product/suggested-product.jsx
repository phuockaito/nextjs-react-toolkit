import * as React from "react";
import useSWR from "swr";

import { WrapperCard, Section } from "@/layout";
import { apiProduct } from "@/api-client";

export const SuggestedProduct = ({ keyword, id }) => {
    const { data: dataSuggested } = useSWR(
        "get-suggested-keyword",
        () =>
            apiProduct.getProductType({
                items: 9,
                name: keyword,
                page: 1,
                sort_price: 0,
            }),
        {
            revalidateOnFocus: false,
            dedupingInterval: 60 * 60 * 1000,
        }
    );

    const filterData = dataSuggested?.data.filter((item) => item._id !== id);
    return (
        <React.Fragment>
            <WrapperCard data={filterData} title="Sản phẩm tương tự" />
        </React.Fragment>
    );
};

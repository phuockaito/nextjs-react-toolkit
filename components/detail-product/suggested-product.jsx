import * as React from "react";
import useSWR from "swr";

import { WrapperCard, Section } from "@/layout";
import { apiProduct } from "@/api-client";

export const SuggestedProduct = ({ keyword }) => {
    const { data: dataSuggested } = useSWR("get-suggested-keyword", () =>
        apiProduct.getProductType({
            items: 8,
            name: keyword,
            page: 1,
            sort_price: 0,
        })
    );
    return (
        <React.Fragment>
            <WrapperCard data={dataSuggested?.data} title="Sản phẩm tương tự" />
        </React.Fragment>
    );
};

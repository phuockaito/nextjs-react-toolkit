import * as React from "react";

import { apiProduct } from "@/api-client";
import { Header } from "@/components";
import { MetaTag } from "@/customize";
import { Pagination, WrapperCard } from "@/layout";

import { defaultURL, defaultDescription, defaultContent, defaultThumbnail, defaultKeyword } from "const";

const ProductType = ({ dataType, title, type, page, pagination, sort_price }) => {
    return (
        <React.Fragment>
            <MetaTag
                resolvedUrl={defaultURL}
                title={title.replace(/\w\S*/g, (w) => w.replace(/^\w/, (c) => c.toUpperCase()))}
                description={defaultDescription}
                content={defaultContent}
                thumbnail={defaultThumbnail}
                keywords={defaultKeyword}
                isDefault
            />
            <WrapperCard
                data={dataType}
                title={title}
                is_sort_price
                sort_price={sort_price}
                pathname="/product/[type]"
                url_page="type"
                titleParams={type}
                page={page}
            >
                <Pagination
                    pagination={pagination}
                    pathname="/product/[type]"
                    title={type}
                    page={page}
                    url_page="type"
                    sort_price={sort_price}
                />
            </WrapperCard>
        </React.Fragment>
    );
};
export default ProductType;
ProductType.getLayout = (page) => <Header>{page}</Header>;

export const getServerSideProps = async (context) => {
    context.res.setHeader("Cache-Control", "s-maxage=5,stale-while-revalidate=5");

    const { params, query } = context;
    const page = query._page || 1;
    const sort_price = query._sort_price || "0";
    const limit = 8;

    const { data, length } = await apiProduct.getProductNSX({
        items: limit,
        nsx: params.type,
        page: page,
        sort_price: sort_price,
    });
    const pagination = Number(Math.floor(length / limit)) + (length % limit == 0 ? 0 : 1);

    return {
        props: {
            dataType: data,
            type: params.type,
            title: params.type.replace(/-/g, " "),
            page: Number(page),
            pagination: pagination,
            sort_price: sort_price,
        },
    };
};

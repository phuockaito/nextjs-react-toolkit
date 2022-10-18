import * as React from "react";
import { Header } from "@/components";

import { apiSearch } from "@/api-client";
import { Pagination, WrapperCard } from "@/layout";
import { MetaTag } from "@/customize";
import { defaultURL, defaultDescription, defaultContent, defaultThumbnail, defaultKeyword } from "const";

const Search = ({ dataSearch, keyword, page, pagination }) => {
    const query = keyword.replace(/\w\S*/g, (w) => w.replace(/^\w/, (c) => c.toUpperCase()));
    return (
        <>
            <MetaTag
                resolvedUrl={`${defaultURL}/search/${query.replace(/\s/g, "-")}`}
                title={keyword.replace(/\w\S*/g, (w) => w.replace(/^\w/, (c) => c.toUpperCase()))}
                description={defaultDescription}
                content={defaultContent}
                thumbnail={defaultThumbnail}
                keywords={defaultKeyword}
                isDefault
            />
            <WrapperCard
                data={dataSearch}
                title={keyword}
                pathname="/search/[keyword]"
                url_page="key"
                titleParams={keyword}
                page={page}
            >
                <Pagination
                    pagination={pagination}
                    pathname="/search/[keyword]"
                    title={keyword}
                    page={page}
                    url_page="keyword"
                />
            </WrapperCard>
        </>
    );
};

export default Search;

Search.getLayout = (page) => <Header>{page}</Header>;

export const getServerSideProps = async (context) => {
    context.res.setHeader("Cache-Control", "s-maxage=59,stale-while-revalidate=59");

    const { query } = context;

    const page = query._page || 1;
    const limit = 8;

    const { data, lengthProducts } = await apiSearch.search({
        items: limit,
        keyword: query.keyword.replace(/-/g, " "),
        page: page,
    });
    const pagination = Number(Math.floor(lengthProducts / limit)) + (lengthProducts % limit == 0 ? 0 : 1);

    return {
        props: {
            dataSearch: data,
            keyword: query.keyword.replace(/-/g, " "),
            page: Number(page),
            pagination: pagination,
        },
    };
};

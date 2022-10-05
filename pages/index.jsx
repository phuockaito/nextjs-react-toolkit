import { useSelector } from "react-redux";

import { apiProduct } from "@/api-client";
import { MetaTag } from "@/customize";
import { Header } from "@/components";
import { WrapperCard } from "@/layout";
import { selectProfile } from "@/selector";

import { defaultURL, defaultTile, defaultDescription, defaultContent, defaultThumbnail, defaultKeyword } from "const";

export default function Home({ productNew, productType, productSlider }) {
    const profile = useSelector(selectProfile);
    return (
        <>
            <MetaTag
                resolvedUrl={defaultURL}
                title={defaultTile}
                description={defaultDescription}
                content={defaultContent}
                thumbnail={defaultThumbnail}
                keywords={defaultKeyword}
                isDefault
            />
            <WrapperCard data={productType} title="Dành riêng cho bạn" />
            <WrapperCard data={productNew} title="Giầy mới nhất" />
            <WrapperCard data={productSlider} title="Khuyến mãi hót nhất" />
        </>
    );
}

Home.getLayout = (page) => <Header>{page}</Header>;

export const getStaticProps = async () => {
    const { product } = await apiProduct.getProduct({ limit: 8 });

    const product_type = await apiProduct.getProductType({
        items: 8,
        name: "puma",
        page: 1,
        sort_price: 0,
    });
    const product_slider = await apiProduct.getProductType({
        limit: 8,
        name: "converse",
        sort_price: 0,
    });

    return {
        props: {
            productNew: product.map((item) => ({
                _id: item._id,
                poster: item.poster,
                price: item.price,
                collections: item.collections,
                name: item.name,
                rating: item.rating,
                numReviews: item.numReviews,
            })),
            productType: product_type.data.map((item) => ({
                _id: item._id,
                poster: item.poster,
                price: item.price,
                collections: item.collections,
                name: item.name,
                rating: item.rating,
                numReviews: item.numReviews,
            })),
            productSlider: product_slider.data.map((item) => ({
                _id: item._id,
                poster: item.poster,
                price: item.price,
                collections: item.collections,
                name: item.name,
                rating: item.rating,
                numReviews: item.numReviews,
            })),
        },
        revalidate: 10,
    };
};

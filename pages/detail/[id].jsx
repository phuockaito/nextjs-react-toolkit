import * as React from "react";
import { useRouter } from "next/router";
import NumberFormat from "react-number-format";
import clsx from "clsx";
import { message } from "antd";
import useSWR from "swr";
import NoSSR from "react-no-ssr";

import { apiProduct } from "@/api-client";
import { MetaTag, Image, LinkHref } from "@/customize";
import { Section, WrapperCard } from "@/layout";
import { WrapperComment, Header, SuggestedProduct } from "@/components";

import { AiFillStar } from "react-icons/ai";
import { BiChevronRight } from "react-icons/bi";
import { useComment, useCart } from "@/hooks";

const DetailId = ({ data, productPropose, id, suggested_keyword }) => {
    const router = useRouter();
    const _page_comment = router.query?._page_comment || 1;

    const [poster, setPoster] = React.useState(0);
    const [size, setSize] = React.useState(null);
    const { dataComment } = useComment(`comments/get-comments?_id_product=${id}&page=${_page_comment}`);

    const { handleAddToCartReducers } = useCart();

    const createMarkup = () => {
        return { __html: data.description };
    };

    return (
        <React.Fragment>
            <MetaTag
                title={`${data.name}`}
                description={`${data.name} | ${data.collections}`}
                content={`${data.name}`}
                thumbnail={data.poster[0].url}
                keywords={data.name}
            />
            <div className="flex items-center">
                <LinkHref
                    href="/"
                    className="font-medium capitalize text-[#4058ff] hover:text-[#4058ff] hover:underline"
                >
                    Home
                </LinkHref>
                <BiChevronRight className="text-[#404042]" />

                <LinkHref
                    href={`/trademark/${data.key}`}
                    className="font-light capitalize text-[#404042] hover:text-[#4058ff] hover:underline"
                >
                    {data.key}
                </LinkHref>
                <BiChevronRight className="text-[#404042]" />
                <p className="font-light capitalize text-[#404042]">{data.name}</p>
            </div>
            <Section className="flex flex-col gap-3 p-5 lg:flex-row ">
                <div className="basis-[60%]">
                    <div className="flex gap-4">
                        <div className="flex flex-1 flex-col gap-2">
                            <div>
                                <h3 className="text-xl font-semibold capitalize text-[#212427]">
                                    Thông tin sản phẩm
                                    <span className="ml-1 font-light" />
                                </h3>
                                <p className="font-light">
                                    Nhà xản xuất:
                                    <span className="ml-1 font-light">{data.key}</span>
                                </p>
                                <p className="font-light">
                                    Bộ sưu tập:
                                    <span className="ml-1 font-light">{data.collections}</span>
                                </p>
                                <p className="font-light">
                                    Loại sản phẩm:
                                    <span className="ml-1 font-light">{data.productType}</span>
                                </p>
                                <p className="font-light">
                                    Dòng sản phẩm:
                                    <span className="ml-1 font-light">{data.NSX}</span>
                                </p>
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold capitalize text-[#212427]">
                                    Mô Tả Sản Phẩm
                                    <span className="material-symbols-outlined" />
                                </h3>
                                <div dangerouslySetInnerHTML={createMarkup()} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex basis-[40%] items-center gap-3">
                    <div className="flex flex-col gap-4">
                        {data.poster.map((image, index) => (
                            <Image
                                onClick={() => setPoster(index)}
                                key={image.id}
                                className="flex h-20 w-20 cursor-pointer"
                                alt={image.name}
                                src={image.url}
                            />
                        ))}
                    </div>
                    <div className="flex w-full flex-col gap-3">
                        <div className="flex w-full flex-col items-center">
                            <h1 className="mb-4 w-full rounded bg-[#4058ff] p-2 text-center text-xl font-semibold capitalize text-white">
                                {data.name}
                            </h1>
                            <div className="flex w-full items-center justify-center">
                                <div className="flex basis-11/12 flex-col items-center justify-center">
                                    <Image
                                        alt={data.poster[poster].url}
                                        className="h-[320px] w-[320px]"
                                        src={data.poster[poster].url}
                                    />
                                </div>
                                <div className="flex basis-1 flex-col gap-2">
                                    <h5>Size</h5>
                                    {data.size.map((sz) => (
                                        <p
                                            key={sz}
                                            className={clsx(
                                                "flex h-6 w-6 cursor-pointer items-center justify-center rounded p-1 text-white hover:bg-[#4058ff]",
                                                Number(size) === Number(sz) ? "bg-[#4058ff]" : "bg-[#ff8b05]"
                                            )}
                                            onClick={() => setSize(sz)}
                                        >
                                            {sz}
                                        </p>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="flex w-full items-center justify-between">
                            <h3 className=" flex gap-1 font-semibold text-[#212427]">
                                Price:
                                <span className="text-[red]">
                                    <NumberFormat value={data.price} displayType={"text"} thousandSeparator={true} />
                                </span>
                                <p>đ</p>
                            </h3>
                            <button
                                className="rounded-[0.25rem] border border-[#212427] bg-[#212427] px-2 py-1 font-light text-white hover:bg-white hover:text-[#212427]"
                                onClick={() => {
                                    if (size) {
                                        handleAddToCartReducers({
                                            product: {
                                                _id: data._id,
                                                name: data.name,
                                                image: data.poster[0].url,
                                                price: data.price,
                                                key: data.key,
                                                NSX: data.NSX,
                                                collections: data.collections,
                                            },
                                            quantily: size,
                                        });
                                    } else {
                                        message.error("Vui lòng chọn size");
                                    }
                                }}
                            >
                                Add to card
                            </button>
                        </div>
                        <div className="flex w-full place-items-center gap-2 divide-x-2">
                            <span className="basis-4/12 text-center text-[0.9rem] text-slate-600">
                                {data.numReviews > 0 ? `${data.numReviews} đánh giá` : "Chưa có đánh giá"}
                            </span>
                            <span className="basis-4/12 text-center text-[0.9rem] text-slate-600">
                                {dataComment && dataComment.length > 0
                                    ? `${dataComment.length} phản hồi`
                                    : "Chưa có phản hồi"}
                            </span>
                            <div className="flex basis-4/12 items-center justify-center gap-1 text-center">
                                <AiFillStar className="text-[#ff8b05]" />
                                <p className="flex gap-1 text-[0.9rem] text-slate-600">
                                    {data.rating > 0 ? (data.rating / data.numReviews).toFixed(1) : 0}
                                    <span>/ 5</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </Section>
            <NoSSR>
                <WrapperComment dataComment={dataComment} _page_comment={_page_comment} id_product={data._id} />
                <SuggestedProduct keyword={suggested_keyword} />
            </NoSSR>
        </React.Fragment>
    );
};

export default DetailId;
DetailId.getLayout = (page) => <Header>{page}</Header>;

export const getStaticProps = async (context) => {
    const { params } = context;
    const { product } = await apiProduct.getProductById(params.id);
    return {
        props: {
            data: product,
            suggested_keyword: product.key,
            id: params.id,
        },
        revalidate: 5,
    };
};

export const getStaticPaths = async () => {
    return {
        paths: [],
        fallback: "blocking",
    };
};
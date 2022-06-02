import * as React from "react";
import { useRouter } from "next/router";
import NumberFormat from "react-number-format";
import clsx from "clsx";
import { message } from "antd";

import { apiProduct } from "@/api-client";
import { MetaTag, Image, LinkHref } from "@/customize";
import { Section, WrapperCard } from "@/layout";
import { WrapperComment, Header } from "@/components";

import { AiFillStar } from "react-icons/ai";
import { BiChevronRight } from "react-icons/bi";
import { useComment, useCart } from "@/hooks";

const DetailId = ({ data, productPropose, id }) => {
    const router = useRouter();
    const _page_comment = router.query?._page_comment || 1;

    const [poster, setPoster] = React.useState(0);
    const [size, setSize] = React.useState(null);
    const { dataComment } = useComment(`comments/get-comments?_id_product=${id}&page=${_page_comment}`);
    const { handleAddToCartReducers } = useCart();
    console.log("size", size);

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
                    className="capitalize text-[#4058ff] hover:text-[#4058ff] hover:underline font-medium"
                >
                    Home
                </LinkHref>
                <BiChevronRight className="text-[#404042]" />

                <LinkHref
                    href={`/trademark/${data.key}`}
                    className="capitalize text-[#404042] font-light hover:text-[#4058ff] hover:underline"
                >
                    {data.key}
                </LinkHref>
                <BiChevronRight className="text-[#404042]" />
                <p className="capitalize text-[#404042] font-light">{data.name}</p>
            </div>
            <Section className="flex p-5 gap-3 lg:flex-row flex-col ">
                <div className="basis-[60%]">
                    <div className="flex gap-4">
                        <div className="flex-1 flex flex-col gap-2">
                            <div>
                                <h3 className="text-xl font-semibold text-[#212427] capitalize">
                                    Thông tin sản phẩm
                                    <span className="font-light ml-1" />
                                </h3>
                                <p className="font-light">
                                    Nhà xản xuất:
                                    <span className="font-light ml-1">{data.key}</span>
                                </p>
                                <p className="font-light">
                                    Bộ sưu tập:
                                    <span className="font-light ml-1">{data.collections}</span>
                                </p>
                                <p className="font-light">
                                    Loại sản phẩm:
                                    <span className="font-light ml-1">{data.productType}</span>
                                </p>
                                <p className="font-light">
                                    Dòng sản phẩm:
                                    <span className="font-light ml-1">{data.NSX}</span>
                                </p>
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold text-[#212427] capitalize">
                                    Mô Tả Sản Phẩm
                                    <span className="material-symbols-outlined" />
                                </h3>
                                <div dangerouslySetInnerHTML={createMarkup()} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="basis-[40%] flex items-center gap-3">
                    <div className="flex flex-col gap-4">
                        {data.poster.map((image, index) => (
                            <Image
                                onClick={() => setPoster(index)}
                                key={image.id}
                                className="cursor-pointer w-20 h-20 flex"
                                alt={image.name}
                                src={image.url}
                            />
                        ))}
                    </div>
                    <div className="flex flex-col gap-3 w-full">
                        <div className="flex flex-col w-full items-center">
                            <h1 className="text-xl font-semibold capitalize p-2 bg-[#4058ff] w-full text-center text-white rounded mb-4">
                                {data.name}
                            </h1>
                            <div className="flex w-full items-center justify-center">
                                <div className="basis-11/12 flex justify-center items-center flex-col">
                                    <Image
                                        alt={data.poster[poster].url}
                                        className="w-[320px] h-[320px]"
                                        src={data.poster[poster].url}
                                    />
                                </div>
                                <div className="flex gap-2 flex-col basis-1">
                                    <h5>Size</h5>
                                    {data.size.map((sz) => (
                                        <p
                                            key={sz}
                                            className={clsx(
                                                "cursor-pointer w-6 h-6 flex items-center justify-center p-1 rounded text-white hover:bg-[#4058ff]",
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
                        <div className="flex justify-between w-full items-center">
                            <h3 className=" font-semibold flex gap-1 text-[#212427]">
                                Price:
                                <span className="text-[red]">
                                    <NumberFormat value={data.price} displayType={"text"} thousandSeparator={true} />
                                </span>
                                <p>đ</p>
                            </h3>
                            <button
                                className="bg-[#212427] border border-[#212427] text-white hover:text-[#212427] hover:bg-white px-2 py-1 font-light rounded-[0.25rem]"
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
                        <div className="flex divide-x-2 gap-2 w-full place-items-center">
                            <span className="text-slate-600 text-[0.9rem] basis-4/12 text-center">
                                {data.numReviews > 0 ? `${data.numReviews} đánh giá` : "Chưa có đánh giá"}
                            </span>
                            <span className="text-slate-600 text-[0.9rem] basis-4/12 text-center">
                                {dataComment && dataComment.length > 0
                                    ? `${dataComment.length} phản hồi`
                                    : "Chưa có phản hồi"}
                            </span>
                            <div className="flex items-center gap-1 basis-4/12 text-center justify-center">
                                <AiFillStar className="text-[#ff8b05]" />
                                <p className="text-slate-600 flex gap-1 text-[0.9rem]">
                                    {data.rating > 0 ? (data.rating / data.numReviews).toFixed(1) : 0}
                                    <span>/ 5</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </Section>
            {dataComment ? (
                <WrapperComment
                    dataComment={dataComment.data}
                    count_comments={dataComment.length}
                    _id_product={data._id}
                    _page_comment={_page_comment}
                />
            ) : (
                <Section>
                    <h6>Loading...</h6>
                </Section>
            )}
            <WrapperCard data={productPropose} title="Sản phẩm tương tự" />
        </React.Fragment>
    );
};

export default DetailId;
DetailId.getLayout = (page) => <Header>{page}</Header>;

export const getStaticProps = async (context) => {
    const { params } = context;
    const { product } = await apiProduct.getProductById(params.id);
    const product_propose = await apiProduct.getProductType({
        items: 8,
        name: product.key,
        page: 1,
        sort_price: 0,
    });

    return {
        props: {
            data: product,
            productPropose: product_propose.data,
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

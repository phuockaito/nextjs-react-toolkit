import { Image as ImageAntd } from "antd";
import clsx from "clsx";
import Image from "next/image";
import { useRouter } from "next/router";
import NumberFormat from "react-number-format";

import { filterPrice } from "@/const";
import { LinkHref } from "@/customize";
import { Section, Coating } from ".";
import { usePreviewImage } from "@/hooks";
import { AiFillStar } from "react-icons/ai";

export const WrapperCard = ({
    title,
    data,
    className,
    children,
    is_sort_price,
    sort_price,
    url_page,
    page,
    pathname,
    titleParams,
}) => {
    const router = useRouter();
    const { previewImage, setImage, setPreviewImage, image } = usePreviewImage();

    return (
        <>
            <Section className={className}>
                <div className="mb-4 flex justify-between">
                    {data && <h1 className="text-xl font-semibold capitalize text-[#212427]">{title}</h1>}
                    {is_sort_price && (
                        <div className="flex gap-1">
                            {filterPrice.map((item) => (
                                <button
                                    key={item.value}
                                    className={clsx(
                                        "px-1 text-[0.9rem] font-normal",
                                        item.value === sort_price
                                            ? "rounded-[0.25rem] bg-[#4058ff] px-1 text-white"
                                            : "text-[#6e6d7a] hover:text-[#4058ff]"
                                    )}
                                    onClick={() => {
                                        router.push({
                                            pathname: pathname,
                                            query: {
                                                _page: page,
                                                _sort_price: item.value,
                                                [url_page]: titleParams,
                                            },
                                        });
                                    }}
                                >
                                    {item.title}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
                <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
                    {data ? (
                        data.map((item) => (
                            <div key={item._id} className="rounded border border-[#e8dfec] p-4" data-aos="zoom-in">
                                {item.rating > 0 ? (
                                    <div className="flex items-center gap-1">

                                        <AiFillStar className="text-[#fadb14]" />
                                        <p className="flex gap-1 text-[0.9rem] text-slate-500">
                                            {(item.rating / item.numReviews).toFixed(1)}
                                            <span>/ 5</span>
                                        </p>
                                    </div>
                                ) : (
                                    <p className="flex items-center gap-1 truncate text-[0.9rem] text-slate-500">
                                        <AiFillStar className="text-[#fadb14]" />
                                        Chưa có đánh giá
                                    </p>
                                )}
                                <LinkHref href={`/detail/${item._id}`}>
                                    <h2 className="mb-2 truncate text-[1.1rem] font-semibold capitalize text-slate-800">
                                        {item.name}
                                    </h2>
                                    <div className="text-center">
                                        <Image
                                            src={item.poster[0].url}
                                            className="hover:scale- 110 rounded transition duration-300 ease-in-out"
                                            alt={item.name}
                                            width={250}
                                            height={230}
                                        />
                                    </div>
                                </LinkHref>
                                <div className="flex items-center justify-between gap-2">
                                    <div>
                                        <p className="text-[0.85rem] text-slate-500">Giá bán</p>
                                        <h6 className="flex gap-[1px] text-[1.2rem] font-semibold text-[#ec1839]">
                                            <NumberFormat
                                                value={item.price}
                                                displayType={"text"}
                                                thousandSeparator={true}
                                            />
                                            <span>đ</span>
                                        </h6>
                                    </div>
                                    <div className="flex gap-2">
                                        {item.poster.slice(0, 2).map((img) => (
                                            <div
                                                onClick={() => setPreviewImage(item.poster)}
                                                className="flex cursor-pointer rounded border border-[#e8dfec]"
                                                key={img.url}
                                            >
                                                <Image
                                                    src={img.url}
                                                    className="flex rounded border border-[#e8dfec]"
                                                    alt={img.url}
                                                    width={40}
                                                    height={40}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <>
                            {[...Array(8)].map((_, index) => (
                                <div
                                    className="h-[355px] w-[280px] animate-pulse rounded-md bg-slate-300"
                                    key={index.toString()}
                                />
                            ))}
                        </>
                    )}
                </div>

                {children}
            </Section>
            {previewImage && (
                <div className="fixed top-0 left-0 z-20 flex h-full w-full items-center justify-center">
                    <div className="z-10">
                        <Image
                            src={previewImage[image].url}
                            className="rounded transition duration-300 ease-in-out hover:scale-110"
                            alt={previewImage[image].url}
                            width={500}
                            height={500}
                        />
                        <div className="mt-2 flex justify-center gap-4">
                            {previewImage.map((item, index) => (
                                <div key={item.url} className={index === image && "scale-110"}>
                                    <Image
                                        onClick={() => setImage(index)}
                                        src={item.url}
                                        className="flex cursor-pointer rounded"
                                        alt={item.url}
                                        width={80}
                                        height={80}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                    <Coating onClick={() => setPreviewImage(null)} />
                </div>
            )}
        </>
    );
};

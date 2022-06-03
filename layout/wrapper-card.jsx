import { Image as ImageAntd } from "antd";
import clsx from "clsx";
import Image from "next/image";
import { useRouter } from "next/router";
import NumberFormat from "react-number-format";

import { filterPrice } from "@/const";
import { LinkHref } from "@/customize";
import { Section } from ".";

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


    return (
        <Section className={className}>
            <div className="mb-4 flex justify-between">
                <h1 className="text-xl font-semibold capitalize text-[#212427]">{title}</h1>
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
                {data &&
                    data.map((item) => (
                        <div key={item._id} className="rounded border border-[#e8dfec] p-4" data-aos="zoom-in">
                            {item.rating > 0 ? (
                                <div className="flex items-center gap-1">
                                    <AiFillStar className="text-[#ff8b05]" />
                                    <p className="flex gap-1 text-[0.9rem] text-slate-500">
                                        {(item.rating / item.numReviews).toFixed(1)}
                                        <span>/ 5</span>
                                    </p>
                                </div>
                            ) : (
                                <p className="flex items-center gap-1 truncate text-[0.9rem] text-slate-500">
                                    <AiFillStar className="text-[#ff8b05]" />
                                    Chưa có đánh giá
                                </p>
                            )}
                            <LinkHref href={`/${item._id}`}>
                                <h2 className="truncate text-[1.1rem] font-semibold capitalize text-slate-800">
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
                                    <ImageAntd.PreviewGroup>
                                        {item.poster.map((img) => (
                                            <ImageAntd width={35} src={img.url} key={img.url} />
                                        ))}
                                    </ImageAntd.PreviewGroup>
                                </div>
                            </div>
                        </div>
                    ))}
            </div>
            {children}
        </Section>
    );
};

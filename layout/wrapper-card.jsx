import NumberFormat from "react-number-format";
import Image from "next/image";
import clsx from "clsx";
import { useRouter } from "next/router";

import { LinkHref } from "@/customize";
import { usePreviewImage } from "@/hooks";
import { Coating, Section } from ".";
import { filterPrice } from "@/const";

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
    const { previewImage, setImage, setPreviewImage, image } =
        usePreviewImage();

    return (
        <Section className={className}>
            <div className="flex justify-between mb-4">
                <h1 className="text-xl font-semibold text-[#212427] capitalize">
                    {title}
                </h1>
                {is_sort_price && (
                    <div className="flex gap-1">
                        {filterPrice.map((item) => (
                            <button
                                key={item.value}
                                className={clsx(
                                    "font-normal px-1 text-[0.9rem]",
                                    item.value === sort_price
                                        ? "bg-[#4058ff] rounded-[0.25rem] text-white px-1"
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
            <div className="grid xl:grid-cols-4 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-4">
                {data&&data.map((item) => (
                    <div
                        key={item._id}
                        className="border-[#e8dfec] border rounded p-4"
                        data-aos="zoom-in"
                    >
                        {item.rating > 0 ? (
                            <div className="flex items-center gap-1">
                                <AiFillStar className="text-[#ff8b05]" />
                                <p className="text-slate-500 flex gap-1 text-[0.9rem]">
                                    {(item.rating / item.numReviews).toFixed(1)}
                                    <span>/ 5</span>
                                </p>
                            </div>
                        ) : (
                            <p className="truncate text-slate-500 flex items-center gap-1 text-[0.9rem]">
                                <AiFillStar className="text-[#ff8b05]" />
                                Chưa có đánh giá
                            </p>
                        )}
                        <LinkHref href={`/${item._id}`}>
                            <h2 className="capitalize truncate font-semibold text-slate-800 text-[1.1rem]">
                                {item.name}
                            </h2>
                            <Image
                                src={item.poster[0].url}
                                className="rounded transition duration-300 ease-in-out hover:scale-110"
                                alt={item.name}
                                width={250}
                                height={230}
                            />
                        </LinkHref>
                        <div className="flex gap-2 items-center justify-between">
                            <div>
                                <p className="text-slate-500 text-[0.85rem]">
                                    Giá bán
                                </p>
                                <h6 className="flex gap-[1px] font-semibold text-[#ec1839] text-[1.2rem]">
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
                                        onClick={() =>
                                            setPreviewImage(item.poster)
                                        }
                                        className="border-[#e8dfec] border rounded cursor-pointer flex"
                                        key={img.url}
                                    >
                                        <Image
                                            src={img.url}
                                            className="border-[#e8dfec] border rounded flex"
                                            alt={img.url}
                                            width={40}
                                            height={40}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {previewImage && (
                <div className="flex items-center justify-center fixed w-full h-full top-0 left-0 z-20">
                    <div className="z-10">
                        <Image
                            src={previewImage[image].url}
                            className="rounded transition duration-300 ease-in-out hover:scale-110"
                            alt={previewImage[image].url}
                            width={500}
                            height={500}
                        />
                        <div className="flex justify-center gap-4 mt-2">
                            {previewImage.map((item, index) => (
                                <div
                                    key={item.url}
                                    className={index === image && "scale-110"}
                                >
                                    <Image
                                        onClick={() => setImage(index)}
                                        src={item.url}
                                        className="rounded flex cursor-pointer"
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
            {children}
        </Section>
    );
};

import Image from "next/image";
import moment from "moment";

import { LinkHref } from "customize";
import { Section } from "./section";
import { WrapperCarousel } from "layout";

import { AiFillStar } from "react-icons/ai";
import { FcLike } from "react-icons/fc";
import { IMG_API } from "const";

export const CardMovie = ({ data, title, time }) => {
    return (
        <Section className="my-2">
            <h2 className="text-3xl font-semibold my-2 text-[#fefdff]">
                {title}
            </h2>
            <WrapperCarousel
                slidesPerView={8}
                spacingPerView={12}
                snapMode="free-snap"
                // autoplay
                time={time}
            >
                {data.map((item) => (
                    <div key={item.id} className="keen-slider__slide">
                        <LinkHref href={`/${item.id}`}>
                            <Image
                                src={`${IMG_API}${item.poster_path}`}
                                className="rounded transition duration-300 ease-in-out hover:scale-105"
                                alt={item.title}
                                width={280}
                                height={386}
                            />
                            <div className="text-left">
                                <h1 className="text-[#fefdff] font-semibold sm:text-lg text-[14px] truncate">
                                    {item.title || item.name}
                                </h1>
                                <div className="flex gap-1 items-center justify-between">
                                    <h3 className="flex gap-1 items-center">
                                        <AiFillStar className="text-amber-400 sm:text-base text-[14px]" />
                                        <p className="sm:text-base text-[13px] text-amber-400">
                                            {item.vote_average}
                                        </p>
                                    </h3>
                                    <h3 className="flex gap-1 items-center">
                                        <FcLike className="sm:text-base text-[13px]" />
                                        <p className="sm:text-base text-[13px] text-[#fefdff]">
                                            {item.vote_count}
                                        </p>
                                    </h3>
                                </div>
                                <h4 className="text-slate-300 flex gap-2 items-center sm:text-base text-[13px]">
                                    <p className="sm:text-base text-[13px]">
                                        {moment(
                                            item.release_date ||
                                                item.first_air_date
                                        ).format("ll")}
                                    </p>
                                </h4>
                            </div>
                        </LinkHref>
                    </div>
                ))}
            </WrapperCarousel>
        </Section>
    );
};

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
            <h2 className="my-2 text-3xl font-semibold text-[#fefdff]">{title}</h2>
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
                                <h1 className="truncate text-[14px] font-semibold text-[#fefdff] sm:text-lg">
                                    {item.title || item.name}
                                </h1>
                                <div className="flex items-center justify-between gap-1">
                                    <h3 className="flex items-center gap-1">
                                        <AiFillStar className="text-[14px] text-amber-400 sm:text-base" />
                                        <p className="text-[13px] text-amber-400 sm:text-base">{item.vote_average}</p>
                                    </h3>
                                    <h3 className="flex items-center gap-1">
                                        <FcLike className="text-[13px] sm:text-base" />
                                        <p className="text-[13px] text-[#fefdff] sm:text-base">{item.vote_count}</p>
                                    </h3>
                                </div>
                                <h4 className="flex items-center gap-2 text-[13px] text-slate-300 sm:text-base">
                                    <p className="text-[13px] sm:text-base">
                                        {moment(item.release_date || item.first_air_date).format("ll")}
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

import moment from "moment";
import Image from "next/image";
import StarRatings from "react-star-ratings";
import Microlink from "@microlink/react";
import styled from "styled-components";

import { useAuth } from "@/hooks";
import { VscTrash } from "react-icons/vsc";

export const CardComment = ({ dataComment, onDeleteComment }) => {
    const { profile } = useAuth();

    const contentClickHandler = (str) => {
        const match = str.match(/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi);
        if (match) {
            return match.map((url, index) => <CustomMicroLink url={url} key={index.toString()} />);
        }
    };

    return (
        <div className="divide-y-[1.5px]">
            {dataComment.map((comment) => (
                <div className="group flex gap-4 py-4" key={comment._id}>
                    <div>
                        <Image
                            alt={comment.avatar}
                            src={comment.avatar}
                            className="rounded-full"
                            width={32}
                            height={32}
                        />
                    </div>
                    <div className="flex-1">
                        <div>
                            <div className="mb-1 flex items-center justify-between">
                                <div>
                                    <h3 className="flex items-center gap-2 text-[1rem] font-semibold text-[#1ebc61]">
                                        {comment.name}
                                        <p className="flex gap-1 text-[0.9rem] font-normal text-[#5d6488]">
                                            {moment(comment.timeComment).fromNow()}
                                            <span className="text-[0.9rem]">
                                                {comment.editComment && "(đã chỉnh sửa)"}
                                            </span>
                                        </p>
                                    </h3>
                                    {comment.start > 0 && (
                                        <StarRatings
                                            starDimension="18px"
                                            starRatedColor="#ff8b05"
                                            starHoverColor="#ff8b05"
                                            rating={5}
                                            starEmptyColor="white"
                                            numberOfStars={comment.start}
                                        />
                                    )}
                                </div>
                                {profile && profile._id === comment.id_user && comment?.reply && (
                                    <div
                                        className="cursor-pointer opacity-0 group-hover:opacity-100"
                                        onClick={() =>
                                            onDeleteComment({
                                                id_comment: comment._id,
                                                id_product: comment.id_product,
                                            })
                                        }
                                    >
                                        <VscTrash className="text-lg text-slate-500" />
                                    </div>
                                )}
                            </div>
                            <div
                                className="break-all"
                                dangerouslySetInnerHTML={{
                                    __html: comment.content.replace(/(\r\n|\n|\r)/gm, "<br />"),
                                }}
                            />
                            {contentClickHandler(comment.content)}
                            {comment?.reply && (
                                <div>
                                    <CardComment dataComment={comment?.reply} onDeleteComment={onDeleteComment} />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};
const CustomMicroLink = styled(Microlink)`
    font-family: Poppins, sans-serif;
    border-radius: 0.42857em;
    margin-top: 4px;
    padding-left: 15px;
    & div > footer > span {
        display: none;
    }
    & div > footer > p {
        color: #007bff !important;
    }
    & div {
        background-size: contain;
    }
    @media (max-width: 650px) {
        display: grid;
    }
    @media (max-width: 650px) {
        & > div {
            width: 150px;
            height: 150px;
        }
    }
`;

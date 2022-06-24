import * as React from "react";
import moment from "moment";
import Image from "next/image";
import Microlink from "@microlink/react";
import styled from "styled-components";
import { Rate } from "antd";

import { useAuth } from "@/hooks";
import { VscTrash, VscEdit } from "react-icons/vsc";
import { FormComment } from "./form-comment";

export const CardComment = ({ dataComment, onDeleteComment, mutate }) => {
    const { profile } = useAuth();

    const contentClickHandler = (str) => {
        const match = str.match(/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi);
        if (match) {
            return match.map((url, index) => <CustomMicroLink url={url} key={index.toString()} />);
        }
    };

    const [idCommentEdit, setIdCommentEdit] = React.useState(null);

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
                                    {comment.start > 0 && comment._id !== idCommentEdit && (
                                        <Rate value={comment.start} disabled />
                                    )}
                                </div>
                                {profile && profile._id === comment.id_user && comment?.reply && (
                                    <>
                                        <div className="flex cursor-pointer gap-2 opacity-0 group-hover:opacity-100">
                                            <VscTrash
                                                className="text-lg text-red-500"
                                                onClick={() =>
                                                    onDeleteComment({
                                                        id_comment: comment._id,
                                                        id_product: comment.id_product,
                                                    })
                                                }
                                            />
                                            <VscEdit
                                                className="text-lg text-blue-500"
                                                onClick={() => setIdCommentEdit(comment._id)}
                                            />
                                        </div>
                                    </>
                                )}
                            </div>
                            {comment._id === idCommentEdit ? (
                                <FormComment
                                    dataComment={dataComment}
                                    mutate={mutate}
                                    setIdCommentEdit={setIdCommentEdit}
                                    initialValues={{ rate: comment.start, comment: comment.content }}
                                    _id_comment={comment._id}
                                    id_product={comment.id_product}
                                />
                            ) : (
                                <div
                                    className="break-all"
                                    dangerouslySetInnerHTML={{
                                        __html: comment.content.replace(/(\r\n|\n|\r)/gm, "<br />"),
                                    }}
                                />
                            )}
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

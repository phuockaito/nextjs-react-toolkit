import * as React from "react";
import { useRouter } from "next/router";
import NoSSR from "react-no-ssr";

import { Section } from "@/layout";
import { CardComment } from "./card-comment";
import { apiComment } from "@/api-client";

export const WrapperComment = ({ dataComment, _page_comment, id_product, mutate }) => {
    const router = useRouter();
    if (!dataComment) {
        return (
            <Section className="grid gap-2">
                <div className="flex w-full max-w-lg animate-pulse space-x-4">
                    <div className="h-10 w-10 rounded-full bg-slate-200"></div>
                    <div className="flex-1 space-y-2 py-1">
                        <div className="h-2 rounded bg-slate-200"></div>
                        <div className="space-y-3">
                            <div className="grid grid-cols-3 gap-4">
                                <div className="col-span-2 h-2 rounded bg-slate-200"></div>
                                <div className="col-span-1 h-2 rounded bg-slate-200"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex w-full max-w-sm animate-pulse space-x-4">
                    <div className="h-10 w-10 rounded-full bg-slate-200"></div>
                    <div className="flex-1 space-y-2 py-1">
                        <div className="h-2 rounded bg-slate-200"></div>
                        <div className="space-y-3">
                            <div className="grid grid-cols-3 gap-4">
                                <div className="col-span-2 h-2 rounded bg-slate-200"></div>
                                <div className="col-span-1 h-2 rounded bg-slate-200"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </Section>
        );
    }

    const handleDeleteComment = async ({ id_comment, id_product }) => {
        const newData = dataComment.data.filter(({ _id }) => _id !== id_comment);
        const { data } = await apiComment.deleteComment({ _id_product: id_product, id: id_comment });
        if (data) {
            mutate(
                {
                    ...dataComment,
                    data: newData,
                    length: dataComment.data.length - 1,
                },
                false
            );
        }
    };

    return (
        <React.Fragment>
            <NoSSR>
                <Section>
                    <h6 className="text-xl font-semibold capitalize text-[#212427]">Phản hồi ({dataComment.length})</h6>
                    <div className="flex flex-col gap-4">
                        {dataComment.data.length > 0 ? (
                            <div>
                                <CardComment
                                    dataComment={dataComment.data}
                                    onDeleteComment={handleDeleteComment}
                                    mutate={mutate}
                                />
                                {dataComment.data.length < dataComment.length && (
                                    <span
                                        className="cursor-pointer hover:underline"
                                        onClick={() => {
                                            router.push(
                                                {
                                                    pathname: "/detail/[id]",
                                                    query: {
                                                        _page_comment: Number(_page_comment) + 1,
                                                        id: id_product,
                                                    },
                                                },
                                                undefined,
                                                { shallow: true }
                                            );
                                        }}
                                    >
                                        Xem thêm phản hồi khác
                                    </span>
                                )}
                            </div>
                        ) : (
                            <h6>Chưa có bình luận nào</h6>
                        )}
                    </div>
                </Section>
            </NoSSR>
        </React.Fragment>
    );
};

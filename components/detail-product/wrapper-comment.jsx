import * as React from "react";
import { useRouter } from "next/router";
import NoSSR from "react-no-ssr";

import { Section } from "@/layout";
import { CardComment } from "./card-comment";

export const WrapperComment = ({ dataComment, _id_product, count_comments, _page_comment }) => {
    const router = useRouter();
    return (
        <React.Fragment>
            <NoSSR>
                <Section>
                    <h6 className="mb-3 text-xl font-semibold capitalize text-[#212427]">
                        Phản hồi ({count_comments})
                    </h6>
                    <div className="flex flex-col gap-4">
                        {dataComment.length > 0 ? (
                            <div>
                                <CardComment dataComment={dataComment} />
                                {dataComment.length < count_comments && (
                                    <span
                                        className="cursor-pointer hover:underline"
                                        onClick={() => {
                                            router.push(
                                                {
                                                    pathname: _id_product,
                                                    query: {
                                                        _page_comment: (Number(_page_comment) || 1) + 1,
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

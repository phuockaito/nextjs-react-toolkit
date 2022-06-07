import moment from "moment";
import Image from "next/image";

import StarRatings from "react-star-ratings";

export const CardComment = ({ dataComment }) => {
    return (
        <div className="divide-y-[1.5px]">
            {dataComment.map((comment) => (
                <div className="flex gap-4 py-4" key={comment._id}>
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
                                <h3 className="flex items-center gap-2 text-[1rem] font-semibold text-[#1ebc61]">
                                    {comment.name}
                                    <p className="flex gap-1 text-[0.9rem] font-normal text-[#5d6488]">
                                        {moment(comment.timeComment).fromNow()}
                                        <span className="text-[0.9rem]">{comment.editComment && "(đã chỉnh sửa)"}</span>
                                    </p>
                                </h3>
                                <div>
                                    <StarRatings
                                        starDimension="18px"
                                        starRatedColor="#ff8b05"
                                        starHoverColor="#ff8b05"
                                        rating={5}
                                        starEmptyColor="white"
                                        numberOfStars={comment.start}
                                    />
                                </div>
                            </div>
                            <span className="text-[1rem]">{comment.content}</span>
                            {comment?.reply && (
                                <div>
                                    <CardComment dataComment={comment?.reply} />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

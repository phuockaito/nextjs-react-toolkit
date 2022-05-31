import moment from "moment";
import Image from "next/image";

import StarRatings from "react-star-ratings";

export const CardComment = ({ dataComment }) => {
    return (
        <div className="divide-y-[1.5px]">
            {dataComment.map((comment) => (
                <div className="flex gap-2 py-2" key={comment._id}>
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
                            <div className="flex justify-between items-center mb-1">
                                <h3 className="font-semibold text-[#1ebc61] text-[1rem] flex items-center gap-2">
                                    {comment.name}
                                    <p className="text-[#5d6488] font-normal text-[0.9rem] flex gap-1">
                                        {moment(comment.timeComment).fromNow()}
                                        <span className="text-[0.9rem]">
                                            {comment.editComment &&
                                                "(đã chỉnh sửa)"}
                                        </span>
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
                            <span className="text-[1rem]">
                                {comment.content}
                            </span>
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

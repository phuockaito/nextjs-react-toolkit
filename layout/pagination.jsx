import clsx from "clsx";
import { useRouter } from "next/router";

export const Pagination = ({ pagination, pathname, title, page, url_page, sort_price = "0" }) => {
    const router = useRouter();
    return pagination > 1 ? (
        <div className="flex items-center justify-center mt-4 gap-1">
            {[...new Array(pagination)].map((_, index) => {
                const i = index + 1;
                return (
                    <div
                        key={i.toString()}
                        className={clsx(
                            "w-8 h-8 flex items-center justify-center rounded-[0.25rem] cursor-pointer",
                            page === i ? "bg-[#4058ff] text-white" : "text-[#a6a5c5] hover:bg-[#e9ebf4]"
                        )}
                        onClick={() => {
                            router.push({
                                pathname: pathname,
                                query: {
                                    _page: i,
                                    _sort_price: sort_price,
                                    [url_page]: title,
                                },
                            });
                        }}
                    >
                        <p>{i}</p>
                    </div>
                );
            })}
        </div>
    ) : null;
};

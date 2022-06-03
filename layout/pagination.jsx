import clsx from "clsx";
import { useRouter } from "next/router";

export const Pagination = ({ pagination, pathname, title, page, url_page, sort_price = "0" }) => {
    const router = useRouter();
    return pagination > 1 ? (
        <div className="mt-4 flex items-center justify-center gap-1">
            {[...new Array(pagination)].map((_, index) => {
                const i = index + 1;
                return (
                    <div
                        key={i.toString()}
                        className={clsx(
                            "flex h-8 w-8 cursor-pointer items-center justify-center rounded-[0.25rem]",
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

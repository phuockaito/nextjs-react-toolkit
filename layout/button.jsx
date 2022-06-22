import clsx from "clsx";
import { AiOutlineLoading } from "react-icons/ai";

export const Button = ({ label, className, bg = "bg-[#3069fe]", loading, size = "md" }) => {
    return (
        <button
            className={clsx(
                "flex items-center justify-center rounded-[0.25rem] text-white",
                className,
                bg,
                loading && "cursor-not-allowed opacity-90",
                size == "sm" && "p-2 sm:p-3",
                size == "md" && "p-3"
            )}
            disabled={loading}
        >
            {loading && <AiOutlineLoading className="mr-2 animate-spin text-[1rem]" />}
            {label}
        </button>
    );
};

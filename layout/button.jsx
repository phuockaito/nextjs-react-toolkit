import clsx from "clsx";
import { AiOutlineLoading } from "react-icons/ai";

export const Button = ({ label, className, bg = "bg-[#3069fe]", loading }) => {
    return (
        <button
            className={clsx(
                "flex items-center justify-center rounded-[0.25rem] p-3 text-white",
                className,
                bg,
                loading && "cursor-not-allowed opacity-90"
            )}
            disabled={loading}
        >
            {loading && <AiOutlineLoading className="mr-2 animate-spin text-[1rem]" />}
            {label}
        </button>
    );
};

import clsx from "clsx";
import { AiOutlineLoading } from "react-icons/ai";

export const Button = ({ label, className, bg = "bg-[#3069fe]", loading }) => {
    return (
        <button
            className={clsx(
                "px-[12px] py-[7px] rounded-[0.25rem] text-white flex items-center justify-center",
                className,
                bg,
                loading && "cursor-not-allowed opacity-90"
            )}
            disabled={loading}
        >
            {loading && (
                <AiOutlineLoading className="text-[1rem] animate-spin mr-2" />
            )}
            {label}
        </button>
    );
};

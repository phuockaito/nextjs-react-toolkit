import clsx from "clsx";

export const Coating = ({ onClick, className, children, isClose }) => {
    return (
        <div
            onClick={onClick}
            className={clsx(
                "fixed top-0 left-0 bottom-0 right-0 z-[1] h-full w-full bg-[#00000061]",
                className
            )}
        >
            {isClose && (
                <div className="fixed right-0 p-3">
                    <p className="w-5 h-5 flex items-center justify-center text-white uppercase font-semibold cursor-pointer">
                        x
                    </p>
                </div>
            )}
            {children}
        </div>
    );
};

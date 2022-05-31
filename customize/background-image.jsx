import clsx from "clsx";
import { IMG_API } from "@/const";

export const BackgroundImage = ({ url, className = "bg-local", children }) => {
    const URL = `${IMG_API}/${url}`;
    return (
        <div
            className={clsx("bg-no-repeat", className)}
            style={{
                backgroundImage: `url(${URL})`,
            }}
        >
            {children}
        </div>
    );
};

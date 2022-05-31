import clsx from "clsx";

import { LazyLoadImage } from "react-lazy-load-image-component";

export const Image = ({
    className = "w-14 h-w-14",
    src,
    alt,
    effect = "blur",
    ...props
}) => {
    return (
        <LazyLoadImage
            {...props}
            effect={effect}
            src={src}
            alt={alt}
            key={alt}
            className={clsx("object-revert", className)}
            wrapperClassName={clsx("object-revert", className)}
        />
    );
};

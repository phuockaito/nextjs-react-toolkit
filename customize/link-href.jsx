import Link from "next/link";

export const LinkHref = ({ href, children, className, ...props }) => {
    return (
        <Link href={href} {...props} rel="canonical">
            <a className={className}>{children}</a>
        </Link>
    );
};

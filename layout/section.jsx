import clsx from "clsx";

export const Section = ({ children, className }) => {
    return <section className={clsx("p-5 shadow-card rounded-[0.25rem]", className)}>{children}</section>;
};

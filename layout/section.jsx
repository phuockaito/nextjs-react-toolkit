import clsx from "clsx";

export const Section = ({ children, className }) => {
    return <section className={clsx("shadow-card rounded-[0.5rem] p-5", className)}>{children}</section>;
};

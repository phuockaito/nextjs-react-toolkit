import * as React from "react";
import NoSSR from "react-no-ssr";

import { Menu } from "./menu";

export const Header = ({
    children,
    className = "max-w-[1200px] mx-auto py-4 grid gap-5",
}) => {
    return (
        <React.Fragment>
            <NoSSR>
                <Menu />
            </NoSSR>
            <div className={className}>{children}</div>
        </React.Fragment>
    );
};

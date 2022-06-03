import * as React from "react";
import NextNProgress from "nextjs-progressbar";
import AOS from "aos";
import { SWRConfig } from "swr";

import { axiosClient } from "@/api-client";
import { wrapper } from "app";
import { AppWrapper } from "@/context";
import "../styles/tailwind.css";
import 'antd/dist/antd.css';
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
    React.useEffect(() => {
        AOS.init({
            duration: 500,
            once: true,
            initClassName: "aos-init",
        });
    }, []);

    const getLayout = Component.getLayout || ((page) => page);
    return (
        <React.Fragment>

            <NextNProgress height={6} stopDelayMs={0} color="#3069fe" />
            <SWRConfig
                value={{
                    fetcher: (url) => axiosClient.get(url),
                    shouldRetryOnError: false,
                }}
            >
                <AppWrapper>{getLayout(<Component {...pageProps} />)}</AppWrapper>
                </SWRConfig>

        </React.Fragment>
    );
}

export default wrapper.withRedux(MyApp);

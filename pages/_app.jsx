import * as React from "react";
import NextNProgress from "nextjs-progressbar";
import AOS from "aos";
import { SWRConfig } from "swr";

import { axiosClient } from "@/api-client";
import { wrapper } from "app";
import { AppWrapper } from "@/context";
import "antd/dist/antd.css";
import "../styles/tailwind.css";
import "../styles/globals.css";
import Script from "next/script";

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
                <div>
                    <Script
                        data-ad-client="ca-pub-8244019655482411"
                        async
                        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
                    ></Script>
                    <Script
                        strategy={"afterInteractive"}
                        src={`https://www.googletagmanager.com/gtag/js?id=G-7L4JFE1MWD`}
                    />
                    <Script
                        id={"google-analytics"}
                        strategy={"afterInteractive"}
                        dangerouslySetInnerHTML={{
                            __html: `
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        gtag('config', 'G-7L4JFE1MWD');
                        `,
                        }}
                    />
                    <AppWrapper>{getLayout(<Component {...pageProps} />)}</AppWrapper>
                </div>
            </SWRConfig>
        </React.Fragment>
    );
}

export default wrapper.withRedux(MyApp);

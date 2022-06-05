import React from "react";

import Head from "next/head";

import Logo from "@/public/favicon.ico";

const nameUrl = "nextjs react query";

export const MetaTag = ({
    title,
    description,
    content,
    thumbnail = "https://res.cloudinary.com/dycmdfgj3/image/upload/v1654409997/Screenshot_2022-06-05_131943_cwcfei.png",
    keywords,
    shortcutIcon,
    resolvedUrl,
    isDefault = false,
}) => {
    return (
        <Head>
            <meta name="description" content={content} />
            <meta
                name="viewport"
                content="width=device-width, initial-scale=1"
            />
            <meta name="theme-color" content="#000000" />
            <link
                rel="shortcut icon"
                type="image/x-icon"
                href="https://res.cloudinary.com/dycmdfgj3/image/upload/v1654409997/Screenshot_2022-06-05_131943_cwcfei.png"
            />

            <link rel="apple-touch-icon" href="https://res.cloudinary.com/dycmdfgj3/image/upload/v1654409997/Screenshot_2022-06-05_131943_cwcfei.png" />
            <link rel="icon" href="https://res.cloudinary.com/dycmdfgj3/image/upload/v1654409997/Screenshot_2022-06-05_131943_cwcfei.png" />
            <meta name="google-site-verification" content="TtFAyDDDG8SbHTN2DdFY7PGvCxF5gDM3pgnXwMOPRP8" />
            <meta
                name="robots"
                content={isDefault ? title : `${title} - ${nameUrl}`}
            />
            <meta
                name="googlebot"
                content={isDefault ? title : `${title} - ${nameUrl}`}
            />
            <meta
                name="robots"
                content={`max-snippet: ${
                    isDefault ? title : `${title} - ${nameUrl}`
                }`}
            />

            <meta name="keywords" content={keywords} />
            <meta
                name={isDefault ? title : `${title} - ${nameUrl}`}
                content="150 words"
            />
            <meta name="subject" content={content} />
            <meta name="language" content="VN" />
            <meta property="og:image:secure_url" content={thumbnail} />
            <meta name="robots" content="index,follow" />
            <meta name="googlebot" content="index,follow" />
            <meta property="fb:app_id" content="167937797261468" />
            <meta property="og:description" content={description} />
            <meta property="og:site_name" content="VieON" />
            <meta
                name="apple-itunes-app"
                content="app-id=1357819721, affiliate-data=vieonapp://vod/1f564c6b-b8dd-45f6-97ff-70674dd357b0, app-argument=vieonapp://vod/1f564c6b-b8dd-45f6-97ff-70674dd357b0"
            />
            <meta name="mobile-web-app-capable" content="yes" />
            <meta name="apple-mobile-web-app-capable" content="yes" />

            <title>{isDefault ? title : `${title} - ${nameUrl}`}</title>

            {/* Open Graph / Facebook */}
            <meta name="og:type" content="Clean energy" />
            <meta property="og:url" content={resolvedUrl} />
            <meta
                name="og:title"
                content={isDefault ? title : `${title} - ${nameUrl}`}
                key={isDefault ? title : `${title} - ${nameUrl}`}
            />
            <meta name="og:description" content={description} />
            <meta name="og:country-name" content="VIETNAM" />
            <meta property="og:image" content={thumbnail} />
            {/* Twitter */}
            <meta name="twitter:card" content="summary" />
            <meta property="twitter:url" content={resolvedUrl} />
            <meta name="twitter:title" content={`${title} - ${nameUrl}`} />
            <meta name="twitter:description" content={description} />
            <meta property="og:locale" content="vi_VN" />
            <meta name="twitter:image:src" content={thumbnail} />
        </Head>
    );
};

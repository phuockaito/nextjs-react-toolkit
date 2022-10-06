import { defaultContent, defaultDescription, defaultKeyword, defaultThumbnail, defaultTile, defaultURL } from "@/const";
import { MetaTag } from "@/customize";
import React from "react";

const Page404 = () => {
    return (
        <div>
            <MetaTag
                resolvedUrl={defaultURL}
                title={defaultTile}
                description={defaultDescription}
                content={defaultContent}
                thumbnail={defaultThumbnail}
                keywords={defaultKeyword}
                isDefault
            />
            <div className="flex items-center justify-center min-h-screen">
                <h1 className="text-2xl font-bold text-red-700">404</h1>
            </div>
        </div>
    );
};

export default Page404;

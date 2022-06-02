import * as React from "react";

export const usePreviewImage = () => {
    const [previewImage, setPreviewImage] = React.useState(null);
    const [image, setImage] = React.useState(0);

    React.useEffect(() => {
        if (previewImage) {
            document.body.style = "padding-right:17.5px; overflow:hidden;";
        } else document.body.style = "padding-right:0px; overflow:auto;";
    }, [previewImage]);

    return {
        setPreviewImage,
        setImage,
        previewImage,
        image,
    };
};

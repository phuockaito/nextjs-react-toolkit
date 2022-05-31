import * as React from 'react';
import { useSelector, useDispatch } from "react-redux";

import { selectMenu } from "@/selector";
import { onGetMenu } from "@/app/slices";

export const useMenu = () => {
    const dispatch = useDispatch();
    const storeMenu = useSelector(selectMenu);

    const handleGetMenu = React.useCallback(() => dispatch(onGetMenu()), [dispatch]);


    return {
        handleGetMenu,
        storeMenu,
    }
};

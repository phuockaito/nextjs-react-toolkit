import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiMenu } from "@/api-client";

export const onGetMenu = createAsyncThunk("onGetMenu", async () => {
    const response = await apiMenu.getMenu();
    return response;
});
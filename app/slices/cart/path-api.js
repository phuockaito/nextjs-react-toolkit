import { apiCart } from "@/api-client";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const postCartAPI = createAsyncThunk("postCart", async (data, token) => {
    const response = await apiCart.postCart(data);
    return response;
});

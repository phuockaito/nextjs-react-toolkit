import { apiCart } from "@/api-client";

export const postCartAPI = createAsyncThunk("postCart", async (data, token) => {
    const response = await apiCart.postCart(data);
    return response;
});

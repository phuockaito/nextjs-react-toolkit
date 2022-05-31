import { createSlice } from '@reduxjs/toolkit';
import { onGetMenu } from "./path-api";

export const sliceMenu = createSlice({
    name: 'menu',
    initialState: {
        dataMenu: null,
        isLoading: true,
    },
    reducers: {

    },
    extraReducers: {
        [onGetMenu.pending]: (state, action) => {
            state.isLoading = true;
        },
        [onGetMenu.fulfilled]: (state, action) => {
            state.dataMenu = action.payload;
            state.isLoading = false;
        },
    }
});
const { reducer } = sliceMenu;
export default reducer;

import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

export const sliceProfile = createSlice({
    name: "profile",
    initialState: {
        name: "1",
    },
    reducers: {
        setProfileData: (state, action) => {
            state.name = action.payload;
        },
    },
    extraReducers: {
        [HYDRATE]: (state, action) => {
            if (!action.payload.profile.name) {
                return state;
            }

            state.name = action.payload.profile.name;
        },
    },
});

export const fetchProfile = () => async (dispatch) => {
    const timeoutPromise = (timeout) => new Promise((resolve) => setTimeout(resolve, timeout));

    await timeoutPromise(200);

    dispatch(setProfileData("name from thunk"));
};

const { actions, reducer } = sliceProfile;
export const { setProfileData } = actions;
export default reducer;

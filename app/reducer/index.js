import { sliceProfile, sliceMenu } from "../slices";

export const reducer = {
    profile: sliceProfile.reducer,
    menu: sliceMenu.reducer,
};
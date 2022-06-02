import { sliceProfile, sliceMenu, sliceCart } from "../slices";

export const reducer = {
    profile: sliceProfile.reducer,
    menu: sliceMenu.reducer,
    cart: sliceCart.reducer,
};

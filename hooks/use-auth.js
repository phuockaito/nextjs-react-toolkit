import * as React from "react";

import { apiAccount } from "@/api-client";
import useSWR from "swr";

export const useAuth = (options) => {
    const {
        data: profile,
        error,
        mutate,
    } = useSWR("user/profile", {
        dedupingInterval: 60 * 60 * 1000,
        revalidateOnFocus: false,
        ...options,
    });

    const handleLogin = async (data) => {
        await apiAccount.login(data);
        await mutate();
    };

    const handleRegister = async (data) => {
        await apiAccount.register(data);
        await mutate();
    };

    const handleGoogleLogin = async (tokenId) => {
        await apiAccount.googleLogin(tokenId);
        window.location.reload();
    };

    const handleLogout = async () => {
        await apiAccount.logout();
        mutate(null, false);
    };

    const handleChangePassword = React.useCallback((password) => password && apiAccount.changePassword(password), []);

    return {
        handleLogin,
        handleLogout,
        handleGoogleLogin,
        handleChangePassword,
        handleRegister,
        profile: profile?.user,
        error,
    };
};

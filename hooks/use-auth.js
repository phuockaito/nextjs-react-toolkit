import { apiAccount } from '@/api-client'
import useSWR from 'swr';

export const useAuth = (options) => {
    const {
        data: profile,
        error,
        mutate,
    } = useSWR('user/profile', {
        dedupingInterval: 60 * 60 * 1000, // 1hr
        revalidateOnFocus: false,
        ...options,
    })

    const firstLoading = profile === undefined && error === undefined;

    const handleLogin = async (data) => {
        await apiAccount.login(data);
        await mutate();
    };

    const handleLogout = async () => {
        await apiAccount.logout()
        mutate(null, false);
    };

    return {
        profile: profile?.user,
        error,
        handleLogin,
        handleLogout,
        firstLoading,
    }
}

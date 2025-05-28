import { create } from 'zustand';
import * as SecureStore from 'expo-secure-store';

type AuthType = {
    userId: number | null;
    accessToken: string | null;
    refreshToken: string | null;
    setUserId: (id: number) => void;
    setAccessToken: (accessToken: string) => Promise<void>;
    setRefreshToken: (refreshToken: string) => Promise<void>;
    clearTokens: () => Promise<void>;
};

const useAuthStore = create<AuthType>()((set, get) => ({
    userId: null,
    accessToken: null,
    refreshToken: null,
    setUserId: (id) => {
        set({ userId: id });
    },
    setAccessToken: async (accessToken) => {
        await SecureStore.setItemAsync('accesstoken', accessToken);
        set({ accessToken: accessToken });
    },
    setRefreshToken: async (refreshToken) => {
        await SecureStore.setItemAsync('refreshToken', refreshToken);
        set({ refreshToken: refreshToken });
    },
    clearTokens: async () => {
        await SecureStore.deleteItemAsync('refreshToken');
        set({ accessToken: null, refreshToken: null });
    },
}));

export default useAuthStore;

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import * as SecureStore from "expo-secure-store";

type AuthType = {
   accessToken: string | null;
   refreshToken: string | null;
   setAccessToken: (accessToken: string) => Promise<void>;
   setRefreshToken: (refreshToken: string) => Promise<void>;
   clearTokens: () => Promise<void>;
}

const useAuthStore = create<AuthType>()(
   (set, get) => ({
      accessToken: null,
      refreshToken: null,
      setAccessToken: async (accessToken) => { 
         await SecureStore.setItemAsync("accesstoken", accessToken);
         set({ accessToken: accessToken });
      },
      setRefreshToken: async (refreshToken) => {
         await SecureStore.setItemAsync("refreshToken", refreshToken);
         set({ refreshToken: refreshToken });
      },
      clearTokens: async () => {
         await SecureStore.deleteItemAsync("refreshToken");
         set({ accessToken: null, refreshToken: null });
      },
   }),
);

export default useAuthStore;
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SecureStore from "expo-secure-store";

type AuthType = {
   userId: number | null;
   accessToken: string | null;
   refreshToken: string | null;
   setUserId: (userId: number) => void;
   setAccessToken: (accessToken: string) => void;
   setRefreshToken: (refreshToken: string) => Promise<void>;
   clearTokens: () => Promise<void>;
}

const useAuthStore = create<AuthType>()(
   persist(
      (set, get) => ({
         userId: null,
         accessToken: null,
         refreshToken: null,
         setUserId: (userId) => set({ userId: userId }),
         setAccessToken: (accessToken) => set({ accessToken }),
         setRefreshToken: async (refreshToken) => {
            await SecureStore.getItemAsync("refreshToken");
            set({ refreshToken: refreshToken });
         },
         clearTokens: async () => {
            await SecureStore.deleteItemAsync("refreshToken");
            set({ accessToken: null, refreshToken: null });
         },
   }),
   {
      name: "accessToken",
      partialize: (state) => ({ accessToken: state.accessToken }),
      storage: createJSONStorage(() => AsyncStorage),
   },
));

export default useAuthStore;
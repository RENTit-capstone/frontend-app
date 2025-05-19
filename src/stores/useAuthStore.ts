import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SecureStore from "expo-secure-store";

type AuthType = {
   accessToken: string | null;
   refreshToken: string | null;
   setAccessToken: (accessToken: string) => void;
   setRefreshToken: (refreshToken: string) => Promise<void>;
   clearTokens: () => Promise<void>;
}

const useAuthStore = create<AuthType>()(
   persist(
      (set, get) => ({
         accessToken: null,
         refreshToken: null,
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
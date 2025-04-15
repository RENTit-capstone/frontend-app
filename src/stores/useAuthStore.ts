import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { AuthType } from "@/types/types";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useAuthStore = create<AuthType>()(
   persist(
      (set) => ({
         //defaultValues
         token: null,
         login: (token) => set({token}),
         logout: () => set({ token: null }),
   }),
   {
      name: "accessToken",
      storage: createJSONStorage(() => AsyncStorage),
   }));

export default useAuthStore
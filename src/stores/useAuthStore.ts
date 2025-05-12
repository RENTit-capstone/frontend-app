import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { AuthType } from "@/types/types";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useAuthStore = create<AuthType>()(
   persist(
      (set, get) => ({
         //defaultValues
         id: null,
         accessToken: null,
         setId: (id) => set({id}),
         setToken: (accessToken) => set({ accessToken }),
         clearToken: () => set({ accessToken: null }),
   }),
   {
      name: "accessToken",
      storage: createJSONStorage(() => AsyncStorage),
   }));

export default useAuthStore
import { create } from "zustand";
import { AuthType } from "@/types/types";

const useAuth = create<AuthType>((set) => ({
   isLoggedIn: false,     //default
   login: () => set({ isLoggedIn: true }),
   logout: () => set({ isLoggedIn: false }),
}));

export default useAuth
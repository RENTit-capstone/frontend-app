import { axiosPost } from "@/api";
import { create } from "zustand";

type Gender = 'male' | 'female';

type SignupVerificationType = {
    emailCodeSent: boolean,
    emailVerified: boolean,
    sendCode: (email: string, university: string) => Promise<void>,
    verifyCode: (code: string) => Promise<void>,
};

export const useSignupVerificationStore = create<SignupVerificationType>(
    (set, get) => ({
        emailCodeSent: false,
        emailVerified: false,

        sendCode: async (email: string, university: string) => {
            try {
                const payload = {"email": email, "university": university};
                const response = await axiosPost(`POST /api/v1/auth/signup/verify-email`, payload);
                console.log("Response for sendcode", response.data);
            }
            catch(error) {
                throw(error);
            }
            set({ emailCodeSent: true });
        },

        verifyCode: async (code: string) => {
            set({ emailVerified: true });
        }

    }));
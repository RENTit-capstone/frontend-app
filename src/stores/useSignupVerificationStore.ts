import { create } from "zustand";

type Gender = 'male' | 'female';

type SignupVerificationType = {
    emailCodeSent: boolean,
    emailVerified: boolean,
    sendCode: (email: string) => Promise<void>,
    verifyCode: (code: string) => Promise<void>,
};

export const useSignupVerificationStore = create<SignupVerificationType>(
    (set, get) => ({
        emailCodeSent: false,
        emailVerified: false,

        sendCode: async (email: string) => {
            //API 호출
            set({ emailCodeSent: true });
        },
        verifyCode: async (code: string) => {
            set({ emailVerified: true });
        }

    }));
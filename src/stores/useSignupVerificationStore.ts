import { axiosPost } from "@/api";
import { UserInfoType } from "@/types/types";
import { create } from "zustand";


type SignupVerificationType = {
    emailCodeSent: boolean,
    emailVerified: boolean,
    sendCode: (email: string, university: string) => Promise<any>,
    verifyCode: (email: string, university: string, code: string) => Promise<any>,
    signup: (payload: UserInfoType) => Promise<any>,
};

export const useSignupVerificationStore = create<SignupVerificationType>(
    (set, get) => ({
        emailCodeSent: false,
        emailVerified: false,

        sendCode: async (email: string, university: string) => {
            try {
                const payload = {"email": email, "university": university};
                const response = await axiosPost(`/api/v1/auth/signup/verify-email`, payload);
                console.log("Response for sendcode", response.data);
                set({ emailCodeSent: true });
                return response.data;
            }
            catch(error) {
                set({ emailCodeSent: false });
                throw(error);
            }
        },

        verifyCode: async (email: string, university: string, code: string) => {
            try {
                const payload = {"email": email, "university": university, "code": code};
                const response = await axiosPost(`/api/v1/auth/signup/verify-code`, payload);
                console.log("Response for verifyCode: ", response.data);
                set({ emailVerified: true });
                return response.data;
            }
            catch(error) {
                set({ emailVerified: false });
                throw(error);
            }
        },

        signup: async (payload: UserInfoType) => {
            try {
                const response = await axiosPost(`/api/v1/auth/signup`, payload);
                console.log("Response for signup: ", response.data);
                return response.data;
            }
            catch(error) {
                throw(error);
            }
        }

    }));
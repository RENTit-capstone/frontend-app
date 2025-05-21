import { axiosInstance } from "@/api";
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
            const payload = {"email": email, "university": university};
            const response = await axiosInstance.post(`/api/v1/auth/signup/verify-email`, payload);
            
            if (!response.data.success){
                set({ emailCodeSent: false });
                throw new Error(response.data.message);
            }    
            console.log("Response for sendcode", response.data);
            set({ emailCodeSent: true });
            return response.data;
        },

        verifyCode: async (email: string, university: string, code: string) => {
            const payload = {"email": email, "university": university, "code": code};
            const response = await axiosInstance.post(`/api/v1/auth/signup/verify-code`, payload);

            if (!response.data.success){
                set({ emailVerified: false });
                throw new Error(response.data.message);
            }     
            console.log("Response for verifyCode: ", response.data);
            set({ emailVerified: true });
            return response.data;
        },

        signup: async (payload: UserInfoType) => {
            const response = await axiosInstance.post(`/api/v1/auth/signup`, payload);
            
            if (!response.data.success){
                set({ emailVerified: false });
                throw new Error(response.data.message);
            }     
            console.log("Response for signup: ", response.data);
            return response.data;
        }

    }));
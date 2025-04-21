import { LoginType, SignupType } from "@/types/types";
import { axiosInstance } from ".";
import useAuthStore from "@/stores/useAuthStore";

export const login = async (loginFormData: LoginType) => {
    const {setToken} = useAuthStore();
    try{
        const res = await axiosInstance.post("/api/v1/auth/login", loginFormData);
        
        const accessToken = res.headers["Authorization"];
        setToken(accessToken);

        const refreshToken = res.headers["refresh"];
        //securestore에 저장

        return res;
    } catch (error) {
        console.error(error);
        throw(error);
    }
}

export const signup = async (signupFormData: SignupType) => {
    //JWT token 관여X
    const {setId} = useAuthStore();
    try{
        const res = await axiosInstance.post("/api/signup", signupFormData);
        setId(res.data);
        //res로 사용자 id를 받으면 바로 verifyEmail API 호출해서 메일을 보내면 되는건지 백엔드에 확인해보기
        return res;
    } 
    catch(error) {
        console.error(error);
        throw(error);
    }
}

export const sendEmailVerifyCode = async(emailAddr: string) => {
    try{
        const res = await axiosInstance.post("/auth/signup/verify-email", emailAddr);
        return res;
    }
    catch(error) {
        console.error(error);
        throw(error);
    }
}

export const verifyEmail = async(emailVerifyCode: string) => {
    try{
        const res = await axiosInstance.post("/auth/signup/verify-code", emailVerifyCode);
        return res;
    }
    catch(error) {
        console.error(error);
        throw(error);
    }
}

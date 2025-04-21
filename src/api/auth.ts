import { LoginType, SignupType } from "@/types/types";
import { axiosInstance } from ".";
import useAuthStore from "@/stores/useAuthStore";

const login = async (payload: LoginType) => {
    const {setToken} = useAuthStore();
    try{
        const res = await axiosInstance.post("/api/v1/auth/login", payload);
        
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

const signup = async (payload: SignupType) => {
    //JWT token 관여X
    try{
        const res = await axiosInstance.post("/api/signup", payload);
        return res;
    } 
    catch(error) {
        console.error(error);
        throw(error);
    }
}

export default [login, signup];
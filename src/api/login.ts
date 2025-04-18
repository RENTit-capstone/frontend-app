import { LoginType } from "@/types/types";
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

export default login;
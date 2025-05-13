import useAuthStore from "@/stores/useAuthStore";
import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: process.env.EXPO_PUBLIC_API_URL,
    headers: {
        "Content-Type": "application/json",
    }
});

const getNewToken = async () => {
    const oldAccessToken = useAuthStore.getState().accessToken;
    const oldRefreshToken = useAuthStore.getState().refreshToken;
    const payload = {"accessToken": oldAccessToken, "refreshToken": oldRefreshToken};
    const response = await axios.post(`/api/v1/auth/login/refresh`, payload);
    if (!response.data.success)
        throw new Error(response.data.message);

    return response.data;
}

axiosInstance.interceptors.request.use(
    async (config) => {
        const token = useAuthStore.getState().accessToken;
        console.log(token);
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        console.error("[AXIOS_INTERCEPTORS_REQUEST_ERROR]: ", error);
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        // access token 만료 시 => code? 401?
        const response = await getNewToken();
        useAuthStore.setState({accessToken: response.accessToken});
        useAuthStore.setState({refreshToken: response.refreshToken});
        console.error("[AXIOS_INTERCEPTORS_RESPONSE_ERROR]: ", error);
        return Promise.reject(error);   //요청 재시도 필요?
    }
);

export const axiosGet = async (url: string) => {
    const res = await axiosInstance.get(url);
    if (!res.data.success){
        throw new Error(res.data.message);
    }
    return res.data;
}

export const axiosPost = async (url: string, payload?: any) => {
    const res = await axiosInstance.post(url, payload);
    if (!res.data.success){
        throw new Error(res.data.message);
    }
    return res.data;
}

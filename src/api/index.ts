import useAuthStore from "@/stores/useAuthStore";
import axios from "axios";

export const axiosNoInterceptor = axios.create({
    baseURL: process.env.EXPO_PUBLIC_API_URL,
    headers: {
        "Content-Type": "application/json",
    }
})

export const axiosInstance = axios.create({
    baseURL: process.env.EXPO_PUBLIC_API_URL,
});

const getNewToken = async () => {
    const oldAccessToken = useAuthStore.getState().accessToken;
    const oldRefreshToken = useAuthStore.getState().refreshToken;
    const payload = {"accessToken": oldAccessToken, "refreshToken": oldRefreshToken};
    const response = await axiosNoInterceptor.post(`/api/v1/auth/login/refresh`, payload);
    if (response.data.success){
        useAuthStore.setState({
            accessToken: response.data.accessToken,
            refreshToken: response.data.refreshToken,
        });
    }
    else {
        throw new Error(response.data.message);
    }
}

axiosInstance.interceptors.request.use(
    async (config) => {
        const token = useAuthStore.getState().accessToken;
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        console.log('Token:', config.headers);
        if (!config.headers["Content-Type"]) {
            config.headers["Content-Type"] = "application/json";
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
        if (response.data && response.data.success===false){
            if (response.data.message.includes("validation error")) {
                return getNewToken().then(() => {
                    const originalRequest = response.config;
                    return axiosInstance(originalRequest);
                });
            }
            return Promise.reject(new Error(response.data.message));
        }
        return response;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export const axiosGet = async (url: string) => {
    const res = await axiosInstance.get(url);
    if (!res.data.success){
        throw new Error(res.data.message);
    }
    return res.data;
}

export const axiosPost = async (url: string, payload?: any, headerOption?: any) => {
    const res = await axiosInstance.post(url, payload, headerOption);
    if (!res.data.success){
        throw new Error(res.data.message);
    }
    return res.data;
}

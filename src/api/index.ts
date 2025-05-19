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
            config.headers.accessToken = `Bearer ${token}`;
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
            if (response.data.message==="accessToken validation error.") {
                return getNewToken().then((newTokenResponse) => {
                    useAuthStore.setState({
                        accessToken: newTokenResponse.accessToken,
                        refreshToken: newTokenResponse.refreshToken,
                    });
                    const originalRequest = response.config;
                    originalRequest.headers.Authorization = `Bearer ${newTokenResponse.accessToken}`;
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

export const axiosPost = async (url: string, payload?: any) => {
    const res = await axiosInstance.post(url, payload);
    if (!res.data.success){
        throw new Error(res.data.message);
    }
    return res.data;
}

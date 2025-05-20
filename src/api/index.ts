import useAuthStore from "@/stores/useAuthStore";
import axios from "axios";

export const axiosNoInterceptor = axios.create({
    baseURL: process.env.EXPO_PUBLIC_API_URL,
    headers: {
        "Content-Type": "application/json",
    }
})

//debug
// axiosNoInterceptor.interceptors.request.use((config) => {
//     console.log('Login request headers:', config.headers);
//     console.log(config)
//     return config;
// });

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
        if (error.status===403) {
            console.log("403Error");
            const originalRequest = error.config;
            await getNewToken();
            return axiosInstance(originalRequest);
        }
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

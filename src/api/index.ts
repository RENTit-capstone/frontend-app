import Constants from 'expo-constants';
import useAuthStore from '@/stores/useAuthStore';
import axios from 'axios';

console.log('API BASE URL:', process.env.EXPO_PUBLIC_API_URL);

export const axiosNoInterceptor = axios.create({
    // baseURL: Constants.expoConfig?.extra?.apiUrl,
    // baseURL: process.env.EXPO_PUBLIC_API_URL,
    baseURL: 'http://223.130.147.103:8080',
});

export const axiosInstance = axios.create({
    // baseURL: process.env.EXPO_PUBLIC_API_URL,
    // baseURL: Constants.expoConfig?.extra?.apiUrl,
    baseURL: 'http://223.130.147.103:8080',
});

const getNewToken = async () => {
    const oldAccessToken = useAuthStore.getState().accessToken;
    const oldRefreshToken = useAuthStore.getState().refreshToken;
    const payload = { accessToken: oldAccessToken, refreshToken: oldRefreshToken };
    const response = await axiosNoInterceptor.post(`/api/v1/auth/login/refresh`, payload);
    if (response.data.success) {
        useAuthStore.setState({
            accessToken: response.data.accessToken,
            refreshToken: response.data.refreshToken,
        });
        return response.data.accessToken;
    } else {
        throw new Error(response.data.message);
    }
};

axiosInstance.interceptors.request.use(
    async (config) => {
        const token = useAuthStore.getState().accessToken;
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        if (config.data && typeof config.data === 'object' && config.data._parts) {
            delete config.headers['Content-Type'];
        } else {
            config.headers['Content-Type'] = 'application/json';
        }

        // if (!config.headers["Content-Type"]) {
        //     config.headers["Content-Type"] = "application/json";
        // }
        return config;
    },
    (error) => {
        console.error('[AXIOS_INTERCEPTORS_REQUEST_ERROR]: ', error);
        return Promise.reject(error);
    },
);

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        if (error.status === 403) {
            console.log('403Error');
            const originalRequest = error.config;
            const newAccessToken = await getNewToken();

            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            return axiosInstance(originalRequest);
        }
        return Promise.reject(error);
    },
);

export const axiosGet = async (url: string) => {
    const res = await axiosInstance.get(url);
    if (!res.data.success) {
        throw new Error(res.data.message);
    }
    return res.data;
};

export const axiosPost = async (url: string, payload?: any, headerOption?: any) => {
    const res = await axiosInstance.post(url, payload, headerOption);
    if (!res.data.success) {
        throw new Error(res.data.message);
    }
    return res.data;
};

export const axiosPut = async (url: string, payload?: any, headerOption?: any) => {
    const res = await axiosInstance.put(url, payload, headerOption);
    if (!res.data.success) {
        throw new Error(res.data.message);
    }
    return res.data;
};

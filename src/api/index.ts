import useAuthStore from "@/stores/useAuthStore";
import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: process.env.EXPO_PUBLIC_API_URL,
    headers: {
        "Content-Type": "application/json",
    }
});

const getNewToken = () => {
    const newAccessToken = undefined;

    return newAccessToken;
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
        console.error("[AXIOS_ERROR]: ", error);
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        // access token 만료 시
        const originalRequest = error.config;
        // 백엔드 JWT 만료 시 response 반환값 보고 response.status수정
        if (error.response.status && !originalRequest._retry){
            originalRequest._retry = true;

            try {
                const newAccessToken = await getNewToken(); // 리프레시 토큰으로 access token 재발급급
                if (newAccessToken){
                    originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                    return axiosInstance(originalRequest);
                }                
            } 
            
            catch(refreshError) {
                if (refreshError.response?.data.error === "INVALID_TOKEN"){
                    //리프레시 토큰 삭제
                    
                    alert(
                        "로그인 세션 만료\n 다시 로그인 하시길 바랍니다."
                    );
                }
                return Promise.reject(refreshError);
            }
        }
        console.log(error);
        return Promise.reject(error);
    }
)

// useUserStore.setState(response.data, true);와 같이 호출되면, 다음과 같은 프로세스가 진행됩니다:

// setState 메소드는 Zustand 상태 저장소의 상태를 업데이트합니다.
// true 매개변수는 이 변경 사항이 AsyncStorage에도 저장되어야 함을 나타냅니다.
// 이로써, 애플리케이션이 재시작되더라도 사용자 상태는 유지됩니다.
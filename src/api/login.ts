import { LoginType } from "@/types/types";
import { axiosInstance } from ".";

export const login = async (payload: LoginType) => {
    const {data} = await axiosInstance.post("/api/v1/auth/login", payload);
    return data;
}
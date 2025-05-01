import { axiosInstance } from "."

export const generateOTP = async () => {
    const res = await axiosInstance.post(`/api/v1/auth/otp`);
    if (!res.data.success){
        throw new Error(res.data.message);
    }

    return res.data;
}

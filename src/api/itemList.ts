import { axiosInstance } from "."

export const fetchItemList = async () => {
    try{
        const res = await axiosInstance.get("/api/items");
        return res.data;
    } catch (error) {
        console.log(error);
        throw(error);
    }
}

export const fetchItemDetails = async (id: number) => {
    try {
        const res = await axiosInstance.get(`/api/items${id}`);
        return res.data;
    }
    catch(error) {
        console.log(error);
        throw(error);
    }
}
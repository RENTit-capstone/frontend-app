import { axiosInstance } from "."

const fetchItemList = async () => {
    try{
        const res = await axiosInstance.get("/api/items");
        return res.data;
    } catch (error) {
        console.log(error);
        throw(error);
    }
}

export default fetchItemList;
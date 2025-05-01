import { AccordionCardProps } from "@/types/types";
import { axiosInstance } from "."

export const fetchHistory = async () => {
    // 일단 모든 status, page=0, size=20(고정), sort=requestDate, desc
    const statuses = ["REQUESTED", "APPROVED"];
    const page = 0;
    const size = 20;
    const sort = {
        criterion: "requestDate",
        sequence: "desc",
    }
    
    let queryParams = "?";
    statuses.map((condition: string) => {
        queryParams = queryParams + `statuses=${condition}&`;
    })
    queryParams = queryParams + `page=${page}&`;
    queryParams = queryParams + `size=${size}`;
    queryParams = queryParams + `sort=${sort.criterion},${sort.sequence}`;
    console.log(queryParams);

    const res = await axiosInstance.get(`/api/v1/rentals?${queryParams}`);
    if (!res.data.success){
        throw new Error(res.data.message);
    }
    return res.data;        
};

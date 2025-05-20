import { ScrollView, View } from "react-native";
import AccordionCard from "./AccordionCard";
import { AccordionCardProps } from "@/types/types";
import { itemList } from "@/styles/components/itemList";
import { useEffect, useState } from "react";
import { axiosGet } from "@/api";
import useUrl from "@/hooks/useUrl";

const AccordionCardContainer = () => {
    const [page, setPage] = useState(0);
    const [data, setData] = useState<AccordionCardProps[]>([]);

    useEffect(() => {
        fetchHistory();
    }, []);

    const fetchHistory = async () => {
        const params = useUrl({
            stautses: ["REQUESTED", "APPROVED"],
            page: page,
            size: 20,
            sort: ["requestDate", "desc"],
        });
        try {
            const response = await axiosGet(`/api/v1/rentals?${params}`);
            console.log("Res:", response.data);
            setPage(response.data.pageable.pageNumber+1);
            setData(response.data.content);
        }
        catch (error) {
            console.error(error);
        }
    }

    // 히스토리가 아니라 나의 물품에서 실행
    // const submitApprove = async (rentalId: number, isApproved: boolean=false) => {
    //     const approvement = isApproved? "approve" : "reject";
    //     try {
    //         const response = await axiosPost(`/api/v1/rentals/${rentalId}/${approvement}`);
    //         console.log("Response for submitApprovee: ", response.data);
    //         // TODO: button 비활성화로 만들고 toastMessage 띄우기
    //     }
    //     catch(error) {
    //         console.error(error);
    //     }
    // }

    return (
        <ScrollView>
            <View style={itemList.listContainer}>
            {data.map((item: AccordionCardProps) => {
                return(
                    <>
                    <AccordionCard 
                        key={item.rentalId}
                        rentalId={item.rentalId}
                        itemId={item.itemId}
                        requestDate={item.requestDate}
                        status={item.status}
                    />
                    <View style={[itemList.rowDivider, {marginBottom: 16}]} />
                    </>
            )})}
            </View>
        </ScrollView>
    );
}

export default AccordionCardContainer;
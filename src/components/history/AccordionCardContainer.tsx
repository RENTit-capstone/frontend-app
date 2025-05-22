import { ScrollView, View } from "react-native";
import AccordionCard from "./AccordionCard";
import { AccordionCardProps, MineCardProps } from "@/types/types";
import { itemList } from "@/styles/components/itemList";
import { useEffect, useState } from "react";
import { axiosGet } from "@/api";
import useUrl from "@/hooks/useUrl";

const AccordionCardContainer = () => {
    const [page, setPage] = useState(0);
    const [data, setData] = useState<AccordionCardProps[]>([]);
    const [mine, setMine] = useState<MineCardProps[]>([]);

    useEffect(() => {
        fetchHistory();
        fetchMine();
    }, []);
    
    const fetchMine = async () => {
        try {
            const response = await axiosGet(`/api/v1/members/me`);
            console.log("Mine: ", response.data.ownedRentals);
            setMine(response.data.ownedRentals);
            
        }
        catch (error) {
            console.error(error);
        }
    }


    const fetchHistory = async () => {
        const params = useUrl({
            stautses: ["REQUESTED", "APPROVED"],
            page: 0,
            size: 20,
            sort: ["requestDate", "desc"],
        });
        try {
            const response = await axiosGet(`/api/v1/rentals?${params}`);
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
                {mine.map((item: MineCardProps) => {
                return(
                    <>
                    <AccordionCard 
                        type={"mine"}
                        key={item.rentalId}
                        rentalId={item.rentalId}
                        itemId={item.itemId ?? 0}
                        requestDate={item.requestDate}
                        status={item.status}
                    />
                    <View style={[itemList.rowDivider, {marginBottom: 16}]} />
                    </>
            )})}
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
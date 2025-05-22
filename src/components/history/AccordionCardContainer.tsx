import { Alert, ScrollView, Text, View } from "react-native";
import AccordionCard from "./AccordionCard";
import { AccordionCardProps, AccordionContainerProps, historyType, MineCardProps } from "@/types/types";
import { itemList } from "@/styles/components/itemList";
import { useEffect, useRef, useState } from "react";
import { axiosGet } from "@/api";
import useUrl from "@/hooks/useUrl";
import { Common } from "@/styles/common";

const AccordionCardContainer = (props: AccordionContainerProps) => {
    const {type} = props;
    const page = useRef(0);
    const [data, setData] = useState<AccordionCardProps[]>([]);

    useEffect(() => {
        type==="OTHERS" ? fetchHistory() : fetchMine();
        page.current = 0;
    }, []);
    
    const fetchMine = async () => {
        try {
            const response = await axiosGet(`/api/v1/members/me`);
            setData(response.data.ownedRentals);   
            page.current++;    
        }
        catch (error) {
            Alert.alert(`${error}`);
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
            setData(response.data.content);
            page.current++;
        }
        catch (error) {
            Alert.alert(`${error}`);
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
            <View style={[itemList.listContainer, {paddingBottom: 64}]}>
            {data && data.length>0?
            data.map((item: AccordionCardProps) => {
                return(
                    <>
                    <AccordionCard 
                        type={type}
                        key={item.rentalId}
                        rentalId={item.rentalId}
                        itemId={item.itemId}
                        requestDate={item.requestDate}
                        status={item.status}
                    />
                    <View style={[itemList.rowDivider, {marginBottom: 16}]} />
                    </>
                )}) : 
                <View style={[Common.wrapper, {backgroundColor: "white", alignItems: "center"}]}>
                    <Text>표시할 데이터가 없습니다.</Text>
                </View>        
                }
            </View>
        </ScrollView>
    );
}

export default AccordionCardContainer;
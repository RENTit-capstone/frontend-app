import { ScrollView, View } from "react-native";
import AccordionCard from "./AccordionCard";
import {AccordionCardProps, ActionType, RentalDetailsType, RentalStatusType} from "@/types/types";
import { itemList } from "@/styles/components/itemList";
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { axiosGet, axiosPost } from "@/api";
import { generateUrl } from "@/utils/generateUrl";
import useUrl from "@/hooks/useUrl";

const AccordionCardContainer = () => {
    const router = useRouter();
    const [page, setPage] = useState(0);
    const [data, setData] = useState<AccordionCardProps[]>([]);

    useEffect(() => {
        fetchHistory();
    }, []);

    const fetchHistory = async () => {
        const params = useUrl({
            stauts: ["REQUESTED", "APPROVED"],
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

    const fetchDetails = async (itemId: number) => {
        try { 
            const response = await axiosGet(`/api/v1/rentals/${itemId}`);
            const details: RentalDetailsType = response.data;
            console.log("Response for fetchDetails: ", details);
            return details || ["detials"];    // "details" -> dummy
        }
        catch(error) {
            console.error(error);
        }   
    }

    const submitApprove = async (rentalId: number, isApproved: boolean=false) => {
        const approvement = isApproved? "approve" : "reject";
        try {
            const response = await axiosPost(`/api/v1/rentals/${rentalId}/${approvement}`);
            console.log("Response for submitApprovee: ", response.data);
            // TODO: button 비활성화로 만들고 toastMessage 띄우기
        }
        catch(error) {
            console.error(error);
        }
    }

    const handleReturn = () => {
        router.navigate("/myPage/otp");
        console.log("반납");
    }

    const handleWriteReview = () => {
        console.log("후기작성");
    }

    const handleUnknownAction = () => {
        console.log("unknown action");
    }

    const determineAction = (status: RentalStatusType) => {
        if (status==="REQUESTED")         
            return {
                actions: ["approve", "disapprove"] as ActionType[],
                actionName: ["승인", "거절"], 
                handler: submitApprove,
            };
        else if (status==="inRent")     
            return {
                actions: ["return"] as ActionType[], 
                actionName: ["반납하기"], 
                handler: handleReturn
            };
        else if (status==="returned")   
            return {
                actions: ["writeReview"] as ActionType[], 
                actionName: ["후기작성"], 
                handler: handleWriteReview
            };
        else                            
            return {
                actions: undefined, 
                actionName: ["null"], 
                handler: handleUnknownAction
            };
    }

    return (
        <ScrollView>
            <View style={itemList.listContainer}>
            {data.map((item: AccordionCardProps) => {
                const actionByStatus = determineAction(item.status);

                return(
                    <>
                    <AccordionCard 
                        key={item.rentalId}
                        rentalId={item.rentalId}
                        itemId={item.itemId}
                        requestDate={item.requestDate}
                        status={item.status}

                        actions={actionByStatus.actions}
                        actionNames={actionByStatus.actionName}
                        getDetails={fetchDetails}
                        handleAction={actionByStatus.handler}
                    />
                    <View style={[itemList.rowDivider, {marginBottom: 16}]} />
                    </>
            )})}
            </View>
        </ScrollView>
    );
}

export default AccordionCardContainer;
import { ScrollView, View } from "react-native";
import AccordionCard from "./AccordionCard";
import {AccordionCardProps, AccordionContainerType, ActionType, StatusType} from "@/types/types";
import { itemList } from "@/styles/components/itemList";
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { axiosGet, axiosPost } from "@/api";

const sampleList2: AccordionContainerType[] = [
    {
        id: 0,
        title: "asdf",
        img: "undefined",
        available: false,
        price: 2000,
        period: 3,
        messages: 1,
        likes: 0,
        status: "inRent",
    },
    {
        id: 2,
        title: "asdf",
        img: "undefined",
        available: false,
        price: 2000,
        period: 3,
        messages: 1,
        likes: 0,
        status: "pending",
    },
    {
        id: 3,
        title: "asdf",
        img: "undefined",
        available: false,
        price: 2000,
        period: 3,
        messages: 1,
        likes: 0,
        status: "returned",
    },
]

const AccordionCardContainer = () => {
    const router = useRouter();
    const [data, setData] = useState<AccordionCardProps[]>([]);

    useEffect(() => {

        
        loadData();
    }, []);

    const fetchHistory = () => {
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
    
        const responseData = axiosGet(`/api/v1/rentals?${queryParams}`);
        return responseData;
    };

    const loadData = async () => {
        try {
            const response = await fetchHistory();
            setData(response.data);    
        }
        catch(error) {
            console.error(error);
        }
    };

    const getDetails = () => {
        // detailInfo API 호출
        console.log("getDetails"); 
        return ["details"];       
    }

    const submitApprove = async (itemId: number, isApproved: boolean=false) => {
        const approvement = isApproved? "approve" : "reject";
        const response = await axiosPost(`/api/v1/rentals/${itemId}/${approvement}`);
        
        console.log("submitApprove: ", response);
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

    const determineAction = (status: StatusType) => {
        if (status==="pending")         
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
            {sampleList2.map((item: AccordionContainerType) => {
                const actionByStatus = determineAction(item.status);

                return(
                <AccordionCard 
                    key={item.id}
                    id={item.id}
                    title={item.title}
                    img={item.img}
                    available={item.available}
                    price={item.price}
                    period={item.period}
                    messages={item.messages}
                    likes={item.likes}

                    status={item.status}

                    actions={actionByStatus.actions}
                    actionNames={actionByStatus.actionName}
                    getDetails={getDetails}
                    handleAction={actionByStatus.handler}
                />
            )})}
            <View style={[itemList.rowDivider]} />
            </View>
        </ScrollView>
    );
}

export default AccordionCardContainer;
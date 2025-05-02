import { ScrollView, View } from "react-native";
import AccordionCard from "./AccordionCard";
import {AccordionCardProps, AccordionContainerType, ActionType, StatusType} from "@/types/types";
import { itemList } from "@/styles/components/itemList";
import { useEffect, useState } from "react";
import { fetchHistory } from "@/api/history";
import { useRouter } from "expo-router";

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
        const loadData = async () => {
            try {
                const response = await fetchHistory();
                setData(response.data);    
            }
            catch(error) {
                console.error(error);
            }
        };
        
        loadData();
    }, []);


    const determineAction = (status: StatusType) => {
        if (status==="pending")         
            return {
                actions: ["approve", "disapprove"] as ActionType[],
                actionName: ["승인", "거절"], 
                handler: handleApprove
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

    const getDetails = () => {
        // detailInfo API 호출
        console.log("getDetails"); 
        return ["details"];       
    }

    const handleApprove = (isApproved: boolean) => {
        if (isApproved) {
            console.log("승인");
        }
        else{
            console.log("거절");
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
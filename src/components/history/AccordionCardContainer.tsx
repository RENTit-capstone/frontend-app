import { ScrollView, View } from "react-native";
import AccordionCard from "./AccordionCard";
import {AccordionContainerType, ActionType, StatusType} from "@/types/types";
import { history } from "@/styles/components/history";
import { itemList } from "@/styles/components/itemList";

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
        status: "returned",
    },
]

const AccordionCardContainer = () => {
    const determineAction = (status: StatusType) => {
        if (status==="pending")         return {actions: ["approve", "disapprove"] as ActionType[], handler: handleApprove};
        else if (status==="inRent")     return {actions: ["return"] as ActionType[], handler: handleReturn};
        else if (status==="returned")   return {actions: ["writeReview"] as ActionType[], handler: handleWriteReview};
        else                            return {actions: undefined, handler: handleUnknownAction};
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
    }

    const handleReturn = () => {
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
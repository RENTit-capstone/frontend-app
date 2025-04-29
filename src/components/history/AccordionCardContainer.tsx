import { ScrollView } from "react-native";
import AccordionCard from "./AccordionCard";
import {AccordionCardProps} from "@/types/types";

const sampleList = [
    { 
        status: "inRent",
        badge: "대여 중",
        action: ["반납하기"],
        details: "상세정보",
        information: {
            user: "빌려준 사람",
            period: "기간",
            fee: "요금",
        }
    },
    {
        status: "returned",
        badge: "반납완료",
        action: ["후기작성"],
        details: "상세정보",
        information: {
            user: "빌려준 사람",
            period: "기간",
            fee: "요금",
        }
    },
    {
        status: "pending",
        badge: "대여요청",
        action: ["승인", "거절"],
        details: "상세정보",
        information: {
            user: "빌리는 사람",
            period: "기간",
            fee: "요금",
            checked: "파손정책 동의 여부",
        }
    }
];

const AccordionCardContainer = () => {
    const handleAction = () => {
        // action API 호출
        if (status==="inRent" && action[0]==="반납하기"){
            console.log("반납");
        }
        if (status==="returned" && action[0]==="후기작성"){
            console.log("후기작성");
        }
        if (status==="pending" && action[0]==="승인"){
            console.log("승인");
        }
        if (status==="pending" && action[1]==="거절"){
            console.log("거절");
        }
    };

    const handleDetails = () => {
        setOpenDetails(!openDetails);
        // 세부정보 API 호출
    };

    return (
        <ScrollView>
            {sampleList.map((item: AccordionCardProps) => (
                <AccordionCard 
                    id={item.id}
                    title={item.title}
                    img={item.img}
                    available={item.available}
                    price={item.price}
                    period={item.period}
                    messages={item.messages}
                    likes={item.likes}

                    action={item.action}
                    handleAction={handleAction}
                    handleDetails={handleDetails}
                />

            ))}
        </ScrollView>
    );
}

export default AccordionCardContainer;
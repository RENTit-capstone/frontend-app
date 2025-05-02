import { Text, View } from "react-native"
import ListItem from "../itemList/ListItem";
import { useState } from "react";
import Button from "../Button";
import { Common } from "@/styles/common";
import { AccordionCardProps, ActionType, RentalDetailsType } from "@/types/types";
import { history } from "@/styles/components/history";

const AccordionCard = (props: AccordionCardProps) => {
    const {id, title, img,  available, price, period, messages, likes, status, actions, actionNames, getDetails, handleAction} = props;
    const [isOpened, setIsOpened] = useState(false);
    const [details, setDetails] = useState<RentalDetailsType>();

    const handleDetails = async () => {
        if (!isOpened) {
            const response = await getDetails(id);
            setDetails(response);
        }
        setIsOpened(!isOpened);
    }

    const onPress = (itemId: number, action: ActionType) => {
        console.log(itemId, action);
        if (action==="approve") {
            handleAction(itemId, true);
        }
        else if (action==="disapprove") {
            handleAction(itemId, false);
        }
        else {
            handleAction(itemId);
        }
    }

    return (
        <View>
            <ListItem
                id={id}
                title={title}
                img={img}
                available={available}
                price={price}
                period={period}
                messages={messages}
                likes={likes}
            />
            {isOpened &&
                <View>
                    {!details ? (
                        <Text>details</Text>
                    ): ( 
                        <>
                            <Text>빌려준 사람: {details.owner}</Text>
                            <Text>대여 요청 일시: {details.requestDate}</Text>
                            <Text>대여 승인 일시: {details.approvedDate}</Text>
                            <Text>대여 거절 일시: {details.rejectedDate}</Text>
                            <Text>대여 시작 일시: {details.startDate}</Text>
                            <Text>반납 예정 일시: {details.dueDate}</Text>
                            <Text>사물함 보관 일시 : {details.leftByOwnerAt}</Text>
                            <Text>물건 수령 일시: {details.pickedUpByRenterAt}</Text>
                            <Text>반납 일시: {details.returnedByRenterAt}</Text>
                            <Text>물건 회수 일시: {details.retrievedByOwnerAt}</Text>
                            <Text>사물함 번호: {details.lockerId}</Text>
                        </>
                    )}
                </View>
            }

            <View style={Common.XStack}>
                {actions && actions.map((action: ActionType, index) => (
                <Button onPress={() => onPress(id, action)} type="primary" key={action+id} style={history.button}>
                    {actionNames[index]}
                </Button>
                ))}

                <Button onPress={handleDetails} type="secondary" style={history.button}>
                    {isOpened? "닫기" : "상세정보"}
                </Button>
            </View>
        </View>
    );
}

export default AccordionCard;
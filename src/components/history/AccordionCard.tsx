import { Image, Text, View } from "react-native"
import { useEffect, useState } from "react";
import Button from "../Button";
import { Common } from "@/styles/common";
import { AccordionCardProps, ActionType, ItemDetailsProp, RentalDetailsType } from "@/types/types";
import { history } from "@/styles/components/history";
import { axiosGet } from "@/api";
import { itemList } from "@/styles/components/itemList";
import Badge from "../Badge";
import determineAction from "@/utils/determineAction";

const AccordionCard = (props: AccordionCardProps) => {
    const {rentalId, itemId, requestDate, status, actions, actionNames, getDetails, handleAction} = props;
    const [isOpened, setIsOpened] = useState(false);
    const [itemDetails, setItemDetails] = useState<ItemDetailsProp | null>();
    const [details, setDetails] = useState<RentalDetailsType>();

    useEffect(() => {
        const fetchItemDetails = async () => {
            try {
                const response = await axiosGet(`/api/v1/items/${itemId}`);
                setItemDetails(response.data);
            } 
            catch (error) {
                console.error(error);
            }
        }
        fetchItemDetails();
    }, []);

    const handleDetails = async () => {
        if (!isOpened) {64
            const response = await getDetails(rentalId);
            setDetails(response);
        }
        setIsOpened(!isOpened);
    }


    if (!itemDetails)   return null;
    return (
        <View>
            <View style={[Common.XStack, itemList.cardWrapper]}>
                <Image source={require("@/assets/images/icon.png")} style={itemList.listItemImage}/>

                <View style={[Common.wideView, {gap: 5}]}>
                    <Badge status={status} />
                    <Text style={{fontSize: 19}}>{itemDetails.name}</Text>
                    <View style={[Common.textWrapper]}>
                        <Text style={{fontSize: 19, fontWeight: 600}}>{itemDetails.price.toLocaleString()}</Text>
                        <Text style={{fontSize: 19}}> 원</Text>
                    </View>

                    <View style={[Common.textOption]}>
                        <Text style={{fontSize: 16}}>대여 요청 일시: {requestDate}</Text>
                    </View>
                </View>
            </View>

            {isOpened &&
                <View>
                    {!details ? (
                        <Text></Text>
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
                <Button onPress={() => onPress(rentalId, action)} type="primary" key={rentalId} style={history.button}>
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
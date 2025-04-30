import { Text, View } from "react-native"
import ListItem from "../itemList/ListItem";
import { useState } from "react";
import Button from "../Button";
import { Common } from "@/styles/common";
import { AccordionCardProps, ActionType } from "@/types/types";
import { history } from "@/styles/components/history";

const AccordionCard = (props: AccordionCardProps) => {
    const {status, actions, actionNames, getDetails, handleAction} = props;
    const [isOpened, setIsOpened] = useState(false);
    const [details, setDetails] = useState([""]);

    const handleDetails = () => {
        if (!isOpened) {
            const response = getDetails();
            setDetails(response);
        }
        setIsOpened(!isOpened);
    }

    const onPress = (itemId: number, action: ActionType) => {
        console.log(itemId, action);
        if (action==="approve") {
            handleAction(true);
        }
        else if (action==="disapprove") {
            handleAction(false);
        }
        else {
            handleAction(false);
        }
    }

    return (
        <View>
            <ListItem
                id={props.id}
                title={props.title}
                img={props.img}
                available={props.available}
                price={props.price}
                period={props.period}
                messages={props.messages}
                likes={props.likes}
            />
            {isOpened &&
                <View>
                    <Text>{details}</Text>
                </View>
            }

            <View style={Common.XStack}>
                {actions && actions.map((action: ActionType, index) => (
                <Button onPress={() => onPress(props.id, action)} type="primary" key={action+props.id} style={history.button}>
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
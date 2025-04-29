import { Text, View } from "react-native"
import ListItem from "../itemList/ListItem";
import { useState } from "react";
import Button from "../Button";
import { Common } from "@/styles/common";
import { AccordionCardProps } from "@/types/types";

const AccordionCard = (props: AccordionCardProps) => {
    const {action, handleAction, handleDetails} = props;
    const [openDetails, setOpenDetails] = useState(true);

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
            {openDetails &&
                <View>
                    <Text>details</Text>
                </View>
            }

            <View style={Common.XStack}>
                {action.map((actionItem: string) => (
                <Button onPress={() => handleAction(props.id, actionItem)} type="primary">
                    {actionItem}
                </Button>
                ))}

                <Button onPress={() => handleDetails()} type="secondary">
                    {openDetails? "닫기" : "상세정보"}
                </Button>
            </View>
        </View>
    );
}

export default AccordionCard;
import { Common } from "@/styles/common";
import { itemList } from "@/styles/components/itemList";
import { useLocalSearchParams } from "expo-router";
import { Image, Text } from "react-native"
import { ItemDetailsProp } from "@/types/types";
import { useEffect, useState } from "react";
import { axiosGet } from "@/api";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomScrollSheet from "@/components/BottomScrollSheet";
import ItemDetails from "@/components/itemList/ItemDetails";
import { View } from "react-native";
import DateSelector from "@/components/itemList/DateSelector";
import useRequestStore from "@/stores/useRequestStore";

const sampleData: ItemDetailsProp = {
    id: 0,
    owner: "string", 
    name: "string",
    itemImg: "string", 
    description: "string",
    price: 5000, 
    status: "OUT",
    damagedPolicy: "string",
    startDate: "string",
    endDate: "string",
    messages: 2, 
    likes: 3,
}

const Postings = () => {
    const { id } = useLocalSearchParams();
    const [data, setData] = useState<ItemDetailsProp>(sampleData);
    const setStoredId = useRequestStore((state) => state.setStoredId);

    useEffect(() => {
        setStoredId(id);
        fetchItemDetails();
    }, []);

    const fetchItemDetails = async () => {
        try {
            const response = await axiosGet(`/api/v1/items/${id}`);
            console.log("Response for fetchItemDetails: ", response.data);
            setData(response.data);
        }
        catch(error) {
            console.error(error);
        }
    }

    return (
        <GestureHandlerRootView style={Common.container}>
            <Image source={require("@/assets/images/icon.png")} style={itemList.detailImage} />
            
            <BottomScrollSheet snapPointList={["50%", "60%", "70%", "80%"]}>
                <ItemDetails
                    id={id}
                    owner="string" 
                    name="string"
                    itemImg="string" 
                    description="string"
                    price={5000} 
                    status="OUT"
                    damagedPolicy="string"
                    startDate="string"
                    endDate="string"
                    messages={2} 
                    likes={3}
                />
            </BottomScrollSheet>
            <DateSelector />
        </GestureHandlerRootView>
    )
}  

export default Postings;


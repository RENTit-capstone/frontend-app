import { Common } from "@/styles/common";
import { itemList } from "@/styles/components/itemList";
import { useLocalSearchParams } from "expo-router";
import { Image, Text } from "react-native"
import { ItemDetailsProp } from "@/types/types";
import { useEffect, useState } from "react";
import { axiosGet, axiosPost } from "@/api";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomScrollSheet from "@/components/BottomScrollSheet";
import ItemDetails from "@/components/items/ItemDetails";
import useRequestStore from "@/stores/useRequestStore";
import ItemDetailsBottomSheet from "@/components/items/ItemDetailsBottomSheet";

const sampleData: ItemDetailsProp = {
    itemId: 0,
    owner: "string", 
    ownerId: 0,
    name: "string",
    itemImg: "string", 
    description: "string",
    price: 5000, 
    status: "OUT",
    damagedPolicy: "string",
    returnPolicy: "string",
    startDate: "string",
    endDate: "string",
    messages: 2, 
    likes: 3,
}

const Postings = () => {
    const { id } = useLocalSearchParams<{id: string}>();
    const [data, setData] = useState<ItemDetailsProp>(sampleData);
    const {startDate, endDate, clearRecord} = useRequestStore();

    useEffect(() => {
        fetchItemDetails();
        return () => clearRecord();
    }, []);

    const fetchItemDetails = async () => {
        try {
            const response = await axiosGet(`/api/v1/items/${parseInt(id)}`);
            console.log("Response for fetchItemDetails: ", response.data);
            setData(response.data);
        }
        catch(error) {
            console.error(error);
        }
    }

    const handleRequest = async () => {
        try {
            const payload = {
                "itemId": parseInt(id),
                "ownerId": data.ownerId,
                "renterId" :0,
                "startDate": startDate, //ISOstring으로 변경
                "dueDate": endDate,
            }
            const response = await axiosPost(`/api/v1/rentals`, payload);
            console.log("Response for submitRequest: ", response.data);
        }
        catch(error) {
            console.log(error);     //TODO: toast message 띄우기
        }  
    }


    return (
        <GestureHandlerRootView style={Common.container}>
            <Image source={require("@/assets/images/icon.png")} style={itemList.detailImage} />
            
            <BottomScrollSheet snapPointList={["50%", "60%", "70%", "80%"]}>
                <ItemDetails
                    itemId={parseInt(id)}
                    owner="string" 
                    ownerId={0}
                    name="string"
                    itemImg="string" 
                    description="string"
                    price={5000} 
                    status="OUT"
                    damagedPolicy="string"
                    returnPolicy="string"
                    startDate="string"
                    endDate="string"
                    messages={2} 
                    likes={3}
                />
            </BottomScrollSheet>

            <ItemDetailsBottomSheet />
        </GestureHandlerRootView>
    )
}  

export default Postings;


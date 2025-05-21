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
import ItemDetailsButtonBar from "@/components/items/ItemDetailsButtonBar";

const Postings = () => {
    const { id } = useLocalSearchParams<{id: string}>();
    const [data, setData] = useState<ItemDetailsProp>();
    const {startDate, endDate, clearRecord} = useRequestStore();

    useEffect(() => {
        fetchItemDetails();
        return () => clearRecord();
    }, []);

    const fetchItemDetails = async () => {
        try {
            console.log(`ID: ${id}`)
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
                    itemId={0}
                    profileImg="string"
                    nickname="string"
                    name="string"
                    imageUrls={["string"]} 
                    description="string"
                    damagedDescription="string"
                    price={5000}
                    status="AVAILABLE"
                    damagedPolicy="string"
                    returnPolicy="string"
                    startDate="string"
                    endDate="string"
                    createdAt="string"
                    updatedAt="string"
                />
            </BottomScrollSheet>
            <ItemDetailsButtonBar handleRequest={handleRequest}/>
        </GestureHandlerRootView>
    )
}  

export default Postings;


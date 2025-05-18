import useRequestStore from "@/stores/useRequestStore";
import BottomScrollSheet from "../BottomScrollSheet";
import { Text, View } from "react-native";
import { Common } from "@/styles/common";
import Cancel from "@/assets/images/cancel.svg";
import Button from "../Button";
import { useEffect, useState } from "react";
import ItemDetailsButtonBar from "./ItemDetailsButtonBar";
import useDateSelectorStore from "@/stores/useDateSelectorStore";

const ItemDetailsBottomSheet = (props: any) => {
    const {handleRequest} = props;
    const {phase, setChecked} = useRequestStore();

    const handleCancel = () => {

    }

    return (
        <>

            <ItemDetailsButtonBar handleRequest={handleRequest}/>
        </>
    );
}

export default ItemDetailsBottomSheet;
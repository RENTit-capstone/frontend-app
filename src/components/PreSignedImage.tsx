import { axiosGet } from "@/api";
import { useEffect, useState } from "react"
import { ActivityIndicator, Image, Text, View } from "react-native";

type ImageProps = {
    imageUrl: string,
}

const PreSignedImage = (props: ImageProps) => {
    const [loading, setLoading] = useState<boolean>(true);
    const {imageUrl} = props;
    useEffect(() => {
        
    });
    if (loading){
        return (
            <View>
                <ActivityIndicator size="large" />
                <Text>이미지를 불러오는 중...</Text>
            </View>
        );
    }

    if (!imageUrl){
        return (
            <View>
                <Text>이미지를 불러올 수 없습니다</Text>
            </View>
        );
    }

    return (
        <Image
            source={{uri: imageUrl}}
            resizeMode="contain"
        />
    )
}
export default PreSignedImage;
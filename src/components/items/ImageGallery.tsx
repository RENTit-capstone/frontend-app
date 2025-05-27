import { useRef, useState } from 'react';
import {
    View,
    Dimensions,
    Image,
    NativeScrollEvent,
    NativeSyntheticEvent,
    Text,
} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

type ImageGalleryProps = {
    imgUrls: string[] | undefined;
};

const { width } = Dimensions.get('window');

const ImageGallery = (props: ImageGalleryProps) => {
    const { imgUrls } = props;
    const [current, setCurrent] = useState(0);
    const flatListRef = useRef<FlatList>(null);

    const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const slide = Math.round(event.nativeEvent.contentOffset.x / width);
        setCurrent(slide);
    };

    if (!imgUrls)
        return (
            <View>
                <Text>이미지가 존재하지 않습니다.</Text>
            </View>
        );

    return (
        <View>
            <FlatList
                ref={flatListRef}
                data={imgUrls}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onScroll={handleScroll}
                scrollEventThrottle={16}
                keyExtractor={(_, index) => index.toString()}
                renderItem={({ item }) => (
                    <Image
                        source={{ uri: item }}
                        style={{ width, height: 250, resizeMode: 'cover' }}
                    />
                )}
            />
            <View style={{ alignItems: 'center', marginTop: 8 }}>
                <Text>
                    {current + 1} / {imgUrls.length}
                </Text>
            </View>
        </View>
    );
};

export default ImageGallery;

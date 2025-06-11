import { useRef, useState } from 'react';
import {
    View,
    Image,
    NativeScrollEvent,
    NativeSyntheticEvent,
    Text,
    useWindowDimensions,
    Pressable,
} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

type ImageGalleryProps = {
    imgUrls: string[] | undefined;
    fullScreen?: boolean;
    handleScrollBegin?: () => void;
    handleScrollEnd?: () => void;
};

const ImageGallery = (props: ImageGalleryProps) => {
    const { width, height } = useWindowDimensions();

    const { imgUrls, fullScreen } = props;
    const [current, setCurrent] = useState(0);
    const flatListRef = useRef<FlatList>(null);

    const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const slide = Math.round(event.nativeEvent.contentOffset.x / width);
        setCurrent(slide);
    };

    if (!imgUrls) return;

    return (
        <Pressable
            disabled={!fullScreen}
            style={{
                flex: 1,
                backgroundColor: fullScreen ? 'rgba(0,0,0,0.9)' : 'black',
            }}
        >
            <FlatList
                ref={flatListRef}
                data={imgUrls}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onScroll={handleScroll}
                scrollEventThrottle={16}
                keyExtractor={(_, index) => index.toString()}
                onScrollBeginDrag={props.handleScrollBegin}
                onScrollEndDrag={props.handleScrollEnd}
                renderItem={({ item }) => (
                    <View
                        style={{
                            width: width,
                        }}
                    >
                        <Image
                            source={{ uri: item }}
                            style={{
                                width: width,
                                height: fullScreen ? height : height / 2,
                            }}
                            resizeMode="contain"
                        />
                    </View>
                )}
            />
            <View style={{ alignItems: 'center', marginTop: 8 }}>
                <Text>
                    {current + 1} / {imgUrls.length}
                </Text>
            </View>
        </Pressable>
    );
};

export default ImageGallery;

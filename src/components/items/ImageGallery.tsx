import { useEffect, useRef, useState } from 'react';
import {
    View,
    Dimensions,
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
    const windowDims = useWindowDimensions();
    const [screenWidth, setScreenWidth] = useState(windowDims.width); // 아이패드 기본값
    const [screenHeight, setScreenHeight] = useState(windowDims.height);

    const { imgUrls, fullScreen } = props;
    const [current, setCurrent] = useState(0);
    const flatListRef = useRef<FlatList>(null);

    useEffect(() => {
        const checkDimensions = () => {
            setTimeout(() => {
                const screen = Dimensions.get('screen');
                setScreenWidth(screen.width);
                setScreenHeight(screen.height);
                console.log('Screen dimensions updated:', screen.width, screen.height);
            }, 50);
        };
        checkDimensions();

        // const updateDimensions = () => {
        //     const screen = Dimensions.get('screen');
        //     setScreenWidth(screen.height);
        //     setScreenHeight(screen.width);
        // };

        // 화면 회전 감지
        // const subscription = Dimensions.addEventListener('change', updateDimensions);
        const subscription = Dimensions.addEventListener('change', checkDimensions);
        return () => {
            subscription?.remove();
        };
    }, [current]);

    const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const slide = Math.round(event.nativeEvent.contentOffset.x / screenWidth);
        setCurrent(slide);
    };

    if (!imgUrls) return;

    return (
        <Pressable
            disabled={!fullScreen}
            style={{
                flex: 1,
                backgroundColor: fullScreen ? 'rgba(0,0,0,0.9)' : 'black',
                // width: '100%',
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
                            width: screenWidth,
                        }}
                    >
                        <Image
                            source={{ uri: item }}
                            style={{
                                width: screenWidth,
                                height: fullScreen ? screenHeight : screenHeight / 2,
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

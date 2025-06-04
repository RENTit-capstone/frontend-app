import { Common } from '@/styles/common';
import { Pressable } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomScrollSheet from '@/components/BottomScrollSheet';
import ItemDetails from '@/components/items/ItemDetails';
import ItemDetailsButtonBar from '@/components/items/ItemDetailsButtonBar';
import ImageGallery from '@/components/items/ImageGallery';
import usePostings from '@/hooks/usePostings';
import { useRouter } from 'expo-router';
import { useState } from 'react';

const Postings = () => {
    const { data, handleRequest } = usePostings();
    const [isScrolling, setIsScrolling] = useState(false);

    const router = useRouter();

    if (!data) return;

    const handleScrollBegin = () => setIsScrolling(true);
    const handleScrollEnd = () => setIsScrolling(false);

    const handlePress = () => {
        if (isScrolling) return;
        router.push({
            pathname: `/modal/imageGallery`,
            params: {
                images: JSON.stringify(data.imageUrls),
            },
        });
    };

    return (
        <GestureHandlerRootView style={Common.container}>
            <Pressable
                onPress={handlePress}
                style={{
                    flex: 1,
                }}
            >
                <ImageGallery imgUrls={data.imageUrls} />
            </Pressable>
            <BottomScrollSheet snapPointList={['50%', '60%', '70%', '80%']}>
                <ItemDetails {...data} />
            </BottomScrollSheet>
            <ItemDetailsButtonBar
                handleRequest={handleRequest}
                handleScrollBegin={handleScrollBegin}
                handleScrollEnd={handleScrollEnd}
            />
        </GestureHandlerRootView>
    );
};

export default Postings;

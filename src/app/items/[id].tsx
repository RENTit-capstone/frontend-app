import { Common } from '@/styles/common';
import { Pressable } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomScrollSheet from '@/components/BottomScrollSheet';
import ItemDetails from '@/components/items/ItemDetails';
import ItemDetailsButtonBar from '@/components/items/ItemDetailsButtonBar';
import ImageGallery from '@/components/items/ImageGallery';
import usePostings from '@/hooks/usePostings';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import useAuthStore from '@/stores/useAuthStore';
import { useMenuStore } from '@/stores/useMenuStore';

const Postings = () => {
    const { data } = usePostings();
    const [isScrolling, setIsScrolling] = useState(false);
    const { userId } = useAuthStore();
    const router = useRouter();

    if (!data) return;

    const setMenuItems = useMenuStore((state) => state.setMenuItems);

    useEffect(() => {
        setMenuItems([
            {
                label: '수정하기',
                onPress: () => router.push('myPage/item/modify'),
            },
            {
                label: '삭제하기',
                onPress: () => router.push('myPage/item/delete'),
            },
        ]);

        return () => setMenuItems([]); // 페이지 떠날 때 정리
    }, []);

    const isMine = userId === data.owner.memberId;
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
                <ImageGallery
                    imgUrls={data.imageUrls}
                    handleScrollBegin={handleScrollBegin}
                    handleScrollEnd={handleScrollEnd}
                />
            </Pressable>
            <BottomScrollSheet snapPointList={['50%', '60%', '70%', '80%']}>
                <ItemDetails {...data} />
            </BottomScrollSheet>
            {!isMine && <ItemDetailsButtonBar />}
        </GestureHandlerRootView>
    );
};

export default Postings;

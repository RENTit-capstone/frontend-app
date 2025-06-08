import { Common } from '@/styles/common';
import { Alert, Pressable } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomScrollSheet from '@/components/BottomScrollSheet';
import ItemDetails from '@/components/items/ItemDetails';
import ItemDetailsButtonBar from '@/components/items/ItemDetailsButtonBar';
import ImageGallery from '@/components/items/ImageGallery';
import usePostings from '@/hooks/usePostings';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import useAuthStore from '@/stores/useAuthStore';
import { useMenuStore } from '@/stores/useMenuStore';
import { axiosDelete } from '@/api';

const Postings = () => {
    const { id } = useLocalSearchParams();
    const { data } = usePostings();
    const [isScrolling, setIsScrolling] = useState(false);
    const { userId } = useAuthStore();
    const router = useRouter();

    const setMenuItems = useMenuStore((state) => state.setMenuItems);
    const isMine = userId === data?.owner.memberId;

    useEffect(() => {
        if (!data) return;

        const menu = isMine
            ? [
                  {
                      label: '수정',
                      onPress: () => {
                          router.push({
                              pathname: '/items/new',
                              params: {
                                  itemId: id,
                                  name: data.name,
                                  itemImg: JSON.stringify(data.imageUrls),
                                  imageKeys: JSON.stringify(data.imageKeys),
                                  damagedDescription: data.damagedDescription,
                                  description: data.description,
                                  price: data.price,
                                  damagedPolicy: data.damagedPolicy,
                                  returnPolicy: data.returnPolicy,
                              },
                          });
                      },
                  },
                  {
                      label: '삭제',
                      onPress: handleDelete,
                  },
              ]
            : [
                  {
                      label: '신고',
                      onPress: () => router.push('/myPage/qna/NewQnA'),
                  },
              ];
        setMenuItems(menu);

        return () => setMenuItems([]); // 페이지 떠날 때 정리
    }, [data, isMine]);

    if (!data) return null;

    const handleDelete = async () => {
        try {
            const response = await axiosDelete(`/api/v1/items/${id}`);
        } catch (error) {
            Alert.alert('게시글을 삭제할 수 없습니다', '잠시 후 다시 시도해주세요');
            console.error(error);
        }
    };

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

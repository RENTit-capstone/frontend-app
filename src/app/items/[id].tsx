import { Common } from '@/styles/common';
import { ActivityIndicator } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomScrollSheet from '@/components/BottomScrollSheet';
import ItemDetails from '@/components/items/ItemDetails';
import ItemDetailsButtonBar from '@/components/items/ItemDetailsButtonBar';
import ImageGallery from '@/components/items/ImageGallery';
import usePostings from '@/hooks/usePostings';

const Postings = () => {
    const { data, handleRequest } = usePostings();

    if (!data) return <ActivityIndicator />;

    return (
        <GestureHandlerRootView style={Common.container}>
            <ImageGallery imgUrls={data.imageUrls} />
            <BottomScrollSheet snapPointList={['50%', '60%', '70%', '80%']}>
                <ItemDetails {...data} />
            </BottomScrollSheet>
            <ItemDetailsButtonBar handleRequest={handleRequest} />
        </GestureHandlerRootView>
    );
};

export default Postings;

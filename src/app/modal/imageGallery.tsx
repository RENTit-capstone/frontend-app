// app/modal/image-gallery.tsx
import { View, Modal, Pressable } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import ImageGallery from '@/components/items/ImageGallery';
import Cancel from '@/assets/images/cancel-white.svg';
import { Common } from '@/styles/common';

const ImageGalleryModal = () => {
    const router = useRouter();
    const { images, initialIndex } = useLocalSearchParams();
    const parsedImages: string[] = images
        ? JSON.parse(typeof images === 'string' ? images : '[]')
        : [];

    if (!images) return;

    return (
        <View style={Common.container}>
            <Pressable
                onPress={() => router.back()}
                style={{
                    position: 'absolute',
                    top: 40,
                    right: 20,
                    zIndex: 10,
                    padding: 8,
                    borderRadius: 20,
                }}
            >
                <Cancel />
            </Pressable>
            <ImageGallery imgUrls={parsedImages} fullScreen />
        </View>
    );
};
export default ImageGalleryModal;

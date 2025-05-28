import { Common } from '@/styles/common';
import { Text, View } from 'react-native';

const Product = () => {
    return (
        <View style={[Common.container, Common.wrapper]}>
            <Text>포인트 구매</Text>
            <View style={Common.XStack}>
                <View style={[Common.YStack, { flex: 1 }]}>
                    <Text>1000포인트</Text>
                </View>
                <View style={[Common.YStack, { flex: 1 }]}>
                    <Text>1000원</Text>
                </View>
            </View>
        </View>
    );
};
export default Product;

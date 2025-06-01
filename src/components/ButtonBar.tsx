import { SafeAreaView, View } from 'react-native';
import { Common } from '@/styles/common';

const ButtonBar = (props: any) => {
    const { children } = props;
    return (
        <SafeAreaView style={[Common.bottomBar, Common.upperShadow, { backgroundColor: 'white' }]}>
            <View style={[Common.XStack, { paddingHorizontal: 16 }]}>{children}</View>
        </SafeAreaView>
    );
};
export default ButtonBar;

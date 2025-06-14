import { ScrollView, Text, View } from 'react-native';
import { Common } from '@/styles/common';
import Checkbox from 'expo-checkbox';
import { itemList } from '@/styles/components/itemList';
import { useBottomSheetStore } from '@/stores/useBottomSheetStore';
import { useEffect, useState } from 'react';
import Markdown from 'react-native-markdown-display';
import DefaultDamagePolicy from '@/components/items/DefaultDamagePolicy';
import useRequestStore from '@/stores/useRequestStore';
import { Colors } from '@/styles/tokens';

const PolicyModal = () => {
    const { visible, setResult } = useBottomSheetStore();
    const [damagedDescriptionPolicy, setDamagedDescriptionPolicy] = useState(false);
    const [damagePolicy, setDamagePolicy] = useState(false);
    const [returnPolicy, setReturnPolicy] = useState(false);
    const { itemData } = useRequestStore();

    useEffect(() => {
        setResult({
            damagedDescriptionPolicy: damagedDescriptionPolicy,
            damagePolicy: damagePolicy,
            returnPolicy: returnPolicy,
        });
    }, [damagedDescriptionPolicy, damagePolicy, returnPolicy]);

    if (!visible) return null;

    return (
        <ScrollView style={[Common.wrapper, { marginBottom: 120 }]}>
            <View style={{ alignItems: 'center', paddingVertical: 15 }}>
                <Text style={{ fontSize: 18, fontWeight: 500 }}>하자 및 파손정책 동의</Text>
            </View>

            <ScrollView
                style={[
                    Common.wrapper,
                    {
                        borderColor: Colors.darkGray,
                        borderWidth: 1,
                        borderRadius: 8,
                        marginVertical: 10,
                    },
                ]}
            >
                <Text>{itemData.returnPolicy}</Text>
            </ScrollView>
            <View style={Common.XStack}>
                <Checkbox
                    value={returnPolicy}
                    onValueChange={setReturnPolicy}
                    hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
                />

                <Text>반납정책을 확인하였습니다.</Text>
            </View>
            <View style={[itemList.rowDivider, { marginVertical: 15, width: '100%' }]} />

            <ScrollView
                style={[
                    Common.wrapper,
                    {
                        borderColor: Colors.darkGray,
                        borderWidth: 1,
                        borderRadius: 8,
                        marginVertical: 10,
                    },
                ]}
            >
                <Text>{itemData.damagedDescription}</Text>
            </ScrollView>
            <View style={Common.XStack}>
                <Checkbox
                    value={damagedDescriptionPolicy}
                    onValueChange={setDamagedDescriptionPolicy}
                    hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
                />

                <Text>하자를 확인하였습니다.</Text>
            </View>
            <View style={[itemList.rowDivider, { marginVertical: 15, width: '100%' }]} />

            <ScrollView
                style={[
                    Common.wrapper,
                    {
                        height: 250,
                        borderColor: Colors.darkGray,
                        borderWidth: 1,
                        borderRadius: 8,
                        marginVertical: 10,
                    },
                ]}
            >
                <Markdown>{DefaultDamagePolicy}</Markdown>
            </ScrollView>
            <View style={Common.XStack}>
                <Checkbox
                    value={damagePolicy}
                    onValueChange={setDamagePolicy}
                    hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
                />
                <Text>파손정책에 동의합니다.</Text>
            </View>
        </ScrollView>
    );
};
export default PolicyModal;

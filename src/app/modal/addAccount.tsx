import { View, Pressable, Alert, useWindowDimensions } from 'react-native';
import Cancel from '@/assets/images/cancel.svg';
import { Common } from '@/styles/common';
import { Text } from 'react-native';
import Button from '@/components/Button';
import { useEffect, useState } from 'react';
import TextInput from '@/components/CustomTextInput';
import { TextThemes } from '@/styles/theme';
import { axiosPost } from '@/api';
import useAuthStore from '@/stores/useAuthStore';
import { ModalProps } from '@/types/types';
import KeyboardAvoidingView from '@/components/KeyboardAvoidingView';

const AddAccountModal = (props: ModalProps) => {
    const { visible, onClose } = props;
    const [accountNumber, setAccountNumber] = useState('');
    const { userId } = useAuthStore();

    const { width, height } = useWindowDimensions();

    const handleRegister = async () => {
        try {
            const payload = {
                memberId: userId,
                finAcno: accountNumber,
                bankCode: '011',
            };
            console.log('계좌 등록 요청:', payload);
            const response = await axiosPost('/api/v1/wallet', payload);
            console.log(response.data);
            Alert.alert('계좌 등록이 완료되었습니다.', '결제를 진행해주세요');
            onClose();
        } catch (error) {
            console.error('계좌 등록 실패:', error);
            Alert.alert('계좌 등록에 실패했습니다. 다시 시도해주세요.');
        }
    };

    const handleCancel = () => {
        Alert.alert('계좌 등록을 취소하시겠습니까?', '', [
            {
                text: '아니요',
                style: 'cancel',
            },
            {
                text: '네',
                onPress: () => onClose(),
            },
        ]);
    };

    if (!visible) return null;

    return (
        <KeyboardAvoidingView
            style={{
                // backgroundColor: 'red',
                position: 'absolute',
                width: width,
                height: height,
                flex: 1,
                justifyContent: 'center',
                backgroundColor: 'rgba(0,0,0,0.5)',
                alignItems: 'center',
                zIndex: 1000,
            }}
        >
            <View
                style={{
                    width: '80%',
                    height: '50%',
                    backgroundColor: 'white',
                    borderRadius: 16,
                    padding: 20,
                    justifyContent: 'space-between',
                }}
            >
                <Text style={[Common.bold, { textAlign: 'center' }]}>결제 계좌 등록</Text>
                <Pressable
                    onPress={handleCancel}
                    style={{
                        position: 'absolute',
                        top: 10,
                        right: 20,
                        zIndex: 10,
                        padding: 8,
                        borderRadius: 20,
                    }}
                >
                    <Cancel />
                </Pressable>
                <TextInput
                    label="은행"
                    name="bankName"
                    value={'농협'}
                    handleChangeText={() => {}}
                    keyboardType="number-pad"
                    // style={{ marginBottom: 0 }}
                />
                <Text style={[TextThemes.error]}>현재 은행은 농협만 제공됩니다</Text>
                <TextInput
                    label="계좌번호"
                    name="accountNumber"
                    value={accountNumber}
                    handleChangeText={setAccountNumber}
                    keyboardType="decimal-pad"
                />
                <View style={Common.XStack}>
                    <Button type="secondary" onPress={handleCancel}>
                        취소
                    </Button>
                    <Button type="primary" onPress={handleRegister}>
                        등록
                    </Button>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
};
export default AddAccountModal;

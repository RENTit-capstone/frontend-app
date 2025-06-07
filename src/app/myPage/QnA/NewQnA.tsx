import { axiosPost } from '@/api';
import useAuthStore from '@/stores/useAuthStore';
import { Alert, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import KeyboardAvoidingView from '../../../components/KeyboardAvoidingView';
import { useState } from 'react';
import { Common } from '@/styles/common';
import TextInput from '../../../components/CustomTextInput';
import Button from '../../../components/Button';
import { useRouter } from 'expo-router';
import DropDown from '@/components/Dropdown';
import DownArrow from '@/assets/images/down-arrow.svg';
import { itemList } from '@/styles/components/itemList';

const inquiryTypes = [
    { label: '서비스 이용 문의', value: 'SERVICE' },
    { label: '신고/제보 문의', value: 'REPORT' },
    { label: '파손 신고', value: 'DAMAGE' },
];

const NewQnA = () => {
    const { userId } = useAuthStore();
    const [selectedType, setSelectedType] = useState<string | null>(null);
    const [isTypeOpen, setIsTypeOpen] = useState(false);
    const router = useRouter();
    const [form, setForm] = useState({
        title: '',
        content: '',
        type: '',
    });
    const [image, setImage] = useState('');

    const handleChange = (name: string) => (text: string) => {
        setForm({ ...form, [name]: text });
    };

    const handleSubmit = async () => {
        const payload = {
            // memberId: userId,
            title: form.title,
            content: form.content,
            type: selectedType,
        };
        try {
            const response = await axiosPost(`/api/v1/inquiries`, payload);
            Alert.alert('문의글 작성이 완료되었습니다');
            router.replace('/myPage/qna/MyQnA');
        } catch (error) {
            Alert.alert(`누락된 항목이 없는지 확인해주세요`);
            console.error(error);
        }
    };

    const handleCancel = () => {
        Alert.alert(
            '문의 작성을 취소하시겠습니까?',
            '입력하신 내용이 삭제됩니다',
            [
                {
                    text: '취소',
                    style: 'cancel',
                },
                {
                    text: '확인',
                    onPress: () => router.replace('/(tabs)/itemList'),
                },
            ],
            { cancelable: false },
        );
    };

    return (
        <KeyboardAvoidingView>
            <ScrollView style={Common.wrapper}>
                <TextInput
                    label="제목"
                    name="title"
                    handleChangeText={handleChange('title')}
                    value={form.title}
                />
                <View style={{ marginBottom: 24 }}>
                    <Text>문의 유형</Text>
                    <DropDown
                        label={
                            !selectedType
                                ? '문의 유형 선택'
                                : inquiryTypes.find((type) => type.value === selectedType)?.label
                        }
                        icon={<DownArrow />}
                        onPress={() => setIsTypeOpen(!isTypeOpen)}
                        selectedColor="#111111"
                        style={[Common.textInput, { width: '100%' }]}
                    />

                    {isTypeOpen && (
                        <View
                            style={[
                                itemList.SortDropdown,
                                {
                                    position: 'absolute',
                                    zIndex: 1000,
                                    top: 64,
                                    width: '100%',
                                },
                            ]}
                        >
                            {inquiryTypes.map((option) => (
                                <TouchableOpacity
                                    key={option.value}
                                    onPress={() => {
                                        setSelectedType(option.value);
                                        setIsTypeOpen(false);
                                    }}
                                    style={[
                                        itemList.sortOption,
                                        { alignItems: 'center', paddingVertical: 16 },
                                    ]}
                                >
                                    <Text>{option.label}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    )}
                </View>
                <TextInput
                    label="내용"
                    name="content"
                    handleChangeText={handleChange('content')}
                    value={form.content}
                    multiline={true}
                    style={[Common.textArea, { height: 256 }]}
                />

                <View style={Common.XStack}>
                    <Button type="option" onPress={handleCancel}>
                        취소
                    </Button>
                    <Button type="primary" onPress={handleSubmit}>
                        업로드
                    </Button>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};
export default NewQnA;

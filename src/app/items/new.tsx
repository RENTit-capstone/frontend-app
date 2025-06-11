import Button from '@/components/Button';
import TextInput from '@/components/CustomTextInput';
import { Common } from '@/styles/common';
import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import { itemList } from '@/styles/components/itemList';
import { Colors } from '@/styles/tokens';
import { useNewPosting } from '@/hooks/useNewPosting';
import KeyboardAvoidingView from '@/components/KeyboardAvoidingView';
import formatISOtoDate from '@/utils/formatDateString';
import { useLocalSearchParams } from 'expo-router';

const NewPosting = () => {
    const params = useLocalSearchParams();
    const {
        values,
        handleChange,
        startDate,
        endDate,
        selectedImages,
        handleImageSelect,
        handleDateSelect,
        handleSubmit,
        handleCancel,
        handleModify,
        removeImage,
    } = useNewPosting();

    return (
        <KeyboardAvoidingView>
            <ScrollView style={Common.wrapper}>
                <ScrollView
                    horizontal
                    contentContainerStyle={[Common.XStack, { paddingVertical: 16 }]}
                >
                    <Button
                        type="option"
                        onPress={handleImageSelect}
                        style={itemList.imageSelectButton}
                    >
                        이미지 선택
                    </Button>

                    {selectedImages.map((img) => (
                        <View key={img.uri} style={{ position: 'relative', margin: 5 }}>
                            <Image
                                source={{ uri: img.uri }}
                                style={{ width: 100, height: 100, borderRadius: 8 }}
                            />
                            <TouchableOpacity
                                style={{
                                    position: 'absolute',
                                    top: -8,
                                    right: -8,
                                    width: 24,
                                    height: 24,
                                    borderRadius: 12,
                                    backgroundColor: Colors.red,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    shadowColor: '#000',
                                    shadowOffset: { width: 0, height: 2 },
                                    shadowOpacity: 0.25,
                                    shadowRadius: 3.84,
                                    elevation: 5,
                                }}
                                onPress={() => removeImage(img.uri)}
                            >
                                <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>
                                    ×
                                </Text>
                            </TouchableOpacity>
                        </View>
                    ))}
                </ScrollView>

                <TextInput
                    label="물품명"
                    name="name"
                    handleChangeText={handleChange('name')}
                    value={values.name}
                />
                <TextInput
                    label="가격"
                    name="price"
                    handleChangeText={handleChange('price')}
                    value={values.price}
                    keyboardType="phone-pad"
                />
                <TextInput
                    label="물품 설명"
                    name="description"
                    handleChangeText={handleChange('description')}
                    placeholder="어떤 물품인지 설명해주세요."
                    value={values.description}
                    multiline={true}
                />
                <TextInput
                    label="하자 설명"
                    name="damagedDescription"
                    handleChangeText={handleChange('damagedDescription')}
                    placeholder="기존에 있던 하자를 미리 설명해주세요."
                    value={values.damagedDescription}
                    multiline={true}
                />
                <TextInput
                    label="파손정책"
                    name="damagedPolicy"
                    handleChangeText={handleChange('damagedPolicy')}
                    value={values.damagedPolicy}
                    multiline={true}
                    style={[{ height: 64 }]}
                />
                <TextInput
                    label="반납정책"
                    name="returnPolicy"
                    handleChangeText={handleChange('returnPolicy')}
                    value={values.returnPolicy}
                    multiline={true}
                    style={[{ height: 64 }]}
                />
                <View style={[Common.fullScreen]}>
                    <Text>대여 가능 기간</Text>
                    <View style={[Common.XStack, Common.fullScreen, { alignItems: 'center' }]}>
                        <View
                            style={[Common.textInput, { width: '80%', justifyContent: 'center' }]}
                        >
                            {(startDate && endDate) || (params.startDate && params.endDate) ? (
                                <Text>
                                    {formatISOtoDate(startDate || params.startDate)} ~
                                    {formatISOtoDate(endDate || params.endDate)}
                                </Text>
                            ) : null}
                        </View>
                        <Button
                            type="primary"
                            onPress={handleDateSelect}
                            style={{ height: 40, justifyContent: 'center', paddingVertical: 0 }}
                        >
                            기간 선택
                        </Button>
                    </View>
                </View>

                <View style={Common.XStack}>
                    <Button type="option" onPress={handleCancel}>
                        취소
                    </Button>
                    <Button type="primary" onPress={params?.itemId ? handleModify : handleSubmit}>
                        업로드
                    </Button>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};
export default NewPosting;

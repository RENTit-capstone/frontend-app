import { useRef, useState } from 'react';
import TextInput from '../CustomTextInput';
import KeyboardAvoidingView from '../KeyboardAvoidingView';
import {
    TextInput as DefaultTextInput,
    Keyboard,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import DropDown from '../Dropdown';
import DownArrow from '@/assets/images/down-arrow.svg';
import { itemList } from '@/styles/components/itemList';
import { Common } from '@/styles/common';

const UserInfoScreen = (props: any) => {
    const { validate } = props;
    const { values, errors, handleChange, handleGenderChange } = validate;
    const [isOpen, setIsOpen] = useState(false);
    const [selectedGender, setSelectedGender] = useState<string>('');

    const nameRef = useRef<DefaultTextInput>(null);
    const nicknameRef = useRef<DefaultTextInput>(null);
    const pwRef = useRef<DefaultTextInput>(null);
    const pwConfirmRef = useRef<DefaultTextInput>(null);

    const handleSelectGender = (selected: string) => {
        if (selected === '남자') handleGenderChange('MEN');
        else if (selected === '여자') handleGenderChange('WOMEN');
        setSelectedGender(selected);
        setIsOpen(false);
    };

    return (
        <KeyboardAvoidingView style={{ flex: 1, width: '100%' }}>
            <TextInput
                ref={nameRef}
                label="이름"
                name="name"
                handleChangeText={handleChange('name')}
                value={values.name}
                errorMsg={errors.name}
                onSubmitEditing={() => nicknameRef.current?.focus()}
                blurOnSubmit={false}
            />
            <TextInput
                ref={nicknameRef}
                label="닉네임"
                name="nickname"
                handleChangeText={handleChange('nickname')}
                value={values.nickname}
                errorMsg={errors.nickname}
                onSubmitEditing={() => pwRef.current?.focus()}
                blurOnSubmit={false}
            />
            <TextInput
                ref={pwRef}
                label="비밀번호"
                name="pw"
                handleChangeText={handleChange('pw')}
                value={values.pw}
                secureTextEntry={true}
                errorMsg={errors.pw}
                onSubmitEditing={() => pwConfirmRef.current?.focus()}
                blurOnSubmit={false}
            />
            <TextInput
                ref={pwConfirmRef}
                label="비밀번호 확인"
                name="pwConfirm"
                handleChangeText={handleChange('pwConfirm')}
                value={values.pwConfirm}
                secureTextEntry={true}
                errorMsg={errors.pwConfirm}
            />
            <View>
                <Text>성별</Text>
                <DropDown
                    label={!selectedGender ? '선택' : selectedGender}
                    icon={<DownArrow />}
                    onPress={() => setIsOpen(!isOpen)}
                    selectedColor="#111111"
                    style={[Common.textInput, { width: '100%' }]}
                />
                {isOpen && (
                    <View
                        style={[
                            itemList.SortDropdown,
                            {
                                position: 'absolute',
                                zIndex: 1000,
                                top: 64,
                                // justifyContent: 'center',
                                width: '100%',
                            },
                        ]}
                    >
                        {['남자', '여자'].map((option) => (
                            <TouchableOpacity
                                key={option}
                                onPress={() => handleSelectGender(option)}
                                style={[
                                    itemList.sortOption,
                                    { alignItems: 'center', paddingVertical: 16 },
                                ]}
                            >
                                <Text>{option}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                )}
            </View>

            <TextInput
                label="전화번호"
                name="phone"
                handleChangeText={handleChange('phone')}
                value={values.phone}
                keyboardType="name-phone-pad"
                placeholder="01012345678"
                errorMsg={errors.phone}
                returnKeyType="done"
                onSubmitEditing={() => {
                    Keyboard.dismiss();
                }}
            />
        </KeyboardAvoidingView>
    );
};

export default UserInfoScreen;

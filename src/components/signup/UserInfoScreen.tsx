import TextInput from "../TextInput";

const UserInfoScreen = (props: any) => {
    const {values, errors, handleChange} = props;
    
    return (
        <>
            <TextInput 
                label="이름" 
                name="name"
                handleChangeText={handleChange}
                value={values.name}
                errorMsg={errors.name}
            />
            <TextInput 
                label="닉네임" 
                name="nickname"
                handleChangeText={handleChange}
                value={values.nickname}
                errorMsg={errors.nickname}
            />
            <TextInput 
                label="비밀번호" 
                name="pw"
                handleChangeText={handleChange}
                value={values.pw}
                secureTextEntry={true}
                errorMsg={errors.pw}
            />
            <TextInput 
                label="비밀번호 확인" 
                name="pwConfirm"
                handleChangeText={handleChange}
                value={values.pwConfirm}
                secureTextEntry={true}
                errorMsg={errors.pwConfirm}
            />
            <TextInput      //드롭다운인풋 -> react-native-dropdown-picker 사용
                label="성별" 
                name="gender"
                handleChangeText={handleChange}
                value={values.gender}
                errorMsg={errors.gender}
            />
            <TextInput 
                label="전화번호" 
                name="phone"
                handleChangeText={handleChange}
                value={values.phone}
                keyboardType="name-phone-pad"
                placeholder="01012345678"
                errorMsg={errors.phone}
            />
        </>
    );
}

export default UserInfoScreen;
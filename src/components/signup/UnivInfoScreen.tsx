import TextInput from "../TextInput";

const UnivInfoScreen = () => {
    return (
    <>
        <TextInput 
            label="학교" 
            name="university"
            handleChangeText={handleChange}
            value={values.university}
            errorMsg={errors.university}
        />
        <TextInput 
            label="학번" 
            name="studentId"
            handleChangeText={handleChange}
            value={values.studentId}
            errorMsg={errors.studentId}
        />                            
    </>
    );
}

export default UnivInfoScreen;
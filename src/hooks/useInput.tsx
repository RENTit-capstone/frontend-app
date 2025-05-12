import { SignupType } from "@/types/types";
import { useState } from "react";

type SignupErrorType = {
    [K in keyof SignupType]?: string;
}

function useInput(initialValues: SignupType) {
    const [values, setValues] = useState<SignupType>(initialValues);
    const [errors, setErrors] = useState<SignupType>(initialValues);

    const pwRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%&?])[A-Za-z\d@!%*#?&]{8,}$/;
    const emailRegex = /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    const phoneRegex = /\d{11}/;

    const handleChange = (name: string, text: string) => {
        setValues(prev => ({ ...prev, [name]: text }));
        validateField(name, text);
    }

    const validateField = (name: string, value: string) => {
        let error = "";
        if (!value)      error=`${name}을 입력해주세요.`;
        if (name==="pw" && !pwRegex.test(value))
            error="비밀번호는 8자 이상, 문자, 숫자, 특수문자(!@#$%&?)을 포함해야 합니다.";
        if (name==="pwConfirm" && value!==values.pw)    
            error="비밀번호가 일치하지 않습니다.";
        if (name==="email" && !emailRegex.test(value))  
            error="이메일 형식으로 입력해주세요.";
        if (name==="phone" && !phoneRegex.test(value))         
            error="유효한 전화번호 형식으로 입력해주세요.";

        setErrors(prev => ({...prev, [name]: error}));
    }

    const blockNext = (page: number) => {
        let isError = true;

        if (page===0){
            isError = !(!errors.email && !errors.pw && !errors.pwConfirm) ||
                    (!values.email || !values.pw || !values.pwConfirm);
            return isError;
        }
        else if (page===1){
            isError = !(!errors.phone) ||
            (!values.name || !values.nickname || !values.gender || !values.phone);
            return isError;
        }
        else{
            isError = !values.university && !values.studentId;
            return isError;
       }
    }
    return {values, errors, handleChange, blockNext};

}
export default useInput;
import { Gender, SignupInputType } from '@/types/types';
import { useState } from 'react';

function useValidateInput(initialValues: SignupInputType) {
    const [values, setValues] = useState<SignupInputType>(initialValues);
    const [errors, setErrors] = useState<SignupInputType>(initialValues);

    const pwRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%&?])[A-Za-z\d@!%*#?&]{8,}$/;
    const emailRegex = /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    const phoneRegex = /\d{11}/;

    const handleChange = (name: string) => (text: string) => {
        setValues((prev) => ({ ...prev, [name]: text }));
        validateField(name, text);
    };

    const handleGenderChange = (option: Gender) => {
        setValues((prev) => ({ ...prev, gender: option }));
    };

    const validateField = (name: string, value: string) => {
        let error = '';
        // if (!value) error = `${name}을 입력해주세요.`;
        if (name === 'pw' && !pwRegex.test(value))
            error = '비밀번호는 8자 이상, 문자, 숫자, 특수문자(!@#$%&?)을 포함해야 합니다.';
        if (name === 'pwConfirm' && value !== values.pw) error = '비밀번호가 일치하지 않습니다.';
        if (name === 'email' && !emailRegex.test(value)) error = '이메일 형식으로 입력해주세요.';
        if (name === 'phone' && !phoneRegex.test(value))
            error = '유효한 전화번호 형식으로 입력해주세요.';

        setErrors((prev) => ({ ...prev, [name]: error }));
    };

    const blockNext = (page: number) => {
        let isError = true;

        if (page === 0) {
            isError =
                !(
                    !errors.university &&
                    !errors.studentId &&
                    !errors.email &&
                    !errors.emailVerifyCode
                ) ||
                !values.university ||
                !values.studentId ||
                !values.email ||
                !values.emailVerifyCode;
            return isError;
        } else {
            isError =
                !(
                    !errors.name &&
                    !errors.nickname &&
                    !errors.pw &&
                    !errors.pwConfirm &&
                    !errors.gender &&
                    !errors.phone
                ) ||
                !values.name ||
                !values.nickname ||
                !values.pw ||
                !values.pwConfirm ||
                !values.gender ||
                !values.phone;
            return isError;
        }
    };
    return { values, errors, handleChange, handleGenderChange, blockNext };
}
export default useValidateInput;

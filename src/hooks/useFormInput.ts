import { useState } from 'react';

function useFormInput<T extends Record<string, string>>(initialValues: T) {
    const [values, setValues] = useState<T>(initialValues);

    const handleChange = (name: keyof T) => (text: string) => {
        setValues((prev) => ({ ...prev, [name]: text }));
    };

    return { values, handleChange };
}

export default useFormInput;

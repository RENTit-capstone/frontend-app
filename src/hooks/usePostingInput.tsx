import { PostingType } from "@/types/types"
import { useState } from "react"

const usePostingInput = (initialValues: PostingType) => {
    const [values, setValues] = useState<PostingType>(initialValues);
    
    const handleChange = (name: string) => (text: string) => {
        setValues(prev => ({ ...prev, [name]: text}));
    }

    return {values, handleChange};
}
export default usePostingInput;
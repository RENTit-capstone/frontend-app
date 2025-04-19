import { useState } from "react";

function useInput(initialValues) {
    const [values, setValues] = useState(initialValues);
    let errorMessage = "";

    const handleChange = (event) => {
        const {name, value} = event.target;
        // if (name === email){

        // }
        setValues({...values, [name]: value});
        
        return {values, handleChange, errorMessage}
    }
}
export default useInput;
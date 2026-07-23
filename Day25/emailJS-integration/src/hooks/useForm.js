import { useState } from "react";

export const useForm = (initialValues, validate) => {
    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target
        setValues((prev) => ({
            ...prev,
            [name] : value,
        }));

        if (errors[name]) {
            setErrors((prev) => ({
                ...prev,
                [name] : null,
            }));
        }
    };

    const handleValidate = () => {
        if (!validate) return true;
        const validateErrors = validate(values);
        setErrors(validateErrors);
        return Object.keys(validateErrors).length === 0;
    };

    const resetForm = () => {
        setValues(initialValues);
        setErrors({});
    };

    return {
        values,
        errors,
        handleChange,
        handleValidate,
        setValues,
    };
};
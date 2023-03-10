import { useState } from "react";

export function useFormWithValidation() {
  const [values, setValues] = useState({});
  const [isValidForm, setIsValidForm] = useState(false);

  const handleChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    setValues({ ...values, [name]: value });
    setIsValidForm(target.closest("form").checkValidity());
  };

  return {
    values,
    setValues,
    handleChange,
    isValidForm,
  };
}

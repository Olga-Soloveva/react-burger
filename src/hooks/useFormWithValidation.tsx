import React, { useState } from "react";
import { TFormValues } from "../utils/types";

export function useFormWithValidation() {
  const [values, setValues] = useState<TFormValues>({});
  const [isValidForm, setIsValidForm] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    setValues({ ...values, [name]: value });
    setIsValidForm((target.closest("form") as HTMLFormElement).checkValidity());
  };

  return {
    values,
    setValues,
    handleChange,
    isValidForm,
  };
}

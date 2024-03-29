import React from "react";
import { ROUTE_RESET_PASSWORD } from "../utils/сonstant";
import styles from "./styles/page.module.css";
import { Link, useNavigate } from "react-router-dom";
import FormPage from "../components/FormPage/FormPage";
import { EmailInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { useProvideAuth } from "../utils/auth";
import { useFormWithValidation } from "../hooks/useFormWithValidation";

export function ForgotPassword() {
  const navigate = useNavigate();
  const { values, handleChange, isValidForm } = useFormWithValidation();
  const { forgotPassword } = useProvideAuth();

  const handleSubmit = async (evt: React.SyntheticEvent<HTMLElement>) => {
    evt.preventDefault();
    const requestresult = await forgotPassword(values);
    if (requestresult.success) {
      navigate(ROUTE_RESET_PASSWORD, {
        state: { email: values.email, from: "reset-password" }
      });
    }
  };

  return (
    <div className={`${styles.content}  ${styles.content_page_form}`}>
      <FormPage
        title="Восстановление пароля"
        isValidForm={isValidForm}
        textButton="Восстановить"
        onSubmit={handleSubmit}
      >
        <EmailInput
          onChange={handleChange}
          value={values.email || ""}
          name={"email"}
          placeholder="Укажите e-mail"
          isIcon={false}
          extraClass="mb-6"
          required
        />
      </FormPage>
      <p className="text text_type_main-default text_color_inactive mb-4">
        Вспомнили пароль?{" "}
        <Link to="/login" className={styles.link}>
          Войти
        </Link>
      </p>
    </div>
  );
}

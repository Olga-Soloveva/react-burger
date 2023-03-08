import styles from "./page.module.css";
import AppHeader from "../components/AppHeader/AppHeader";
import {
  PasswordInput,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import { useFormWithValidation } from "../hooks/useFormWithValidation";
import { useProvideAuth } from "../utils/auth";
import FormPage from "../components/FormPage/FormPage";

export function ResetPassword() {
  const { values, handleChange, isValidForm } = useFormWithValidation();
  const { resetPassword } = useProvideAuth();

  function handleSubmit(evt) {
    evt.preventDefault();
    resetPassword(values);
  }

  return (
    <div className={styles.page}>
      <AppHeader />
      <div className={`${styles.content}  ${styles.content_page_form}`}>
        <FormPage
          title="Восстановление пароля"
          isValidForm={isValidForm}
          textButton="Сохранить"
          onSubmit={handleSubmit}
        >
          <PasswordInput
            onChange={handleChange}
            placeholder={"Введите новый пароль"}
            value={values.password || ""}
            name={"password"}
            extraClass="mb-6"
            required
          />
          <Input
            type={"text"}
            placeholder={"Введите код из письма"}
            onChange={handleChange}
            value={values.name || ""}
            name={"name"}
            error={false}
            errorText={"Ошибка"}
            size={"default"}
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
    </div>
  );
}

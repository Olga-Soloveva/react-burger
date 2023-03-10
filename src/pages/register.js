import styles from "./page.module.css";
import AppHeader from "../components/AppHeader/AppHeader";
import {
  EmailInput,
  PasswordInput,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import { useFormWithValidation } from "../hooks/useFormWithValidation";
import { useProvideAuth } from "../utils/auth";
import FormPage from "../components/FormPage/FormPage";

export function RegisterPage() {
  const { values, handleChange, isValidForm } = useFormWithValidation();
  const { onRegister } = useProvideAuth();

  function handleSubmit(evt) {
    evt.preventDefault();
    onRegister(values);
  }

  return (
    <div className={styles.page}>
      <AppHeader />
      <div className={`${styles.content} ${styles.content_page_form}`}>
        <FormPage
          title="Регистрация"
          isValidForm={isValidForm}
          textButton="Зарегистрироваться"
          onSubmit={handleSubmit}
        >
          <Input
            type={"text"}
            placeholder={"Имя"}
            onChange={handleChange}
            value={values.name || ""}
            name={"name"}
            error={false}
            errorText={"Ошибка"}
            size={"default"}
            extraClass="mb-6"
            required
          />
          <EmailInput
            onChange={handleChange}
            value={values.email || ""}
            name={"email"}
            placeholder="E-mail"
            isIcon={false}
            extraClass="mb-6"
            required
          />
          <PasswordInput
            onChange={handleChange}
            value={values.password || ""}
            name={"password"}
            extraClass="mb-6"
            required
          />
        </FormPage>
        <p className="text text_type_main-default text_color_inactive mb-4">
          Уже зарегистрированы?{" "}
          <Link to="/login" className={styles.link}>
            Войти
          </Link>
        </p>
      </div>
    </div>
  );
}

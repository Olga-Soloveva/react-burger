import styles from "./page.module.css";
import AppHeader from "../components/AppHeader/AppHeader";
import {
  EmailInput,
  PasswordInput,
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import { useFormWithValidation } from "../hooks/useFormWithValidation";
import { useProvideAuth } from "../utils/auth";

export function RegisterPage() {
  const { values, handleChange, isValidForm } = useFormWithValidation();
  const { signUp } = useProvideAuth();

  function handleSubmit(evt) {
    evt.preventDefault();
    signUp(values);
  }

  return (
    <div className={styles.page}>
      <AppHeader />
      <div className={`${styles.content}`}>
        <h1 className="text text_type_main-medium mb-6">Регистрация</h1>
        <form className={`${styles.form_container}`}>
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
          />
          <EmailInput
            onChange={handleChange}
            value={values.email || ""}
            name={"email"}
            placeholder="E-mail"
            isIcon={false}
            extraClass="mb-6"
          />
          <PasswordInput
            onChange={handleChange}
            value={values.password || ""}
            name={"password"}
            extraClass="mb-6"
          />
          <Button
            htmlType="button"
            type="primary"
            size="medium"
            disabled={!isValidForm}
            onClick={handleSubmit}
          >
            Зарегистрироваться
          </Button>
        </form>
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

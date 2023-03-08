import styles from "./page.module.css";
import AppHeader from "../components/AppHeader/AppHeader";
import {
  EmailInput,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useFormWithValidation } from "../hooks/useFormWithValidation";
import { onLogin } from "../services/actions/users";
import FormPage from "../components/FormPage/FormPage";

export function LoginPage() {
  const { values, handleChange, isValidForm } = useFormWithValidation();
  const dispatch = useDispatch();

  const handleSubmit = () => {
    dispatch(onLogin(values));
  };

  return (
    <div className={styles.page}>
      <AppHeader />
      <div className={`${styles.content} ${styles.content_page_form}`}>
        <FormPage
          title="Вход"
          isValidForm={isValidForm}
          textButton="Войти"
          onSubmit={handleSubmit}
        >
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
          Вы — новый пользователь?{" "}
          <Link to="/register" className={styles.link}>
            Зарегистрироваться
          </Link>
        </p>
        <p className="text text_type_main-default text_color_inactive">
          Забыли пароль?{" "}
          <Link to="/forgot-password" className={styles.link}>
            Восстановить пароль
          </Link>
        </p>
      </div>
    </div>
  );
}

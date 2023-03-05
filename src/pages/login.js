import styles from "./page.module.css";
import AppHeader from "../components/AppHeader/AppHeader";
import {
  EmailInput,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useFormWithValidation } from "../hooks/useFormWithValidation";
import { onLogin } from "../services/actions/users";

export function LoginPage() {
  const { values, handleChange, isValidForm } = useFormWithValidation();
  const dispatch = useDispatch();

  const handleSubmit = () => {
    dispatch(onLogin(values))
  }

  return (
    <div className={styles.page}>
      <AppHeader />
      <div className={`${styles.content}`}>
        <h1 className="text text_type_main-medium mb-6">Вход</h1>
        <form className={`${styles.form_container}`}>
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
            Войти
          </Button>
        </form>
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

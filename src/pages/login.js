import styles from "./page.module.css";
import AppHeader from "../components/AppHeader/AppHeader";
import {
  EmailInput,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";

export function LoginPage() {
  return (
    <div className={styles.page}>
      <AppHeader />
      <div className={`${styles.content}`}>
        <h1 className="text text_type_main-medium mb-6">Вход</h1>
        <form className={`${styles.form_container}`}>
          <EmailInput
            // onChange={onChange}
            // value={value}
            name={"email"}
            placeholder="E-mail"
            isIcon={false}
            extraClass="mb-6"
          />
          <PasswordInput
            // onChange={onChange}
            // value={value}
            name={"password"}
            extraClass="mb-6"
          />
          <Button htmlType="button" type="primary" size="medium">
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

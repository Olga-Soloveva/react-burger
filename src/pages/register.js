import styles from "./page.module.css";
import AppHeader from "../components/AppHeader/AppHeader";
import {
  EmailInput,
  PasswordInput,
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";

export function RegisterPage() {
  return (
    <div className={styles.page}>
      <AppHeader />
      <div className={`${styles.content}`}>
        <h1 className="text text_type_main-medium mb-6">Регистрация</h1>
        <form className={`${styles.form_container}`}>
          <Input
            type={"text"}
            placeholder={"Имя"}
            // onChange={e => setValue(e.target.value)}
            // value={value}
            name={"name"}
            error={false}
            errorText={"Ошибка"}
            size={"default"}
            extraClass="mb-6"
          />
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

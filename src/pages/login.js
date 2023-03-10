import styles from "./page.module.css";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import AppHeader from "../components/AppHeader/AppHeader";
import FormPage from "../components/FormPage/FormPage";
import {
  EmailInput,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useFormWithValidation } from "../hooks/useFormWithValidation";
import { onLogin } from "../services/actions/users";
import { userSlice } from "../services/reducers/users";

export function LoginPage() {
  const navigate = useNavigate();
  const { values, handleChange, isValidForm } = useFormWithValidation();
  const [requestFailedMessage, setRequestFailedMessage] = useState(null);
  const dispatch = useDispatch();
  const { clearLoginFailed } = userSlice.actions;
  const { onLoginFailed } = useSelector((store) => store.user);

  useEffect(() => {
    dispatch(clearLoginFailed());
  }, [clearLoginFailed, dispatch, values]);

  const handleSubmit = () => {
    dispatch(onLogin(values))
      .unwrap()
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        setRequestFailedMessage(err.message)
      })
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
        {onLoginFailed && (
          <p className={`${styles.error} text text_type_main-default mt-20`}>
            {requestFailedMessage}
          </p>
        )}
      </div>
    </div>
  );
}

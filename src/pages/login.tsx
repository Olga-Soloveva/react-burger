import styles from "./page.module.css";
import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import FormPage from "../components/FormPage/FormPage";
import {
  EmailInput,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useFormWithValidation } from "../hooks/useFormWithValidation";
import { onLogin } from "../services/actions/users" 

export function LoginPage() {
  const navigate = useNavigate();
  const { values, handleChange, isValidForm } = useFormWithValidation();
  const [requestFailedMessage, setRequestFailedMessage] = useState(null);
  const dispatch = useDispatch<any>();
  const location = useLocation();
  const { onLoginFailed, onLoginRequest } = useSelector((store:any) => store.user);

  const handleSubmit = (evt: React.SyntheticEvent<HTMLElement>) => {
    evt.preventDefault();
    // @ts-ignore
    dispatch(onLogin(values))
      .unwrap()
      .then(() => {
        const from = location?.state?.from || { from: { pathname: "/" } };
        navigate(from.pathname);
      })
      .catch((err: any) => {
        setRequestFailedMessage(err.message);
      });
  };

  const handleChangeInput = (evt: React.ChangeEvent<HTMLInputElement>) => {
    handleChange(evt);
    if (requestFailedMessage) {
      setRequestFailedMessage(null);
    }
  };

  return (
    <div className={`${styles.content} ${styles.content_page_form}`}>
      <FormPage
        title="Вход"
        isValidForm={isValidForm}
        textButton="Войти"
        onSubmit={handleSubmit}
      >
        <EmailInput
          onChange={handleChangeInput}
          value={values.email || ""}
          name={"email"}
          placeholder="E-mail"
          isIcon={false}
          extraClass="mb-6"
          required
        />
        <PasswordInput
          onChange={handleChangeInput}
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
            {onLoginRequest && (
        <p className="text text_type_main-default mt-20">
          Идет автроизация пользователя...
        </p>
      )}
    </div>
  );
}

import styles from "./page.module.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import AppHeader from "../components/AppHeader/AppHeader";
import FormPage from "../components/FormPage/FormPage";
import {
  PasswordInput,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useFormWithValidation } from "../hooks/useFormWithValidation";
import { useProvideAuth } from "../utils/auth";
import { onLogin } from "../services/actions/users";

export function ResetPassword() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [requestFailed, setRequestFailed] = useState(false);
  const { values, handleChange, isValidForm } = useFormWithValidation();
  const { resetPassword } = useProvideAuth();
  const [requestFailedMessage, setRequestFailedMessage] = useState(null);

  console.log(location.state);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    resetPassword(values)
      .then(() => {
        dispatch(onLogin({email: location.state, password: values.password}))
          .unwrap()
          .then(() => {
            navigate("/");
          });
      })
      .catch((err) => {
        setRequestFailed(true);
        setRequestFailedMessage(err.message);
      });
  };

  useEffect(() => {
    setRequestFailed(false);
  }, [values.token]);

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
            value={values.token || ""}
            name={"token"}
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
        {requestFailed && (
          <p className={`${styles.error} text text_type_main-default mt-20`}>
            {requestFailedMessage}
          </p>
        )}
      </div>
    </div>
  );
}

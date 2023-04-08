import { ROUTE_MAIN } from "../utils/сonstant";
import styles from "./page.module.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
import { useSelector, useDispatch } from "../utils/hooks";
import FormPage from "../components/FormPage/FormPage";
import {
  EmailInput,
  PasswordInput,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { useFormWithValidation } from "../hooks/useFormWithValidation";
import { onRegister } from "../services/actions/users";

export function RegisterPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { values, handleChange, isValidForm } = useFormWithValidation();
  const [requestFailedMessage, setRequestFailedMessage] = useState(null);
  const { onRegisterFailed, onRegisterRequest } = useSelector(
    (store) => store.user
  );

  function handleSubmit(evt: React.SyntheticEvent<HTMLElement>) {
    evt.preventDefault();
    dispatch(onRegister(values))
      .unwrap()
      .then(() => {
        navigate(ROUTE_MAIN );
      })
      .catch((err: any) => {
        setRequestFailedMessage(err.message);
      });
  }

  const handleChangeInput = (evt: React.ChangeEvent<HTMLInputElement>) => {
    handleChange(evt);
    if (requestFailedMessage) {
      setRequestFailedMessage(null);
    }
  };

  return (
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
          onChange={handleChangeInput}
          value={values.name || ""}
          name={"name"}
          error={false}
          errorText={"Ошибка"}
          size={"default"}
          extraClass="mb-6"
          required
        />
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
        Уже зарегистрированы?{" "}
        <Link to="/login" className={styles.link}>
          Войти
        </Link>
      </p>
      {onRegisterFailed && (
        <p className={`${styles.error} text text_type_main-default mt-20`}>
          {requestFailedMessage}
        </p>
      )}
      {onRegisterRequest && (
        <p className="text text_type_main-default mt-20">
          Идет регистрация пользователя...
        </p>
      )}
    </div>
  );
}

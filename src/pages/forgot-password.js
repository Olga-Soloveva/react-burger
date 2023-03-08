import styles from "./page.module.css";
import AppHeader from "../components/AppHeader/AppHeader";
import { EmailInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import { useFormWithValidation } from "../hooks/useFormWithValidation";
import { useProvideAuth } from "../utils/auth";
import FormPage from "../components/FormPage/FormPage";

export function ForgotPassword() {
  const { values, handleChange, isValidForm } = useFormWithValidation();
  const { forgotPassword } = useProvideAuth();

  function handleSubmit(evt) {
    evt.preventDefault();
    forgotPassword(values);
  }

  return (
    <div className={styles.page}>
      <AppHeader />
      <div className={`${styles.content}  ${styles.content_page_form}`}>
        <FormPage
          title="Восстановление пароля"
          isValidForm={isValidForm}
          textButton="Восстановить"
          onSubmit={handleSubmit}
        >
          <EmailInput
            onChange={handleChange}
            value={values.email || ""}
            name={"email"}
            placeholder="Укажите e-mail"
            isIcon={false}
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
      </div>
    </div>
  );
}

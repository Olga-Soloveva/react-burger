import styles from "./page.module.css";
import profileStyles from "./profile.module.css";
import AppHeader from "../components/AppHeader/AppHeader";
import Menu from "../components/Menu/Menu";
import {
  EmailInput,
  PasswordInput,
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { useFormWithValidation } from "../hooks/useFormWithValidation";
import { useProvideAuth } from "../utils/auth";
import FormPage from "../components/FormPage/FormPage";

export function Profile() {
  const { values, handleChange, isValidForm } = useFormWithValidation();
  const { signUp } = useProvideAuth();

  function handleSubmit(evt) {
    evt.preventDefault();
    signUp(values);
  }

  return (
    <div className={styles.page}>
      <AppHeader />
      <div className={`${styles.content} ${styles.content_page_profile}`}>
        <div className={profileStyles.content}>
          <div className={profileStyles.column_right}>
            <Menu />
            <p className={`${profileStyles.paragraph} text text_type_main-default mt-20`}>
              В этом разделе вы можете изменить свои персональные данные
            </p>
          </div>
          <div className={profileStyles.column_center}>
            <FormPage
              isValidForm={isValidForm}
              textButton="Сохранить"
              onSubmit={handleSubmit}
            >
              <Input
                type={"text"}
                placeholder={"Имя"}
                onChange={handleChange}
                icon="EditIcon"
                value={values.name || ""}
                name={"name"}
                error={false}
                errorText={"Ошибка"}
                size={"default"}
                extraClass="mb-6"
              />
              <EmailInput
                onChange={handleChange}
                icon="EditIcon"
                value={values.email || ""}
                name={"email"}
                placeholder="Логин"
                isIcon={false}
                extraClass="mb-6"
              />
              <PasswordInput
                onChange={handleChange}
                value={values.password || ""}
                name={"password"}
                extraClass="mb-6"
                icon="EditIcon"
              />
            </FormPage>

            <Button htmlType="button" type="secondary" size="large">
              Отмена
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

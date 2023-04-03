import styles from "./page.module.css";
import profileStyles from "./profile.module.css";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Menu from "../components/Menu/Menu";
import {
  EmailInput,
  PasswordInput,
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { editUser } from "../services/actions/users";
import { useFormWithValidation } from "../hooks/useFormWithValidation";
import FormPage from "../components/FormPage/FormPage";

export function Profile() {
  const dispatch = useDispatch<any>();
  const { values, setValues, handleChange, isValidForm } =
    useFormWithValidation();
  const [isDataUserChange, setIsDataUserChange] = useState<boolean>(false);
  const [requestFailedMessage, setRequestFailedMessage] = useState(null);
  const [requestSuccessMessage, setRequestSuccessMessage] = useState<
    boolean | null
  >(null);
  const { user, editUserRequest, editUserFailed } = useSelector(
    (store: any) => store.user
  );

  const handleChangeInput = (evt: React.ChangeEvent<HTMLInputElement>) => {
    handleChange(evt);
    if (requestFailedMessage) {
      setRequestFailedMessage(null);
    }
    if (requestSuccessMessage) {
      setRequestSuccessMessage(false);
    }
  };

  useEffect(() => {
    setIsDataUserChange(
      values.name !== user.name ||
        values.email !== user.email ||
        Boolean(values.password)
    );
  }, [values, user]);

  useEffect(() => {
    values.name = user.name;
    values.email = user.email;
    values.password = "";
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleSubmit(evt: React.SyntheticEvent<HTMLElement>) {
    evt.preventDefault();
    // @ts-ignore
    dispatch(editUser(values))
      .unwrap()
      .then((res: any) => {
        setRequestSuccessMessage(true);
      })
      .catch((err: any) => {
        setRequestFailedMessage(err.message);
      });
  }

  const undoData = () => {
    setValues({ ...values, name: user.name, email: user.email, password: "" });
    setRequestFailedMessage(null);
  };

  return (
    <>
      <div className={`${styles.content} ${styles.content_page_profile}`}>
        <div className={profileStyles.content}>
          <div className={profileStyles.column_right}>
            <Menu />
            <p
              className={`${profileStyles.paragraph} text text_type_main-default mt-20`}
            >
              В этом разделе вы можете изменить свои персональные данные
            </p>
          </div>
          <div className={profileStyles.column_center}>
            <FormPage
              isValidForm={isValidForm}
              textButton="Сохранить"
              onSubmit={handleSubmit}
              buttonIsInvisible={!isDataUserChange}
            >
              <Input
                type={"text"}
                placeholder={"Имя"}
                onChange={handleChangeInput}
                icon="EditIcon"
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
                placeholder="Логин"
                isIcon={true}
                extraClass="mb-6"
                required
              />
              <PasswordInput
                onChange={handleChangeInput}
                value={values.password || ""}
                name={"password"}
                extraClass="mb-6"
                icon="EditIcon"
              />
            </FormPage>

            {isDataUserChange && (
              <Button
                htmlType="button"
                type="secondary"
                size="large"
                onClick={undoData}
              >
                Отмена
              </Button>
            )}
            {editUserFailed && (
              <p className="text text_type_main-default pt-4">
                {requestFailedMessage}
              </p>
            )}
            {editUserRequest && (
              <p className="text text_type_main-default pt-4">
                Изменение данных...
              </p>
            )}
            {requestSuccessMessage && (
              <p className="text text_type_main-default pt-4">
                Данные успешно обновлены!
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

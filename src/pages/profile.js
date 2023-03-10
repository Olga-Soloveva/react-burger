import styles from "./page.module.css";
import profileStyles from "./profile.module.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import AppHeader from "../components/AppHeader/AppHeader";
import Menu from "../components/Menu/Menu";
import {
  EmailInput,
  PasswordInput,
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { getUser, editUser } from "../services/actions/users";
import { useFormWithValidation } from "../hooks/useFormWithValidation";
import FormPage from "../components/FormPage/FormPage";
import { useProvideAuth } from "../utils/auth";

export function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { values, setValues, handleChange, isValidForm } =
    useFormWithValidation();
  const [isDataUserChange, setIsDataUserChange] = useState(false);
  const [requestFailedMessage, setRequestFailedMessage] = useState(null);
  const [requestSuccessMessage, setRequestSuccessMessage] = useState(null);
  const { user, editUserRequest, editUserFailed } = useSelector(
    (store) => store.user
  );
  const { refreshToken } = useProvideAuth();

  const handleChangeInput = (evt) => {
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
        values.password
    );
  }, [values, user]);

  useEffect(() => {
    dispatch(getUser())
      .unwrap()
      .then((res) => {
        values.name = res.user.name;
        values.email = res.user.email;
        values.password = "";
      })
      .catch((err) => {
        refreshToken()
          .then(() => {
            dispatch(getUser())
              .unwrap()
              .then((res) => {
                values.name = res.user.name;
                values.email = res.user.email;
                values.password = "";
              });
          })
          .catch((err) => {
            navigate("/login");
          });
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  function handleSubmit(evt) {
    evt.preventDefault();
    dispatch(editUser(values))
      .unwrap()
      .then((res) => {
        setRequestSuccessMessage(true);
      })
      .catch((err) => {
        refreshToken().then(() => {
          dispatch(editUser(values))
            .unwrap()
            .catch((err) => {
              setRequestFailedMessage(err.message);
            });
        });
      });
  }

  const undoData = () => {
    setValues({ ...values, name: user.name, email: user.email, password: "" });
    setRequestFailedMessage(null);
  };

  return (
    <div className={styles.page}>
      <AppHeader />
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
                icon="EditIcon"
                value={values.email || ""}
                name={"email"}
                placeholder="Логин"
                isIcon={false}
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
    </div>
  );
}

import styles from "./preloader.module.css";
import React from "react";
import { useSelector } from "react-redux";

const Preloader = React.memo(() => {
  const { onAuthorizationRequest } = useSelector((store) => store.user);

  return (
    onAuthorizationRequest && (<div className={styles.content}>
      <p className="text text_type_main-medium mt-10">Загружаем ваши данные...</p></div>
    )
  );
});

export default Preloader;

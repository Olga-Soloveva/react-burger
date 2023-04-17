import styles from "./preloader.module.css";
import React, { FC } from "react";
import { useSelector } from "../../utils/hooks";

const Preloader: FC = React.memo(() => {
  const { onAuthorizationRequest } = useSelector((store) => store.user);

  return (
    <>
      {onAuthorizationRequest && (
        <div className={styles.preloader}>
          <div className={styles.container}>
            <p className={`${styles.message} text text_type_main-medium`}>
              Загружаем ваши данные...
            </p>
          </div>
        </div>
      )}
    </>
  );
});

export default Preloader;

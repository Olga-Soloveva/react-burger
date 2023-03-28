import styles from "./page.module.css";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { useNavigate } from "react-router-dom";

export function OrderPage() {
  const navigate = useNavigate();

  return (
    <div className={`${styles.content}  ${styles.content_page_notfound}`}>
      <h1 className="text text_type_main-medium mb-10">Страница в разработке</h1>
      <Button
        htmlType="button"
        type="primary"
        size="medium"
        onClick={() => navigate(-1)}
      >
        Назад
      </Button>
    </div>
  );
}

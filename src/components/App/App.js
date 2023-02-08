import { useEffect, useState } from "react";
import styles from "./app.module.css";
import AppHeader from "../AppHeader/AppHeader";
import MainContent from "../MainContent/MainContent";
import data from "../../utils/data";
import { INGREDIENTS_URL } from "../../utils/сonstant";

function App() {
  const [ingredients, setingredients] = useState([]);

  useEffect(() => {
    fetch(INGREDIENTS_URL)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then((res) => {
         setingredients(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className={styles.page}>
      <AppHeader />
      <MainContent ingredients={ingredients} components={data} />
    </div>
  );
}

export default App;

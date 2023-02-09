import { useEffect, useState } from "react";
import styles from "./app.module.css";
import AppHeader from "../AppHeader/AppHeader";
import MainContent from "../MainContent/MainContent";
import { INGREDIENTS_URL } from "../../utils/сonstant";

function App() {
  const [ingredients, setingredients] = useState([]);
  const [components, setComponents] = useState([]);

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
        setComponents(res.data)
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

   return (
    <>
      <div className={styles.page}>
        <AppHeader />
        <MainContent ingredients={ingredients} components={components} />
      </div>
    </>
  );
}

export default App;

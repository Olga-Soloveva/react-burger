import { useEffect, useState } from "react";
import styles from "./app.module.css";
import AppHeader from "../AppHeader/AppHeader";
import MainContent from "../MainContent/MainContent";
import { getIngredients } from "../../utils/ingredients-api";

function App() {
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    getIngredients()
      .then((data) => {
        setIngredients(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className={styles.page}>
      <AppHeader />
      <MainContent ingredients={ingredients} />
    </div>
  );
}

export default App;

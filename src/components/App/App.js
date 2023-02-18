import { useEffect, useState, useMemo } from "react";
import styles from "./app.module.css";
import AppHeader from "../AppHeader/AppHeader";
import MainContent from "../MainContent/MainContent";
import { getIngredients } from "../../utils/ingredients-api";
import { BurgerIngredientContext } from "../../contexts/BurgerIngredientContext";

function App() {
  const [ingredients, setIngredients] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setIsLoading(true)
    getIngredients()
      .then((data) => {
        setHasError(false)
        setIngredients(data);
      })
      .catch((err) => {
        setIngredients([]);
        setHasError(true)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, []);

  const contextValue = useMemo(() => {
    return { ingredients, isLoading, hasError };
  }, [
    ingredients, isLoading, hasError 
  ]);

  return (
    <div className={styles.page}>
      <AppHeader />
      <BurgerIngredientContext.Provider value={contextValue}>
        <MainContent />
      </BurgerIngredientContext.Provider>
    </div>
  );
}

export default App;

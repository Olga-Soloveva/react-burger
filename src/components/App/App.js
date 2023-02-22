import { useEffect } from "react";
import {  useDispatch } from "react-redux";
import styles from "./app.module.css";
import AppHeader from "../AppHeader/AppHeader";
import MainContent from "../MainContent/MainContent";
import { getIngredients } from "../../services/actions/burger";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  return (
    <div className={styles.page}>
      <AppHeader />
      <MainContent />
    </div>
  );
}

export default App;

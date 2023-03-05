import styles from "./page.module.css";
import AppHeader from "../components/AppHeader/AppHeader";
import MainContent from "../components/MainContent/MainContent";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { getIngredients } from "../services/actions/ingredients";

export function MainPage() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  return (
    <div className={styles.page}>
      <AppHeader />
      <DndProvider backend={HTML5Backend}>
        <MainContent />
      </DndProvider>
    </div>
  );
}

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import styles from "./app.module.css";
import AppHeader from "../AppHeader/AppHeader";
import MainContent from "../MainContent/MainContent";
import { getIngredients } from "../../services/actions/burger";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function App() {
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

export default App;

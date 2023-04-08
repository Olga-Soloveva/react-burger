import MainContent from "../components/MainContent/MainContent";
import { useEffect } from "react";
import { useDispatch } from "../utils/hooks";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { getIngredients } from "../services/actions/ingredients";

export function MainPage() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  return (
    <DndProvider backend={HTML5Backend}>
      <MainContent />
    </DndProvider>
  );
}

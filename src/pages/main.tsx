import MainContent from "../components/MainContent/MainContent";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

export function MainPage() {

  return (
    <DndProvider backend={HTML5Backend}>
      <MainContent />
    </DndProvider>
  );
}

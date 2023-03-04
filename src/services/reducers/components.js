import { createSlice } from "@reduxjs/toolkit";

export const componentsSlice = createSlice({
  name: "components",
  initialState: {
    componentId: 0,
    bunComponent: null,
    otherComponents: [],
  },
  reducers: {
    getComponent: (state, action) => {
      const component = JSON.parse(JSON.stringify(action.payload));
      if (component.type === "bun") {
        if (
          !state.bunComponent ||
          (state.bunComponent && component._id !== state.bunComponent._id)
        ) {
          state.bunComponent = component;
        } else {
          return;
        }
      } else {
        component.componentId = state.componentId;
        state.otherComponents = [...state.otherComponents, component];
        state.componentId += 1;
      }
    },
    deleteComponent: (state, action) => {
      state.otherComponents = state.otherComponents.filter((item) => {
        return item.componentId !== action.payload.componentId;
      });
    },
    moveComponent: (state, action) => {
      if (
        action.payload.componentDrop.componentId ===
        action.payload.componentDrag.componentId
      ) {
        return;
      } else {
        const indexDragItem = state.otherComponents.findIndex(
          (item) =>
            item.componentId === action.payload.componentDrag.componentId
        );
        state.otherComponents = state.otherComponents.filter((item) => {
          return item.componentId !== action.payload.componentDrop.componentId;
        });
        state.otherComponents.splice(indexDragItem, 0, action.payload.componentDrop);
      }
    },
  },
});

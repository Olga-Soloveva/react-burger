import { createSlice } from "@reduxjs/toolkit";

export const componentsSlice = createSlice({
    name: "components",
    initialState: {
      componentId: 0,
      components: [],
    },
    reducers: {
      getComponent: (state, action) => {
        const component = JSON.parse(JSON.stringify(action.payload));
        if (component.type === "bun") {
          if (
            state.components.some((item) => {
              return item.type === "bun" && item._id === component._id;
            })
          ) {
            return;
          } else {
            state.components = state.components.filter((item) => {
              return item.type !== "bun";
            });
          }
        }
        component.componentId = state.componentId;
        state.components = [...state.components, component];
        state.componentId += 1;
      },
      deleteComponent: (state, action) => {
        state.components = state.components.filter((item) => {
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
          const indexDragItem = state.components.findIndex(
            (item) =>
              item.componentId === action.payload.componentDrag.componentId
          );
          state.components = state.components.filter((item) => {
            return item.componentId !== action.payload.componentDrop.componentId;
          });
          state.components.splice(indexDragItem, 0, action.payload.componentDrop);
        }
      },
    },
  });
import reducer, {
  initialState,
  getComponent,
  deleteComponent,
  moveComponent,
  clearConstructor,
} from "./components";

interface ITestDataComponents {
  _id: string;
  name: string;
  type: "bun" | "main" | "sauce";
  componentId?: number;
}

const testDataBunComponent1: ITestDataComponents = {
  _id: "643d69a5c3f7b9001cfa093c",
  name: "Краторная булка N-200i",
  type: "bun",
};

const testDataOtherComponent1: ITestDataComponents = {
  _id: "643d69a5c3f7b9001cfa0942",
  name: "Соус Spicy-X",
  type: "sauce",
  componentId: 0,
};

const testDataOtherComponent2: ITestDataComponents = {
  _id: "643d69a5c3f7b9001cfa0941",
  name: "Биокотлета из марсианской Магнолии",
  type: "main",
  componentId: 1,
};

const testDataOtherComponent3: ITestDataComponents = {
  _id: "643d69a5c3f7b9001cfa0948",
  name: "Кристаллы марсианских альфа-сахаридов",
  type: "main",
  componentId: 2,
};

const testDataBunComponent2: ITestDataComponents = {
  _id: "643d69a5c3f7b9001cfa093d",
  name: "Флюоресцентная булка R2-D3",
  type: "bun",
};

describe("components reducer", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, { type: undefined })).toEqual(initialState);
  });

  it("should add bun component when getComponent, the bun component from the store is null", () => {
    const action = { type: getComponent, payload: testDataBunComponent1 };
    const state = reducer(
      {
        componentId: 2,
        bunComponent: null,
        otherComponents: [testDataOtherComponent1, testDataOtherComponent2],
      } as any,
      action
    );
    expect(state).toEqual({
      componentId: 2,
      bunComponent: testDataBunComponent1,
      otherComponents: [testDataOtherComponent1, testDataOtherComponent2],
    });
  });

  it("should add bun component when getComponent, the bun component from the store is equal to the bun component being added", () => {
    const action = { type: getComponent, payload: testDataBunComponent1 };
    const state = reducer(
      {
        componentId: 2,
        bunComponent: testDataBunComponent1,
        otherComponents: [testDataOtherComponent1, testDataOtherComponent2],
      } as any,
      action
    );
    expect(state).toEqual({
      componentId: 2,
      bunComponent: testDataBunComponent1,
      otherComponents: [testDataOtherComponent1, testDataOtherComponent2],
    });
  });

  it("should add bun component when getComponent, the bun component from the store is equal to another bun component", () => {
    const action = { type: getComponent, payload: testDataBunComponent2 };
    const state = reducer(
      {
        componentId: 2,
        bunComponent: testDataBunComponent1,
        otherComponents: [testDataOtherComponent1, testDataOtherComponent2],
      } as any,
      action
    );
    expect(state).toEqual({
      componentId: 2,
      bunComponent: testDataBunComponent2,
      otherComponents: [testDataOtherComponent1, testDataOtherComponent2],
    });
  });

  it("should add other component when getComponent, the other components array from the store is empty", () => {
    const action = { type: getComponent, payload: testDataOtherComponent1 };
    const state = reducer(
      {
        componentId: 0,
        bunComponent: testDataBunComponent1,
        otherComponents: [],
      } as any,
      action
    );
    expect(state).toEqual({
      componentId: 1,
      bunComponent: testDataBunComponent1,
      otherComponents: [testDataOtherComponent1],
    });
  });

  it("should add other component when getComponent, the other components array from the store contains other components", () => {
    const action = { type: getComponent, payload: testDataOtherComponent3 };
    const state = reducer(
      {
        componentId: 2,
        bunComponent: testDataBunComponent1,
        otherComponents: [testDataOtherComponent1, testDataOtherComponent2],
      } as any,
      action
    );
    expect(state).toEqual({
      componentId: 3,
      bunComponent: testDataBunComponent1,
      otherComponents: [
        testDataOtherComponent1,
        testDataOtherComponent2,
        testDataOtherComponent3,
      ],
    });
  });

  it("should delete component when deleteComponent", () => {
    const action = { type: deleteComponent, payload: testDataOtherComponent1 };
    const state = reducer(
      {
        componentId: 2,
        bunComponent: testDataBunComponent1,
        otherComponents: [testDataOtherComponent1, testDataOtherComponent2],
      } as any,
      action
    );
    expect(state).toEqual({
      componentId: 2,
      bunComponent: testDataBunComponent1,
      otherComponents: [testDataOtherComponent2],
    });
  });

  it("should clear state when clearConstructor", () => {
    const action = { type: clearConstructor };
    const state = reducer(
      {
        componentId: 2,
        bunComponent: testDataBunComponent1,
        otherComponents: [testDataOtherComponent1, testDataOtherComponent2],
      } as any,
      action
    );
    expect(state).toEqual(initialState);
  });

  it("should move other component when moveComponent, the drag and drop components are equal", () => {
    const action = {
      type: moveComponent,
      payload: {
        componentDrag: testDataOtherComponent2,
        componentDrop: testDataOtherComponent2,
      },
    };
    const state = reducer(
      {
        componentId: 3,
        bunComponent: testDataBunComponent1,
        otherComponents: [
          testDataOtherComponent1,
          testDataOtherComponent2,
          testDataOtherComponent3,
        ],
      } as any,
      action
    );
    expect(state).toEqual({
      componentId: 3,
      bunComponent: testDataBunComponent1,
      otherComponents: [
        testDataOtherComponent1,
        testDataOtherComponent2,
        testDataOtherComponent3,
      ],
    });
  });

  it("should move other component when moveComponent, the drag and drop components are not equal (1)", () => {
    const action = {
      type: moveComponent,
      payload: {
        componentDrag: testDataOtherComponent1,
        componentDrop: testDataOtherComponent3,
      },
    };
    const state = reducer(
      {
        componentId: 3,
        bunComponent: testDataBunComponent1,
        otherComponents: [
          testDataOtherComponent1,
          testDataOtherComponent2,
          testDataOtherComponent3,
        ],
      } as any,
      action
    );
    expect(state).toEqual({
      componentId: 3,
      bunComponent: testDataBunComponent1,
      otherComponents: [
        testDataOtherComponent3,
        testDataOtherComponent1,
        testDataOtherComponent2,
      ],
    });
  });

  it("should move other component when moveComponent, the drag and drop components are not equal (2)", () => {
    const action = {
      type: moveComponent,
      payload: {
        componentDrag: testDataOtherComponent3,
        componentDrop: testDataOtherComponent2,
      },
    };
    const state = reducer(
      {
        componentId: 3,
        bunComponent: testDataBunComponent1,
        otherComponents: [
          testDataOtherComponent1,
          testDataOtherComponent2,
          testDataOtherComponent3,
        ],
      } as any,
      action
    );
    expect(state).toEqual({
      componentId: 3,
      bunComponent: testDataBunComponent1,
      otherComponents: [
        testDataOtherComponent1,
        testDataOtherComponent3,
        testDataOtherComponent2,
      ],
    });
  });
});

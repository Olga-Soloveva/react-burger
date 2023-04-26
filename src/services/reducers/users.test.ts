import {
  onLogin,
  onRegister,
  onLogOut,
  getUser,
  editUser,
} from "../actions/users";
import reducer, { initialState, clearUser } from "./users";
import { TUser, TUserData } from "../../utils/types";

const testDataUser: TUser = {
  email: "test@ya.ru",
  name: "Ольга",
};

const testDataUserData: TUserData = {
  user: {
    email: "test@ya.ru",
    name: "Ольга",
  },
};

describe("user reducer", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, { type: undefined })).toEqual(initialState);
  });

  it("should set user to null when clearUser", () => {
    const action = { type: clearUser };
    const state = reducer(
      {
        ...initialState,
        user: testDataUser,
      },
      action
    );
    expect(state).toEqual({
      ...initialState,
      user: null,
    });
  });

  it("should set onLoginRequest true when onLogin is pending", () => {
    const action = { type: onLogin.pending.type };
    const state = reducer(initialState, action);
    expect(state).toEqual({ ...initialState, onLoginRequest: true });
  });

  it("should set user when onLogin is fulfilled", () => {
    const action = { type: onLogin.fulfilled.type, payload: testDataUser };
    const state = reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      user: testDataUser,
    });
  });

  it("should set onLoginFailed true when onLogin is rejected", () => {
    const action = {
      type: onLogin.rejected.type,
      payload: { error: "Test error" },
    };
    const state = reducer(initialState, action);
    expect(state).toEqual({ ...initialState, onLoginFailed: true });
  });

  it("should set onRegisterRequest true when onRegister is pending", () => {
    const action = { type: onRegister.pending.type };
    const state = reducer(initialState, action);
    expect(state).toEqual({ ...initialState, onRegisterRequest: true });
  });

  it("should set user when onRegister is fulfilled", () => {
    const action = { type: onRegister.fulfilled.type, payload: testDataUser };
    const state = reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      user: testDataUser,
    });
  });

  it("should set onRegisterFailed true when onRegister is rejected", () => {
    const action = {
      type: onRegister.rejected.type,
      payload: { error: "Test error" },
    };
    const state = reducer(initialState, action);
    expect(state).toEqual({ ...initialState, onRegisterFailed: true });
  });

  it("should set user to null when onLogOut is fulfilled", () => {
    const action = { type: onLogOut.fulfilled.type };
    const state = reducer(
      {
        ...initialState,
        user: testDataUser,
      },
      action
    );
    expect(state).toEqual({
      ...initialState,
      user: null,
    });
  });

  it("should set onAuthorizationRequest true when getUser is pending", () => {
    const action = { type: getUser.pending.type };
    const state = reducer(initialState, action);
    expect(state).toEqual({ ...initialState, onAuthorizationRequest: true });
  });

  it("should set user when getUser is fulfilled", () => {
    const action = { type: getUser.fulfilled.type, payload: testDataUserData };
    const state = reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      user: testDataUserData.user,
    });
  });

  it("should set onAuthorizationFailed true when getUser is rejected", () => {
    const action = {
      type: getUser.rejected.type,
      payload: { error: "Test error" },
    };
    const state = reducer(initialState, action);
    expect(state).toEqual({ ...initialState, onAuthorizationFailed: true });
  });

  it("should set editUserRequest true when editUser is pending", () => {
    const action = { type: editUser.pending.type };
    const state = reducer(initialState, action);
    expect(state).toEqual({ ...initialState, editUserRequest: true });
  });

  it("should set user when editUser is fulfilled", () => {
    const action = { type: editUser.fulfilled.type, payload: testDataUserData };
    const state = reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      user: testDataUserData.user,
    });
  });

  it("should set editUserFailed true when editUser is rejected", () => {
    const action = {
      type: editUser.rejected.type,
      payload: { error: "Test error" },
    };
    const state = reducer(initialState, action);
    expect(state).toEqual({ ...initialState, editUserFailed: true });
  });
});

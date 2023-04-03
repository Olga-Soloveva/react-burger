import React, { FC } from "react";
import { ROUTE_LOGIN, ROUTE_MAIN } from "../utils/сonstant";
import { getUser } from "../services/actions/users";
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { userSlice } from "../services/reducers/users";
import { checkRefreshToken, checkToken } from "../utils/utilsApi";

interface IProtectedRouteElement {
  element: React.ReactElement;
  onlyUnAuth?: Boolean;
}

export const ProtectedRouteElement: FC<IProtectedRouteElement> = ({
  element,
  onlyUnAuth,
}) => {
  const dispatch = useDispatch<any>();
  const { user } = useSelector((store: any) => store.user);
  const [isUserLoaded, setUserLoaded] = useState(false);
  const location = useLocation();
  const { clearUser } = userSlice.actions;

  const init = async () => {
    const isTokens = checkToken();
    const isRefreshTokens = checkRefreshToken();
    if (!isTokens && !isRefreshTokens) {
      await dispatch(clearUser());
    } else {
      await dispatch(getUser())
        .unwrap()
        .catch(async (err: any) => {
          await dispatch(clearUser());
        });
    }
    setUserLoaded(true);
  };

  useEffect(() => {
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!isUserLoaded) {
    return null;
  }

  if (onlyUnAuth) {
    return user ? (
      element
    ) : (
      <Navigate to={ROUTE_LOGIN} state={{ from: location }} />
    );
  } else {
    return !user ? element : <Navigate to={ROUTE_MAIN} />;
  }
};

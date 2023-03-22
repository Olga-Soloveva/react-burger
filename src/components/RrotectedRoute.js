import { ROUTE_LOGIN, ROUTE_MAIN } from "../utils/сonstant";
import { getUser } from "../services/actions/users";
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { userSlice } from "../services/reducers/users";
import { deleteCookie } from "../utils/utilsApi";
import { checkRefreshToken, checkToken } from "../utils/utilsApi";
import { useProvideAuth } from "../utils/auth";

export const ProtectedRouteElement = ({ element = false, onlyUnAuth }) => {
  const { refreshToken } = useProvideAuth();
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.user);
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
        .catch(async (err) => {
          deleteCookie("token");
          await refreshToken()
            .then(async () => {
              await dispatch(getUser())
                .unwrap()
                .catch((err) => {
                  dispatch(clearUser());
                  deleteCookie("refreshToken");
                });
            })
            .catch((err) => {
              dispatch(clearUser());
              deleteCookie("refreshToken");
            });
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
  }

  if (!onlyUnAuth) {
    return !user ? element : <Navigate to={ROUTE_MAIN} />;
  }
};

import { getUser } from "../services/actions/users";
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { userSlice } from "../services/reducers/users";
import { deleteCookie } from "../utils/utilsApi";

export const ProtectedRouteElement = ({ element = false, onlyUnAuth }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.user);
  const [isUserLoaded, setUserLoaded] = useState(false);
  const location = useLocation();
  const { clearUser } = userSlice.actions;

  const init = async () => {
    await dispatch(getUser())
      .unwrap()
      .catch((err) => {
        dispatch(clearUser());
        deleteCookie("token");
        deleteCookie("refreshToken");
      });
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
    return user ? element : <Navigate to="/login" state={{ from: location }} />;
  }

  if (!onlyUnAuth) {
    return !user ? element : <Navigate to="/" />;
  }
};



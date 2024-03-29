import {
  ROUTE_MAIN,
  ROUTE_LOGIN,
  ROUTE_REGISTER,
  ROUTE_FORGOT_PASSWORD,
  ROUTE_RESET_PASSWORD,
  ROUTE_PROFILE,
  ROUTE_INGREDIENTS,
  ROUTE_FEED,
  ROUTE_ORDER,
} from "../../utils/сonstant";
import "./index.css";
import React, { useEffect } from "react";
import { useDispatch } from "../../utils/hooks";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  useNavigate,
} from "react-router-dom";
import {
  MainPage,
  LoginPage,
  RegisterPage,
  ForgotPassword,
  ResetPassword,
  Profile,
  IngredientPage,
  NotFound404,
  OrdersPage,
  OrderInfoPage,
  OrderHistory,
} from "../../pages";
import AppHeader from "../AppHeader/AppHeader";
import Modal from "../Modal/Modal";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import OrderCardInfo from "../OrderCardInfo/OrderCardInfo";
import Preloader from "../Preloader/Preloader";
import { selectedIngredientSlice } from "../../services/reducers/selectedIngredient";
import { ProtectedRouteElement } from "../RrotectedRoute";
import { getIngredients } from "../../services/actions/ingredients";

function App() {
  const ModalSwitch = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { removeIngredientDetails } = selectedIngredientSlice.actions;

    let background = location.state && location.state.background;

    useEffect(() => {
      dispatch(getIngredients());
    }, [dispatch]);

    const handleModalClose = () => {
      dispatch(removeIngredientDetails());
      navigate(-1);
    };

    return (
      <div className="page">
        <AppHeader />
        <Preloader />
        <Routes location={background || location}>
          <Route path={ROUTE_MAIN} element={<MainPage />} />
          <Route path={ROUTE_FEED} element={<OrdersPage />} />
          <Route path={`${ROUTE_FEED}/:orderId`} element={<OrderInfoPage />} />
          <Route
            path={ROUTE_LOGIN}
            element={
              <ProtectedRouteElement
                onlyUnAuth={false}
                element={<LoginPage />}
              />
            }
          />
          <Route
            path={ROUTE_REGISTER}
            element={
              <ProtectedRouteElement
                onlyUnAuth={false}
                element={<RegisterPage />}
              />
            }
          />
          <Route
            path={ROUTE_FORGOT_PASSWORD}
            element={
              <ProtectedRouteElement
                onlyUnAuth={false}
                element={<ForgotPassword />}
              />
            }
          />
          <Route
            path={ROUTE_RESET_PASSWORD}
            element={
              <ProtectedRouteElement
                onlyUnAuth={false}
                element={<ResetPassword />}
              />
            }
          />
          <Route
            path={ROUTE_PROFILE}
            element={
              <ProtectedRouteElement onlyUnAuth={true} element={<Profile />} />
            }
          />
          <Route
            path={`${ROUTE_PROFILE}${ROUTE_ORDER}`}
            element={
              <ProtectedRouteElement
                onlyUnAuth={true}
                element={<OrderHistory />}
              />
            }
          />
          <Route
            path={`${ROUTE_PROFILE}${ROUTE_ORDER}/:orderId`}
            element={
              <ProtectedRouteElement
                onlyUnAuth={true}
                element={<OrderInfoPage />}
              />
            }
          />
          <Route
            path={`${ROUTE_INGREDIENTS}/:ingredientId`}
            element={<IngredientPage />}
          />
          <Route path="*" element={<NotFound404 />} />
        </Routes>

        {background && (
          <Routes>
            <Route
              path={`${ROUTE_INGREDIENTS}/:ingredientId`}
              element={
                <Modal title={"Детали ингредиента"} onClose={handleModalClose}>
                  <IngredientDetails ingredient={location.state.ingredient} />
                </Modal>
              }
            />
            {[
              `${ROUTE_FEED}/:orderId`,
              `${ROUTE_PROFILE}${ROUTE_ORDER}/:orderId`,
            ].map((path, index) => (
              <Route
                path={path}
                key={index}
                element={
                  <Modal title={" "} onClose={handleModalClose}>
                    <OrderCardInfo
                      order={location.state.orderCard}
                      isModal={true}
                    />
                  </Modal>
                }
              />
            ))}
          </Routes>
        )}
      </div>
    );
  };
  return (
    <BrowserRouter>
      <ModalSwitch />
    </BrowserRouter>
  );
}

export default App;

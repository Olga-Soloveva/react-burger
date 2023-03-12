import {
  ROUTE_MAIN,
  ROUTE_LOGIN,
  ROUTE_REGISTER,
  ROUTE_FORGOT_PASSWORD,
  ROUTE_RESET_PASSWORD,
  ROUTE_PROFILE,ROUTE_INGREDIENTS
} from "./utils/сonstant";
import styles from "./index.css";
import { useDispatch } from "react-redux";
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
} from "./pages";
import AppHeader from "./components/AppHeader/AppHeader";
import Modal from "./components/Modal/Modal";
import IngredientDetails from "./components/IngredientDetails/IngredientDetails";
import Preloader from "./components/Preloader/Preloader";
import { selectedIngredientSlice } from "./services/reducers/selectedIngredient";
import { ProtectedRouteElement } from "./components/RrotectedRoute";

function App() {
  const ModalSwitch = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { removeIngredientDetails } = selectedIngredientSlice.actions;

    let background = location.state && location.state.background;

    const handleModalClose = () => {
      dispatch(removeIngredientDetails());
      navigate(-1);
    };

    return (
      <div className={styles.page}>
        <AppHeader />
        <Preloader />
        <Routes location={background || location}>
          <Route path={ROUTE_MAIN} element={<MainPage />} />
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
            element={<ProtectedRouteElement element={<RegisterPage />} />}
          />
          <Route
            path={ROUTE_FORGOT_PASSWORD}
            element={<ProtectedRouteElement element={<ForgotPassword />} />}
          />
          <Route
            path={ROUTE_RESET_PASSWORD}
            element={<ProtectedRouteElement element={<ResetPassword />} />}
          />
          <Route
            path={ROUTE_PROFILE}
            element={
              <ProtectedRouteElement onlyUnAuth={true} element={<Profile />} />
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

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
          <Route path="/" element={<MainPage />} />
          <Route
            path="/login"
            element={
              <ProtectedRouteElement
                onlyUnAuth={false}
                element={<LoginPage />}
              />
            }
          />
          <Route
            path="/register"
            element={<ProtectedRouteElement element={<RegisterPage />} />}
          />
          <Route
            path="/forgot-password"
            element={<ProtectedRouteElement element={<ForgotPassword />} />}
          />
          <Route
            path="/reset-password"
            element={<ProtectedRouteElement element={<ResetPassword />} />}
          />
          <Route
            path="/profile"
            element={
              <ProtectedRouteElement onlyUnAuth={true} element={<Profile />} />
            }
          />
          <Route
            path="/ingredients/:ingredientId"
            element={<IngredientPage />}
          />
          <Route path="*" element={<NotFound404 />} />
        </Routes>

        {background && (
          <Routes>
            <Route
              path="/ingredients/:ingredientId"
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

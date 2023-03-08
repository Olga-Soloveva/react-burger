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
import Modal from "./components/Modal/Modal";
import { useSelector, useDispatch } from "react-redux";
import IngredientDetails from "./components/IngredientDetails/IngredientDetails";
import { selectedIngredientSlice } from "./services/reducers/selectedIngredient";

function App() {
  const ModalSwitch = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    let background = location.state && location.state.background;

    const selectedIngredient = useSelector((store) => store.selectedIngredient);
    const { removeIngredientDetails } = selectedIngredientSlice.actions;

    const handleModalClose = () => {
      dispatch(removeIngredientDetails());
      navigate(-1);
    };

    return (
      <>
        <Routes location={background || location}>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/profile" element={<Profile />} />
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
                  <IngredientDetails ingredient={selectedIngredient} />
                </Modal>
              }
            />
          </Routes>
        )}
      </>
    );
  };
  return (
    <BrowserRouter>
      <ModalSwitch />
    </BrowserRouter>
  );
}


export default App;

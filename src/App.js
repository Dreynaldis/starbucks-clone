import "./App.css";
import Navbar from "./Component/Navbar";
import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./Pages/Home";
import RegisterPage from "./Pages/Register";
import LoginPage from "./Pages/Login";
import { useSelector } from "react-redux";
import OrderPage from "./Pages/Order";
import ProductDetailPage from "./Pages/ProductDetail";
import CartsPage from "./Pages/Carts";

function App() {
  const isAuth = useSelector(
    (state) => state.loginHandler.loginData.loginStatus
  );

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/register"
          element={isAuth ? <Navigate to="/" /> : <RegisterPage />}
        />
        <Route
          path="/login"
          element={isAuth ? <Navigate to="/" /> : <LoginPage />}
        />
        <Route path="/menu" element={<OrderPage />} />
        <Route path="/products/:id" element={<ProductDetailPage />} />
        <Route path="/carts" element={<CartsPage />} />
      </Routes>
    </>
  );
}

export default App;

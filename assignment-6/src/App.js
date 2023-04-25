import logo from "./logo.svg";
import "./App.css";
import Header from "./Components/Header";
import ProductDetail from "./View/Pages/Shopping/ProductDetail";
import CardMap from "./View/Pages/Shopping/ProductMap";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import Signup from "./View/Pages/Auth/Signup"
import Login from "./View/Pages/Auth/Login";
import { Fragment } from "react";
import PrivateRoutes from "./Routes/PrivateRoutes";
import Error from "./View/Pages/Shopping/Error";
import Cart from "./View/Pages/Shopping/Cart";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/" element={<Navigate to="/product" />} />
            <Route  path="/login" element={<Login />} />
            <Route path="*" element={<Error />} />
            <Route path="/product" element={<CardMap />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route element={<PrivateRoutes />}>
              <Route
                path="/cart"
                element={
                  <Fragment>
                    <Cart />
                  </Fragment>
                }
              />
              <Route
                path="/product/:id"
                element={
                  <Fragment>
                    <ProductDetail />
                  </Fragment>
                }
              />
            </Route>
          </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;

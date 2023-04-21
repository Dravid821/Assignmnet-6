import logo from "./logo.svg";
import "./App.css";
import Header from "./Components/Header";
import ProductDetail from "./Components/ProductDetail";
import CardMap from "./View/Pages/Shopping/ProductMap";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import Signup from "./View/Pages/Auth/Signup"
import Login from "./View/Pages/Auth/Login"
import Cart from "./View/Pages/Shopping/Cart";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/signup" element={<Signup/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/product" element={<CardMap />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;

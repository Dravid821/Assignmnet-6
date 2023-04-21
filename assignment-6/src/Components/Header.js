import React from "react";
import { Button } from "reactstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { Badge } from "@chakra-ui/react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";


const Header = () => {
  let loggin = JSON.parse(localStorage.getItem("isLogin"));
  const navigate = useNavigate();
  //logout Funcnality
  const logout = () => {
    localStorage.setItem("isLogin", false);
    let signupdata = JSON.parse(localStorage.getItem("signUpData"));
    signupdata = signupdata.map((item) => {
      item.isActive = false;
      navigate("/login")
      return item;
    });
    localStorage.setItem("signUpData", JSON.stringify(signupdata));
  };
  return (
    <div>
      <nav className="navbar navbar-light bg-dark">
        <div className="container-fluid">
          <p className="navbar-brand h4 text-white" color="none">
            Shopping
          </p>
          <div className="pl-2">
            {loggin ? null : (
              <>
                <NavLink to={"/product"}>
                  <Button outline color="secondary">
                    Home
                  </Button>{" "}
                </NavLink>
                <NavLink to={"/login"}>
                  <Button outline color="secondary">
                    login
                  </Button>{" "}
                </NavLink>
              </>
            )}
            {loggin ? (
              <><NavLink to={"/cart"}>
                <Button outline color="secondary" >
                  Mycart
                  &nbsp;
                  <Badge >
                    <ShoppingCartIcon/>
                  </Badge>
                </Button>
                </NavLink>
                &nbsp;
                <Button onClick={logout} outline color="secondary">
                  Logout
                </Button>{" "}
              </>
            ) : null}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;

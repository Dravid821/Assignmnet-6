import React from "react";
import { Button } from "reactstrap";
import { NavLink } from "react-router-dom";
const Header = () => {
  return (
    <div>
      <nav className="navbar navbar-light bg-dark">
        <div className="container-fluid">
          <p className="navbar-brand h4 text-white" color="none">
            Shopping
          </p>
          <div className="pl-2">
            <>
              <Button outline color="dark" className="text-secondary">
                Home
              </Button>{" "}
              <Button outline color="dark" className="text-secondary">
                login
              </Button>{" "}
            </>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;

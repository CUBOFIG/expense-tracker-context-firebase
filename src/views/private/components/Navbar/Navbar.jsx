import React from "react";
import { Navbar as NavbarReact, NavbarBrand, NavbarText } from "reactstrap";
import FontAwesomeIcon from "../FontAwesomeIcon/FontAwesomeIcon";

const Navbar = ({ out }) => {
  const logout = () => {
    out();
  };
  return (
    <div className="p-0 container container-nav">
      <NavbarReact color="light" light expand="md" className="p-0 navbar-class">
        <NavbarBrand className="ml-2 ss p-3" href="/">
          Expense Tracker
        </NavbarBrand>

        <NavbarText className="ml-auto btn mr-2 p-3" onClick={logout}>
          <FontAwesomeIcon
            size="lg"
            icon="sign-in-alt"
            className="list-trash"
          />
        </NavbarText>
      </NavbarReact>
    </div>
  );
};

export default Navbar;

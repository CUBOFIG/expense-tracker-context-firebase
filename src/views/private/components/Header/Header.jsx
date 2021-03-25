import React from "react";

const Header = ({ user }) => {
  return (
    <>
      <h2 className="pb-2">Bienvenido {user}</h2>
    </>
  );
};

export default Header;

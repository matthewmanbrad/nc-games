import React from "react";
import { getUserInfo } from "../utils/api";

const Header = ({ user, setUser }) => {
  return (
    <div>
      <h1 className="title--nc-games Header__title">NC Games</h1>;
      {user && <p className="Header__logged-in-message">logged in as {user}</p>}
    </div>
  );
};

export default Header;

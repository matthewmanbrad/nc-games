import React, { useContext } from "react";
import { UserContext } from "../contexts/User";

const Header = () => {
  const { user, setUser } = useContext(UserContext);
  const logOutUser = (user) => {
    localStorage.removeItem(user);
    setUser(null);
  };
  return (
    <div>
      <h1 className="title--nc-games Header__title">NC Games</h1>;
      {user && (
        <span>
          <p className="Header__logged-in-message">logged in as {user}</p>
          <button
            className="Header--log-out-button"
            onClick={() => {
              logOutUser(user);
            }}
          >
            Log Out!
          </button>
        </span>
      )}
    </div>
  );
};

export default Header;

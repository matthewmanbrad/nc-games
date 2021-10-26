import React from "react";

const RequiresLogin = ({ isLoggedIn, children }) => {
  return (
    <div>
      {isLoggedIn ? (
        children
      ) : (
        <h3 className="RequiresLogin__login-message">
          Please login to view reviews!
        </h3>
      )}
    </div>
  );
};

export default RequiresLogin;

import React from "react";

const RequiresLogin = ({ user, isLoggedIn, children }) => {
  return (
    <div>
      {isLoggedIn ? (
        children
      ) : (
        <h1 className="login_message">Please login to view reviews!</h1>
      )}
    </div>
  );
};

export default RequiresLogin;

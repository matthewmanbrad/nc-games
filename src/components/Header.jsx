import React from "react";

const Header = ({ user }) => {
  return (
    <div>
      <h1 className="nc-games nc-games-large">NC Games</h1>;
      {user && <p className='login_form'>logged in as {user}</p>}
    </div>
  );
};

export default Header;

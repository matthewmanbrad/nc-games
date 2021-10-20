import React from "react";
import { useState } from "react";

const LogInForm = ({ setUser }) => {
  const [newUser, setNewUser] = useState("");
  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setUser(newUser);
          setNewUser("");
        }}
      >
        <label htmlFor="login" className="login_form">
          Please Type your Name Here To Log In:{" "}
        </label>
        <input
          type="text"
          id="login"
          onChange={(e) => {
            setNewUser(e.target.value);
          }}
          value={newUser}
        />
        <button>LOGIN!</button>
      </form>
    </div>
  );
};

export default LogInForm;

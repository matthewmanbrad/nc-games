import React from "react";
import { useState } from "react";
import { getUserInfo } from "../utils/api";

const LogInForm = ({ setUser }) => {
  const [newUser, setNewUser] = useState("");
  const [isInvalidUser, setIsInvalidUser] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsInvalidUser(false);
    getUserInfo(newUser)
      .then((user) => {
        setUser(user.username);
        localStorage.setItem("loggedInUser", JSON.stringify(user));
      })
      .then(() => {
        setSubmitted(true);
      })
      .catch((err) => {
        setIsInvalidUser(true);
        console.log("Invalid username");
        console.dir(err);
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="login" className="LogInForm__log-in-instructions">
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
        {isInvalidUser && <h2>Invalid username, please try again</h2>} :
      </form>
    </div>
  );
};

export default LogInForm;

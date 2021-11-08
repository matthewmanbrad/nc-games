import React from "react";
import { useState, useContext } from "react";
import { getUserInfo } from "../utils/api";
import { UserContext } from "../contexts/User";

const LogInForm = () => {
  const [newUser, setNewUser] = useState("");
  const [isInvalidUser, setIsInvalidUser] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { user, setUser } = useContext(UserContext);
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsInvalidUser(false);
    console.log(newUser, "IN login form component");
    getUserInfo(newUser)
      .then((user) => {
        console.log(user);
        setUser(user.username);
        localStorage.setItem("loggedInUser", JSON.stringify(user));
      })
      .then(() => {
        setSubmitted(true);
        setIsInvalidUser(false);
      })
      .catch((err) => {
        setIsInvalidUser(true);
      });
  };

  return (
    <div>
      {!user && (
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
            placeholder="try 'grumpy19'"
            className="LogInForm__input--log-in"
          />
          <button>LOGIN!</button>
          {isInvalidUser && (
            <h2 className="LogInForm--invalid-username-message">
              Invalid username, please try again
            </h2>
          )}{" "}
          :
        </form>
      )}
    </div>
  );
};

export default LogInForm;

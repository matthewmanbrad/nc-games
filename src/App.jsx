import { BrowserRouter, Switch, Route } from "react-router-dom";
import React, { useContext, useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import Nav from "./components/Nav";
import Home from "./pages/Home";
import Reviews from "./components/Reviews";
import SingleReview from "./components/SingleReview";
import { UserContext } from "./contexts/User";
import LogInForm from "./components/LogInForm";
import RequiresLogin from "./components/RequiresLogin";
import Footer from "./components/Footer";
import WriteReview from "./components/WriteReview";

function App() {
  const { user, setUser } = useContext(UserContext);
  useEffect(() => {
    const prevLoggedInUser = localStorage.getItem("loggedInUser");
    if (prevLoggedInUser) {
      const userObj = JSON.parse(localStorage.getItem("loggedInUser"));
      setUser(userObj.username);
    }
  }, [setUser]);
  return (
    <BrowserRouter className="browserRouter">
      <div className="App__div--header">
        <Nav />
        <Header />
        <LogInForm />
      </div>
      <section className="App__section--main-content container">
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <RequiresLogin isLoggedIn={!!user}>
            <Route exact path="/categories/:categorySlug">
              <Reviews />
            </Route>
            <Route exact path="/reviews">
              <Reviews />
            </Route>
            <Route exact path="/reviews/:review_id">
              <SingleReview />
            </Route>
            <Route exact path="/write-review">
              <WriteReview />
            </Route>
          </RequiresLogin>
        </Switch>
        <div className="push"></div>
      </section>
      <Footer />
    </BrowserRouter>
  );
}

export default App;

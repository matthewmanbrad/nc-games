import { BrowserRouter, Switch, Route } from "react-router-dom";
import React, { useContext, useState } from "react";
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

function App() {
  const { user, setUser } = useContext(UserContext);
  return (
    <BrowserRouter className="browserRouter">
      <div class="main-header">
        <Nav />
        <Header user={user} />
        <LogInForm setUser={setUser} />
      </div>
      <section className="content-section container">
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
          </RequiresLogin>
        </Switch>
      </section>
      <Footer />
    </BrowserRouter>
  );
}

export default App;

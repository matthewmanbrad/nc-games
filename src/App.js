import { BrowserRouter, Switch, Route } from "react-router-dom";
import React, { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Nav from "./components/Nav";
import Home from "./pages/Home";
import Reviews from "./components/Reviews";
import SingleReview from "./components/SingleReview";
import SingleReviewComments from "./components/SingleReviewComments";

function App() {
  return (
    <BrowserRouter className="browserRouter">
      <div class="main-header">
        <Nav />
        <Header />
      </div>
      <section className="content-section container">
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/categories/:categorySlug">
            <Reviews />
          </Route>
          <Route exact path="/reviews">
            <Reviews />
          </Route>
          <Route exact path="/reviews/:review_id">
            <SingleReview />
          </Route>
          <Route exact path="/reviews/:review_id/comments">
            <SingleReviewComments />
          </Route>
        </Switch>
      </section>
    </BrowserRouter>
  );
}

export default App;

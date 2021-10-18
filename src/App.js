import { BrowserRouter, Switch, Route } from "react-router-dom";
import React, { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Nav from "./components/Nav";

function App() {
  return (
    <BrowserRouter>
      <section>
        <Header />
        <Nav />
      </section>
    </BrowserRouter>
  );
}

export default App;

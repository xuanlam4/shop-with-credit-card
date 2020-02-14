import React from "react";
import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Cart from "./components/Cart";
import Thanks from "./components/Thanks";
import Footer from "./components/Footer";
import CardForm from "./components/credit-card/CardForm";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/credit-card" component={CardForm}></Route>
        <div className="App">
          <div className="wrapper">
            <Navbar></Navbar>
            <Switch>
              <Route exact path="/" component={Home}></Route>
              <Route path="/cart" component={Cart}></Route>
              <Route path="/thank-you" component={Thanks}></Route>
            </Switch>
          </div>
          <Footer></Footer>
        </div>
      </Switch>
    </BrowserRouter>
  );
}

export default App;

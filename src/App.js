import React from "react";
import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Cart from "./components/Cart";
import Thanks from "./components/Thanks";
import Footer from "./components/Footer";
import Detail from "./components/Detail";
import Checkout from "./components/Checkout";
import CardForm from "./components/credit-card/CardForm";

const App = () => {
  const [value, setValue] = React.useState("");
  const [size, setSize] = React.useState("");

  const passSearchValue = searchValue => {
    setValue(searchValue);
  };

  const passSizeValue = sizeValue => {
    setSize(sizeValue);
  };

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/credit-card" component={CardForm}></Route>
        <div className="App">
          <div className="wrapper">
            <Navbar passSearchValue={passSearchValue}></Navbar>
            <Switch>
              <Route
                exact
                path="/"
                render={props => <Home searchValue={value} {...props} />}
              ></Route>
              <Route
                path="/detail"
                render={props => (
                  <Detail passSizeValue={passSizeValue} {...props}></Detail>
                )}
              ></Route>
              <Route
                path="/cart"
                render={props => <Cart size={size} {...props}></Cart>}
              ></Route>
              <Route path="/checkout" component={Checkout}></Route>
              <Route path="/thank-you" component={Thanks}></Route>
            </Switch>
          </div>
          <Footer></Footer>
        </div>
      </Switch>
    </BrowserRouter>
  );
};

export default App;

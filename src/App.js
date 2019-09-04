import React from "react";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Header from "./components/Header";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import Category from "./pages/Category";
import MyMeals from "./pages/MyMeals";
import Search from "./pages/Search";
import SingleMeal from "./pages/SingleMeal";

function App() {
  return (
    <div>
      <Header />
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/category/:meal" component={Category} />
          <Route exact path="/my-meals" component={MyMeals} />
          <Route exact path="/search" component={Search} />
          <Route exact path="/single-meal/:id" component={SingleMeal} />
        </Switch>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;

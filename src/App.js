import React, { Component } from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";

import Header from "./components/Header";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import Category from "./pages/Category";
import MyMeals from "./pages/MyMeals";
import Search from "./pages/Search";
import SingleMeal from "./pages/SingleMeal";
import About from "./components/About";
import Contact from "./components/Contact";
import Protected from './ProtectedRoute'
import PageNotFound from "./components/PageNotFound";

export default class App extends Component {

  render() {

    return (

      <div>
        <Header />

        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/about" component={About} />
          <Route exact path="/contact" component={Contact} />
          <Route exact path="/category/:meal" component={Category} />
          <Protected exact path="/my-meals" component={MyMeals} />
          <Route exact path="/search" component={Search} />
          <Route exact path="/single-meal/:id" component={SingleMeal} />
          <Route path="*" component={PageNotFound} />
        </Switch>

        <Footer />
      </div>
    );
  }
}

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

export default class App extends Component {
  state = {
    recipes: [],
    searchTerm: ""
  };

  searchItems = searchTerm => {
    console.log(searchTerm);
    let endpoint = "";
    this.setState({
      recipes: [],
      searchTerm: searchTerm
    });
    if (searchTerm === "") {
      endpoint = ''
    } else {
      endpoint = `https://www.themealdb.com/api/json/v1/1/search.php?s=${this.state.searchTerm}`;
    }
    this.fetchItems(endpoint);
  };

  fetchItems = endpoint => {
    fetch(endpoint)
      .then(res => res.json())
      .then(res => {
        console.log(res)
        this.setState(
          {
            recipes: [...this.state.recipes, ...res.meals]
          },
          () => {
            if (this.state.searchTerm !== "") {
              localStorage.setItem("recipe", JSON.stringify(this.state.recipes));
            }
          }
        );
       
      });
  };
  
  render() {
    
    return (
      <div>
        <Header callback={this.searchItems} />

        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/about" component={About} />
          <Route exact path="/contact" component={Contact} />
          <Route exact path="/category/:meal" component={Category} />
          <Route exact path="/my-meals" component={MyMeals} />
          <Route exact path="/search" component={Search} />
          <Route exact path="/single-meal/:id" component={SingleMeal} />
        </Switch>

        <Footer />
      </div>
    );
  }
}
